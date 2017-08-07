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

float triSDF(vec2 st){
  st = (st * 2. -1.) * 2.;
  return max(abs(st.x) * 0.866025 + st.y * 0.5, -st.y * 0.5);
}

vec2 rotate(vec2 st, float a){
	st = mat2(cos(a), -sin(a), sin(a), cos(a)) * (st -.5);
	return st + .5;
}

void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;
	st = rotate(st, radians(-25.));
	float sdf = triSDF(st);
	sdf /= triSDF(st + vec2(0., .2));
	color += fill(abs(sdf), .56);
	gl_FragColor = vec4(color, 1.);
}
