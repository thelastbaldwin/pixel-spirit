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
// 12
float crossSDF(vec2 st, float s){
    vec2 size = vec2(.25, s);
    return min( rectSDF(st, size.xy), rectSDF(st, size.yx) );
}
// 14
float flip(float v, float pct){
    return mix(v, 1. - v, pct);
}
// 30
float raysSDF(vec2 st, int N) {
    st -= .5;
    return fract(atan(st.y, st.x)/TAU * float(N));
}
void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    color += flip(stroke(raysSDF(st, 28), .5, .2), fill(st.y, .5));
    float rect = rectSDF(st, vec2(1.));
    color *= step(.25, rect);
    color += fill(rect, .2);
    gl_FragColor = vec4(color, 1.);
}
