uniform vec2 u_resolution;

const float PI = 3.1415926535897932384626433832795;

float stroke(float x, float s, float w){
	float d = step(s, x + w * .5) - step(s, x - w * .5);
	return clamp(d, 0., 1.);
}

void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;

	float offset = cos(st.y * PI) * .15;
	color += stroke(st.x, .28 + offset, .1);
	color += stroke(st.x, .5 + offset, .1);
	color += stroke(st.x, .72 + offset, .1);

	gl_FragColor = vec4(color, 1.);
}
