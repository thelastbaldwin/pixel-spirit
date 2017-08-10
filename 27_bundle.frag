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

float hexSDF(vec2 st) {
    st = abs(st * 2. - 1.);
    return max(abs(st.y), st.x * 0.866025 + st.y * .5);
}

void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;
	st = st.yx;
        color += stroke(hexSDF(st), .6, .1);
        color += fill(hexSDF(st - vec2(-.06, -.1)), .15);
        color += fill(hexSDF(st - vec2(-.06, .1)), .15);
        color += fill(hexSDF(st - vec2(.11, 0.)), .15);
	gl_FragColor = vec4(color, 1.);
}
