uniform vec2 u_resolution;
#ifdef GL_ES
precision mediump float;
#endif

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

float rectSDF(vec2 st, vec2 s){
	st = st * 2. - 1.;
	return max( abs(st.x / s.x), abs(st.y / s.y) );
}

float crossSDF(vec2 st, float s){
	vec2 size = vec2(.25, s);
	return min( rectSDF(st, size.xy), rectSDF(st, size.yx) );
}

void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;

	float rect = rectSDF(st, vec2(1.));
	color += fill(rect, .5);
	float cross = crossSDF(st, 1.);
	color *= step(.5, fract(cross * 4.));
	color *= step(1., cross);
	color += fill(cross, .5);
	color += stroke(rect, .65, .05);
	color += stroke(rect, .75, .025);


	gl_FragColor = vec4(color, 1.);
}
