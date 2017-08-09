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
        st = rotate(vec2(st.x, 1. - st.y), radians(45.));
        vec2 s = vec2(1.);
        color += fill(rectSDF(st - .025, s), .4);
        color += fill(rectSDF(st + .025, s), .4);
        color *= step(.38, rectSDF(st + .025, s));
	gl_FragColor = vec4(color, 1.);
}
