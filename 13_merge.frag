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


float flip(float v, float pct){
	return mix(v, 1. - v, pct);
}

void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;
	
  vec2 offset = vec2(.15, .0);
  float left = circleSDF(st+offset);
  float right = circleSDF(st-offset);
  color += flip(stroke(left, .5, .05), fill(right, .525));
	gl_FragColor = vec4(color, 1.);
}
