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

float flip(float v, float pct){
	return mix(v, 1. - v, pct);
}

float triSDF(vec2 st){
  st = (st * 2. -1.) * 2.;
  return max(abs(st.x) * 0.866025 + st.y * 0.5, -st.y * 0.5);
}

float rectSDF(vec2 st, vec2 s){
	st = st * 2. - 1.;
	return max( abs(st.x / s.x), abs(st.y / s.y) );
}

vec2 rotate(vec2 st, float a){
	st = mat2(cos(a), -sin(a), sin(a), cos(a)) * (st -.5);
	return st + .5;
}

void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;
	st = rotate(st, radians(45.));
    float r1 = rectSDF(st, vec2(1.));
    float r2 = rectSDF(st + .15, vec2(1.));
    color += stroke(r1, .5, .05);
    color *= step(.325, r2);
    color += stroke(r2, .325, .05) * fill(r1, .525);
    color += stroke(r2, .2, .05);
	gl_FragColor = vec4(color, 1.);
}
