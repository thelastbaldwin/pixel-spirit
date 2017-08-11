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
// 28
float starSDF(vec2 st, int V, float s) {
    st = st * 4. - 2.;
    float a = atan(st.y, st.x) / TAU;
    float seg = a * float(V);
    a = ((floor(seg) + 0.5) / float(V) + mix(s, -s, step(.5, fract(seg)))) * TAU;
    return abs(dot(vec2(cos(a), sin(a)), st));
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    color += stroke(circleSDF(st), .8, .05);
    st.y = 1. - st.y;
    float s = starSDF(st.yx, 5, .1);
    color *= step(.7, s);
    color += stroke(s, .4, .1);
    gl_FragColor = vec4(color, 1.);
}
