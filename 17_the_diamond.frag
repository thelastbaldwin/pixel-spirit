// Deps 04 09 15

float rhombSDF(vec2 st){
	return max(triSDF(st), triSDF(vec2(sd.x, 1. - st.y));
}

main(){
	float sdf = rhombSDF(st);
	color += fill(sdf, .425);
	color += stroke(sdf, .5, .05);
	color += stroke(sdf, .6, .03);
}
