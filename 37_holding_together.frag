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
// 09
float fill(float x, float size){
    return 1. - step(size, x);
}
// 10
float rectSDF(vec2 st, vec2 s){
    st = st * 2. - 1.;
    return max( abs(st.x / s.x), abs(st.y / s.y) );
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
// 35
vec3 bridge(vec3 c, float d, float s, float w) {
    c *= 1. - stroke(d, s, w * 2.);
    return c + stroke(d, s, w);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    st.x = mix(1. - st.x, st.x, step(.5, st.y));
    vec2 o = vec2(.05, .0);
    vec2 s = vec2(1.);
    float a = radians(45.);
    float l = rectSDF(rotate(st + o, a), s);
    float r = rectSDF(rotate(st - o, -a), s);
    color += stroke(1., .145, .098);
    color = bridge(color, l, .145, .098);
    color = bridge(color, r, .145, .098);
    gl_FragColor = vec4(color, 1.);
}
