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
// 34
float heartSDF(vec2 st) {
    st -= vec2(.5, .8);
    float r = length(st) * 5.;
    st = normalize(st);
    return r - ((st.y * pow(abs(st.x), 0.67)) / (st.y + 1.5) - (2.) * st.y + 1.26);
}
void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    color += fill(heartSDF(st), .5);
    color -= stroke(polySDF(st, 3), .15, .05);
    gl_FragColor = vec4(color, 1.);
}
