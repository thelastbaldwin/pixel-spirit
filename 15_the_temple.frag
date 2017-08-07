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

void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;
	
  st.y = 1. - st.y;
  vec2 ts = vec2(st.x, .82 - st.y);
  color += fill(triSDF(st), .7);
  color -= fill(triSDF(ts), .36);
	gl_FragColor = vec4(color, 1.);
}
