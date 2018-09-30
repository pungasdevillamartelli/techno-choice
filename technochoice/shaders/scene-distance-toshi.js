
var setShaderSet2 = 
"vec2 iResolution = vec2(8.1595,1.0000); " + 
" " + 
"float sasin(float x) { return asin(clamp(x, -1.0, 1.0)); } " + 
"float sinversesqrt(float x) { return inversesqrt(clamp(x, 0.0, x)); } " + 

" " + 
"float f1(vec3 p) { " + 
"	float iGlobalTime = time + 300.0; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (sinversesqrt(sasin(log(xx))) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage1(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p, 1) / iResolution.x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) " + 
"		o += (f1(o) * d); " + 
"	c = vec4(abs((f1(o - d) * vec3(0, 0.1, 0.2)) + (f1(o - 0.6) * vec3(0.2, 0.1, 0))) * (yy - d.z), 1); " + 
"} " + 
" " + 
"float f2(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (sinversesqrt(xx) * cos(distance(p,p) * ((p.z + (5.8288 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage2(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p, 1) / iResolution.x), o = d; " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f2(o) * d); " + 
"	} " + 
"	c = vec4(abs((f2(o - d) * vec3(0, 0.1, 0.2)) + (f2(o - 0.6) * vec3(0.2, 0.1, 0))) * (yy - d.z), 1); " + 
"} " + 
" " + 
"float f3(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (sinversesqrt(sasin(log(yy))) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage3(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p,0.3530) / iResolution.x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f3(o) * d); " + 
"	} " + 
"	c = vec4(abs((f3(o - d) * vec3(0, 0.1, 0.2)) + (f3(o - 0.6) * vec3(0.2, 0.1, 0))) * (xx - d.z), 1); " + 
"} " + 
" " + 
"float f4(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (((atan(p).yxzz).y) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage4(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p,dot(log(4.9004),mod(yy,time))) / iResolution.x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f4(o) * d); " + 
"	} " + 
"	c = vec4(abs((f4(o - d) * vec3(0, 0.1, 0.2)) + (f4(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.4533 - d.z), 1); " + 
"} " + 
"float f5(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((length(vec2(1.2428,1.0000)) * p.y) * p.x)) + cos(p)) - (distance(p,p) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - yy; " + 
"} " + 
"void mainImage5(out vec4 c, vec2 p) { " + 
"	vec3 d = vec3(p,0.0) - (vec3(p, 1) / vec2(1.2428,1.0000).x), o = vec3(exp(vec2(1.2428,1.0000)),exp(max(0.0811,2.2567))); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f5(o) * d); " + 
"	} " + 
"	c = vec4(abs((f5(o - d) * vec3(0, 0.1, 0.2)) + (f5(o - 0.6) * vec3(0.2, 0.1, 0))) * (yy - (d*2.2936).z), 1); " + 
"} " + /*
" " 
"float f5(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (((atan(p).yxzz).y) * cos(atan(floor(iGlobalTime),clamp(2.8881,9.5083,6.7170)) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage5(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p,dot(log(4.9004),mod(yy,time))) / iResolution.x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f5(o) * d); " + 
"	} " + 
"	c = vec4(abs((f5(o - d) * vec3(0, 0.1, 0.2)) + (f5(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.4533 - d.z), 1); " + 
"} " +
" " + 
"float f6(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.0500 * cos((9.0 * p.y) * p.x)) + cos(p)) - (((atan(p).yxzz).y) * cos(atan(floor(iGlobalTime),clamp(2.8881,9.5083,6.7170)) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(time); " + 
"} " + 
"void mainImage6(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p,dot(log(4.9004),mod(yy,time))) / iResolution.x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f6(o) * d); " + 
"	} " + 
"	c = vec4(abs((f6(o - d) * vec3(0, 0.1, 0.2)) + (f6(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.4533 - d.z), 1); " + 
"} " + 
" " + 
"float f7(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (((atan(p).yxzz).y) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage7(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p,dot(log(4.9004),mod(yy,yy))) / iResolution.x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f7(o) * d); " + 
"	} " + 
"	c = vec4(abs((f7(o - d) * vec3(0, 0.1, 0.2)) + (f7(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.4533 - d.z), 1); " + 
"} " + 
" " + 
"float f8(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (((atan(p).yxzz).y) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage8(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(vec2(8.1595,2.4013),yy,0.0)/(p*p))) - (vec3(p,dot(log(4.9004),mod(yy,time))) / vec2(8.1595,2.4013).x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f8(o) * d); " + 
"	} " + 
"	c = vec4(abs((f8(o - d) * vec3(0, 0.1, 0.2)) + (f8(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.4533 - d.z), 1); " + 
"} " + 
" " + 
"float f9(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (((atan(p).yxzz).y) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage9(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(vec2(8.1595,2.4013),yy,0.0)/(p*p))) - (vec3(p,dot(faceforward(xx,cos(time),9.6738),mod(yy,time))) / vec2(8.1595,2.4013).x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f9(o) * d); " + 
"	} " + 
"	c = vec4(abs((f9(o - d) * vec3(0, 0.1, 0.2)) + (f9(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.4533 - d.z), 1); " + 
"} " + 
" " + 
" " + */
" " +
"float f6(vec3 pq) { " + 
"	float iGlobalTime = time; " + 
"	pq.z += 3.1090; " + 
"	return length(((0.05 * cos((2.3227 * pq.y) * max(pq,5.6496).x)) + cos((pq-iGlobalTime))) - (0.7088 * cos((length(vec4(max(1.3796,6.6359),iResolution,xx))/9.3943) * ((pq.z + (0.3 * pq.x)) - pq.y)))) - fract(clamp(yy,sign(degrees(faceforward(yy,degrees(iGlobalTime),xx))),time)); " + 
"} " + 
"void mainImage6(out vec4 c, vec2 p) { " + 
"	vec3 d = length(clamp(iResolution, yy, 0.0) / (p * p)) - (vec3(p, 1) / sqrt((7.4969-radians(iResolution))).x), o = vec3(iResolution,exp(max(0.0810,mix(xx,radians(((9.7406/exp(distance(iResolution,p)))*inversesqrt(0.1470))),pow(time,distance(c,c)))))); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f6(o) * d); " + 
"	} " + 
"	c = vec4(abs((f6(o - d) * vec3(0, 0.1, 0.2)) + (f6(o - 0.6) * vec3(0.2, 0.1, 0))) * (yy - o.z), 1); " + 
"} " + 
" " + 

/*
"float f7(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (inversesqrt(2.6644) * cos(distance(p, p) * ((p.z + (pow(length((3.0655/mix((p+p),p,(sin(2.5085)-yy)))),distance(vec4(time,iGlobalTime,time,time),(vec4(degrees(iResolution),iResolution)*time))) * p.x)) - p.y)))) - radians(0.6126); " + 
"} " + 
"void mainImage7(out vec4 c, vec2 p) { " + 
"	vec3 d = length(clamp(iResolution, yy, 0.0) / (p * p)) - (vec3(p,5.4294) / degrees(p).x), o = d; " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f7(o) * d); " + 
"	} " + 
"	c = vec4(abs((f7(o - d) * vec3(0, 0.1, 0.2)) + (f7(o - 0.6) * vec3(0.2, 0.1, 0))) * (2.0216 - d.z), 1); " + 
"} " + 
" " + 
"float f8(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (yy * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - asin(0.3157); " + 
"} " + 
"void mainImage8(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(iResolution,1.0000) / iResolution.x), o = clamp(d,xx,1.0986); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f8(o) * d); " + 
"	} " + 
"	c = vec4(abs((f8(o - d) * vec3(0, 0.1, 0.2)) + (f8(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.7745 - d.z), 1); " + 
"} " + 
// #NOTE: Deleted because when replacing with sasin it was weird !!!
" " + 
"float f7(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (sinversesqrt(sasin(log(xx))) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - tan(sign(xx)); " + 
"} " + 
"void mainImage7(out vec4 c, vec2 p) { " + 
"	vec3 d = length((clamp(iResolution,yy,0.0)/(p*p))) - (vec3(p, 1) / iResolution.x), o = sign(d); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f7(o) * d); " + 
"	} " + 
"	c = vec4(abs((f7(o - d) * vec3(0, 0.1, 0.2)) + (f7(o - 0.6) * vec3(0.2, 0.1, 0))) * (1.5453 - d.z), 1); " + 
"} " + */

"float f7(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((length(vec2(1.2428,1.0000)) * p.y) * p.x)) + cos(p)) - (distance(p,p) * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - yy; " + 
"} " + 
"void mainImage7(out vec4 c, vec2 p) { " + 
"	vec3 d = vec3(p,0.0) - (vec3(p, 1) / vec2(1.2428,1.0000).x), o = vec3(exp(vec2(1.2428,1.0000)),exp(max(0.0811,2.2567))); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f7(o) * d); " + 
"	} " + 
"	c = vec4(abs((f7(o - d) * vec3(0, 0.1, 0.2)) + (f7(o - 0.6) * vec3(0.2, 0.1, 0))) * (yy - (d*2.2936).z), 1); " + 
"} "
;