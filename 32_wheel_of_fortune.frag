#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

const float PI = 3.1415926535897932384626433832795;
const float TAU = 2. * PI;

// 04
float stroke(float x, float s, float w){
    float d = step(s, x + w * .5) - step(s, x - w * .5);
    return clamp(d, 0., 1.);
}
// 08
float circleSDF(vec2 st){
    return length(st - .5) * 2.;
}
// 09
float fill(float x, float size){
    return 1. - step(size, x);
}
// 26
vec2 rotate(vec2 st, float a){
    st = mat2(cos(a), -sin(a), sin(a), cos(a)) * (st -.5);
    return st + .5;
}
// 27
float polySDF(vec2 st, int V) {
    st = st * 2. -1.;
    float a = atan(st.x, st.y) + PI;
    float r = length(st);
    float v = TAU/float(V);
    return cos(floor(.5 + a / v) * v - a) * r;
}
// 27
float hexSDF(vec2 st) {
    st = abs(st * 2. - 1.);
    return max(abs(st.y), st.x * 0.866025 + st.y * .5);
}
// 28
float starSDF(vec2 st, int V, float s) {
    st = st * 4. - 2.;
    float a = atan(st.y, st.x) / TAU;
    float seg = a * float(V);
    a = ((floor(seg) + 0.5) / float(V) + mix(s, -s, step(.5, fract(seg)))) * TAU;
    return abs(dot(vec2(cos(a), sin(a)), st));
}
// 30
float raysSDF(vec2 st, int N) {
    st -= .5;
    return fract(atan(st.y, st.x)/TAU * float(N));
}
void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    float sdf = polySDF(st.yx, 8);
    color += fill(sdf, .5);
    color *= stroke(raysSDF(st, 8), .5, .2);
    color *= step(.27, sdf);
    color += stroke(sdf, .2, .05);
    color += stroke(sdf, .6, .1);
    gl_FragColor = vec4(color, 1.);
}
