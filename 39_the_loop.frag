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
// 10
float rectSDF(vec2 st, vec2 s){
    st = st * 2. - 1.;
    return max( abs(st.x / s.x), abs(st.y / s.y) );
}
// 11
float crossSDF(vec2 st, float s){
    vec2 size = vec2(.25, s);
    return min( rectSDF(st, size.xy), rectSDF(st, size.yx) );
}
// 12
float flip(float v, float pct){
    return mix(v, 1. - v, pct);
}
// 14
float vesicaSDF(vec2 st, float w){
    vec2 offset = vec2(w * .5, 0.);
    return max(circleSDF(st - offset), circleSDF(st + offset));
}
// 17
float triSDF(vec2 st){
    st = (st * 2. -1.) * 2.;
    return max(abs(st.x) * 0.866025 + st.y * 0.5, -st.y * 0.5);
}
// 19
float rhombSDF(vec2 st){
    return max(triSDF(st), triSDF(vec2(st.x, 1. - st.y)));
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
// 34
float heartSDF(vec2 st) {
    st -= vec2(.5, .8);
    float r = length(st) * 5.;
    st = normalize(st);
    return r - ((st.y * pow(abs(st.x), 0.67)) / (st.y + 1.5) - (2.) * st.y + 1.26);
}
// 35
vec3 bridge(vec3 c, float d, float s, float w) {
    c *= 1. - stroke(d, s, w * 2.);
    return c + stroke(d, s, w);
}
// 44
vec2 scale(vec2 st, vec2 s) {
    return (st - .5) * s + .5;
}
// 46
float flowerSDF(vec2 st, int N) {
    st = st * 2. - 1.;
    float r = length(st) * 2.;
    float a = atan(st.y, st.x);
    float v = float(N) * .5;
    return 1. - (abs(cos(a * v)) * .5 + .5) / r;
}
// 47
float spiralSDF(vec2 st, float t) {
    st -= 5.;
    float r = dot(st, st);
    float a = atan(st.y, st.x);
    return abs(sin(fract(log(r) * t + a * 0.159)));
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    float inv = step(.5, st.y);
    st = rotate(st, radians(-45.)) - .2;
    st = mix(st, .6 - st, step(.5, inv));
    for (int i = 0; i < 5; i++){
        float r = rectSDF(st, vec2(1.));
        float s = .25;
        s -= abs(float(i) * .1 - .2);
        color = bridge(color, r, s, .05);
        st += .1;
    }
    gl_FragColor = vec4(color, 1.);
}
