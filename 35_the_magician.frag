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
// 12
float flip(float v, float pct){
    return mix(v, 1. - v, pct);
}
// 35
vec3 bridge(vec3 c, float d, float s, float w) {
    c *= 1. - stroke(d, s, w * 2.);
    return c + stroke(d, s, w);
}
void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    st.x = flip(st.x, step(.5, st.y));
    vec2 offset = vec2(.15, .0);
    float left = circleSDF(st + offset);
    float right = circleSDF(st - offset);
    color += stroke(left, .4, .075);
    color = bridge(color, right, .4, .075);
    gl_FragColor = vec4(color, 1.);
}
