
var setShaderSet1 = 
" " + 
"float sacos(float x) { return acos(clamp(x, -1.0, 1.0)); } " + 
"float sasin(float x) { return asin(clamp(x, -1.0, 1.0)); } " + 
"vec2 sasin(vec2 x) { return asin(clamp(x, -1.0, 1.0)); } " + 
"vec3 sasin(vec3 x) { return asin(clamp(x, -1.0, 1.0)); } " + 
"vec2 iResolution = vec2(8.1595,1.0000); " + 
"float sinversesqrt(float x) { return inversesqrt(clamp(x, 0.0, x)); } " + 
"void mainImage1(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = yy + length(mod(vec3(fragCoord, ceil(yy)),(yy - 0.35))); " + 
"	fragColor = vec4(0.0, 0.0, 0.0, 1.0); " + 
"} " + 
"float f1(vec3 p) { " + 
"	p.z += time; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (((atan(p).yxzz).y) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage2(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p,dot(log(4.9004),mod(yy,time))) / iResolution.x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) " + 
"		o += (f1(o) * d); " + 
"	c = vec4(abs((f1(o - d) * vec3(0, 0.1, 0.2)) + (f1(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.4533 - d.z), 1); " + 
"} ";

