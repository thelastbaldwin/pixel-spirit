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
// 12
float flip(float v, float pct){
    return mix(v, 1. - v, pct);
}
// 14
float vesicaSDF(vec2 st, float w){
    vec2 offset = vec2(w * .5, 0.);
    return max(circleSDF(st - offset), circleSDF(st + offset));
}
// 30
float raysSDF(vec2 st, int N) {
    st -= .5;
    return fract(atan(st.y, st.x)/TAU * float(N));
}
void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    float v1 = vesicaSDF(st, .5);
    vec2 st2 = st.yx + vec2(.04, .0);
    float v2 = vesicaSDF(st2, .7);
    color += stroke(v2, 1., .05);
    color += fill(v2, 1.) * stroke(circleSDF(st), .3, .05);
    color += fill(raysSDF(st, 50), .2) * fill(v1, 1.25) * step(1., v2);
    gl_FragColor = vec4(color, 1.);
}
