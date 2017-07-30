uniform vec2 u_resolution;

float stroke(float x, float s, float w){
	float d = step(s, x + w * .5) - step(s, x - w * .5);
	return clamp(d, 0., 1.);
}

void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;
	float sdf = .5 + (st.x - st.y) * .5;
	color += stroke(sdf, .5, .1);
	float sdf_inv = (st.x + st.y) * .5;
	color += stroke(sdf_inv, .5, .1);
	gl_FragColor = vec4(color, 1.);
}
