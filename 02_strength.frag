uniform vec2 u_resolution;

const float PI = 3.1415926535897932384626433832795;

void main(){
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    color += step(.5 + cos(st.y * PI) * .25, st.x);
    
    gl_FragColor = vec4(color, 1.);
}
