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
    color += stroke(raysSDF(st, 8), .5, .15);
    float inner = starSDF(st.xy, 6, .09);
    float outer = starSDF(st.yx, 6, .09);
    color *= step(.7, outer);
    color += fill(outer, .5);
    color -= stroke(inner, .25, .06);
    color += stroke(outer, .6, .05);
    gl_FragColor = vec4(color, 1.);
}
