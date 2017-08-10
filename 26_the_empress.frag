const float PI = 3.1415926535897932384626433832795;
const float TAU = 2. * PI;

uniform vec2 u_resolution;

float stroke(float x, float s, float w){
    float d = step(s, x + w * .5) - step(s, x - w * .5);
    return clamp(d, 0., 1.);
}

float circleSDF(vec2 st){
    return length(st - .5) * 2.;
}

float fill(float x, float size){
    return 1. - step(size, x);
}

float polySDF(vec2 st, int V) {
    st = st * 2. -1.;
    float a = atan(st.x, st.y) + PI;
    float r = length(st);
    float v = TAU/float(V);
    return cos(floor(.5 + a / v) * v - a) * r;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    float d1 = polySDF(st, 5);
    vec2 ts = vec2(st.x, 1. - st.y);
    float d2 = polySDF(ts, 5);
    color += fill(d1, .75) * fill(fract(d1 * 5.), .5);
    color -= fill(d1, .6) * fill(fract(d2 * 4.9), .45);
    gl_FragColor = vec4(color, 1.);
}
