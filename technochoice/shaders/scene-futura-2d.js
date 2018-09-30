var setShaderSetFutura = 
"float getTime() { return acumBeats + 1000.0; } " + 

"vec2 iResolution2 = vec2(8.1595,ceil(9.2418)); " + 

"vec2 iResolution = vec2(8.1595,1.0); " + 
//  BOLITAS MULTICOLOR
"void mainImageX1(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = length(vec2(distance(cos(fragCoord),sin(fragCoord)))); " + 
"	fragColor = vec4(yy,distance(clamp(tan(x),sin(refract(xx,yy,reflect(4.9908,fract(x)))),x),yy),distance(clamp(tan(x),distance(fragColor,fragColor),xx),yy),1.0); " + 
"} " + 
"void mainImage1(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv, min(ceil(ceil(9.9189)), length(0.0)))); " + 
"	float a = (((4.0019/z)/z)/0.7110); " + 
"	vec2 point = (uv * a) + time; " + 
"	mainImageX1(fragColor, point); " + 
"} " + 
//  SCRAMBLE ROTANDO
"void mainImageX2(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = distance(fragCoord,cos(fragCoord)); " + 
"	fragColor = vec4(yy,distance(clamp(tan(x),distance(fragColor,fragColor),1.0),yy),distance(clamp(tan(x),distance(fragColor,fragColor),xx),yy),1.0); " + 
"} " + 
"void mainImage2(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv, min(ceil(ceil(9.9189)), length(0.0)))); " + 
"	float a = (((distance((vec3(uv,z).xyzy),vec4(4.0019,xx,z,z))/z)/z)/0.7110); " + 
"	vec2 point = (uv * a) + time; " + 
"	mainImageX2(fragColor, point); " + 
"} " + 
"void mainImageX3(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = distance(cos(sin(refract(fragCoord,log(normalize(log(normalize(fract(fragCoord))))),6.6052))),fragCoord); " + 
"	fragColor = vec4(tan(x),distance(clamp(tan(x),yy,x),yy),clamp(mod(ceil(x),x),distance(fragColor,fragColor),x),1.0); " + 
"} " + 
"void mainImage3(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv,min(ceil(ceil(9.9190)),length(0.0)))); " + 
"	float a = (((3.0744/z)/z)/4.5382); " + 
"	vec2 point = (uv * a) + time; " + 
"	mainImageX3(fragColor, point); " + 
"} " + 
"void mainImageX4(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = distance(cos(sin(refract(fragCoord,log(normalize(log(normalize(fract(fragCoord))))),6.6052))),fragCoord); " + 
"	fragColor = vec4(tan(x),distance(clamp(tan(x),yy,x),yy),clamp(mod(ceil(x),x),distance(fragColor,fragColor),x),1.0); " + 
"} " + 
"void mainImage4(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv,min(ceil(ceil(9.9190)),length(0.0)))); " + 
"	float a = (((3.0744/z)/z)/4.5382); " + 
"	vec2 point = (uv * a) + time; " + 
"	mainImageX4(fragColor, point); " + 
"} " + 
// CORTE CON PSEUDO DISTANCE FIELD
"float fr(vec3 pq) {" +
"	pq.z += 3.1090;" +
"	return length(((0.05 * cos((tan(log(time)) * pq.y) * pq.x)) + " +
"    	cos((pq-time))) - (0.7088 * cos((length(vec4(max(1.3796,6.6359)," +
"    	vec2(8.1590,1.0),xx))/9.3943) * ((pq.z + (0.3 * pq.x)) - pq.y)))) - " +
"    	fract(clamp(yy,1.7386,1.2111));" +
"}" +
"void mainImageX5(out vec4 c, in vec2 p) { " + 
"	vec3 d = length(clamp(vec2(8.1590,1.0000), yy, acos(3.4999)) / (p * p)) -" +
"	(vec3(p,inversesqrt(9.4561)) / sqrt((7.4969-radians(vec2(8.1590,1.0000)))).x), " +
"	o = vec3(vec2(8.1590,1.0000),exp(max(0.0810,2.2570)));" +
"	for (int i = 0; i < 99; i++) " +
"		o += (fr(o) * d);" +
"	c = vec4(abs((fr(o - d) * vec3(0, 0.1, 0.2)) + (fr(o - 0.6) " +
"	    * vec3(0.2, 0.1, 0))) * (yy - o.z), 1);" +
"} " + 
"void mainImage5(out vec4 fragColor, in vec2 fragCoord) { " + 
" 	mainImageX5(fragColor, fragCoord); " + 
"} " + 
// #TODO: Cambiar este, que desverdize todo un poco
"void mainImageX6(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = distance(cos(sin(refract(fragCoord,log(normalize(log(normalize(fract(fragCoord))))),6.6052))),fragCoord); " + 
"	fragColor = vec4(tan(x),distance(clamp(tan(x),dot((fragColor.xyyw),(fragColor.xzzy)),x),yy),clamp(mod(ceil(x),x),distance(fragColor,fragColor),x),1.0); " + 
"} " + 
"void mainImage6(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv,min(ceil(ceil(9.9190)),length(0.0)))); " + 
"	float a = (((max(max(yy,2.8826),mix(fovTheta,7.8785,fovTheta))/z)/z)/4.5382); " + 
"	vec2 point = (uv * a) + time; " + 
"	mainImageX6(fragColor, point); " + 
"} " + 
// #TODO: Este verduzco tal vez este mejor que el anterior
"void mainImageX7(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = distance(cos(sin(refract(fragCoord,log(normalize(log(normalize(fract(fragCoord))))),6.6052))),fragCoord); " + 
"	fragColor = vec4(tan(x),distance(clamp(tan(x),dot((fragColor.xyyw),(fragColor.xzzy)),x),yy),clamp(mod(ceil(x),x),distance(fragColor,fragColor),x),1.0); " + 
"} " + 
"void mainImage7(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv,min(ceil(ceil(9.9190)),length(0.0)))); " + 
"	float a = (((max(max(yy,2.8826),mix(fovTheta,7.8785,fovTheta))/z)/z)/4.5382); " + 
"	vec2 point = ((uv*(5.4285+a))+time); " + 
"	mainImageX7(fragColor, point); " + 
"} " + 
// #TODO: Con menos efecto
"void mainImageX8(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = distance(cos(sin(refract(fragCoord,log(normalize(log(normalize(fract(fragCoord))))),0.7565))),fragCoord); " + 
"	fragColor = vec4(tan(x),distance(clamp(tan(x),dot((fragColor.xyyw),(fragColor.xzzy)),x),yy),clamp(mod(ceil(x),x),distance(fragColor,fragColor),x),1.0); " + 
"} " + 
"void mainImage8(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv,min(ceil(ceil(9.9190)),length(0.0)))); " + 
"	float a = (((max(max(yy,2.8826),mix(fovTheta,7.8785,fovTheta))/z)/z)/4.5382); " + 
"	vec2 point = (uv * a) + time; " + 
"	mainImageX8(fragColor, point); " + 
"} " + 
"void mainImageX9(out vec4 c, in vec2 p) { " + 
"	vec3 d = length(clamp(vec2(8.1590,1.0000), yy, acos(3.4999)) / (p * p)) -" +
"	(vec3(p,inversesqrt(9.4561)) / sqrt((7.4969-radians(vec2(8.1590,1.0000)))).x), " +
"	o = vec3(vec2(8.1590,1.0000),exp(max(0.0810,2.2570)));" +
"	for (int i = 0; i < 99; i++) " +
"		o += (fr(o) * d);" +
"	c = vec4(abs((fr(o - d) * vec3(0, 0.1, 0.2)) + (fr(o - 0.6) " +
"	    * vec3(0.2, 0.1, 0))) * (yy - o.z), 1);" +
"} " + 
"void mainImage9(out vec4 fragColor, in vec2 fragCoord) { " + 
" 	mainImageX9(fragColor, fragCoord); " + 
"} " + 
"void mainImageX10(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = distance(cos(sin(refract(fragCoord,log(normalize(log(normalize(fract(fragCoord))))),6.6052))),fragCoord); " + 
"	fragColor = vec4(tan(x),distance(clamp(tan(x),dot((fragColor.xyyw),(fragColor.xzzy)),x),yy),clamp(mod(ceil(x),x),distance(fragColor,fragColor),x),1.0); " + 
"} " + 
"void mainImage10(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv,min(ceil(ceil(9.9190)),length(0.0)))); " + 
"	float a = (((max(max(yy,2.8826),mix(fovTheta,7.8785,fovTheta))/z)/z)/4.5382); " + 
"	vec2 point = ((uv*(5.4285+a))+time); " + 
"	mainImageX10(fragColor, point); " + 
"} " + 
"void mainImageX11(out vec4 fragColor, in vec2 fragCoord) { " + 
"	float x = distance(cos((fragCoord-(3.1861+xx))),fragCoord); " + 
"	fragColor = vec4(tan(x),distance(clamp(tan(x),dot((fragColor.xyyw),(fragColor.xzzy)),x),yy),clamp(mod(ceil(x),x),distance(fragColor,fragColor),x),1.0); " + 
"} " + 
"void mainImage11(out vec4 fragColor, in vec2 fragCoordS) { " + 
"	float fovTheta = xx + distance(vec2(6.3572, 5.781).yyy.zzyy.yxzx.ywz, atan(degrees(vec2(length(time))).yxy.yyx, vec2(1.9528, 0.6904).yyy)); " + 
"	vec2 uv = (vec2(xx,yy)-mod(degrees(5.4054),mix(3.7917,7.2981,8.7161))); " + 
"	float z = length(vec3(uv,min(ceil(ceil(9.9190)),distance(((smoothstep(0.4727,time,(vec4(length(uv),floor(xx),uv).wyyx)).www).zyzz),((uv.xyy).yzxz))))); " + 
"	float a = (((max(max(yy,2.8826),mix(dot((((vec3(1.1207,5.7173,0.0170).xzzx).wyzx).zxw),sign(((vec3(uv,sqrt(4.8910)).yyzz).wwz))),7.8785,fovTheta))/z)/z)/4.5382); " + 
"	vec2 point = (uv * a) + time; " + 
"	mainImageX11(fragColor, point); " + 
"} " + 
"void mainImageX12(out vec4 c, in vec2 p) {" +
"	vec3 d = length(clamp(vec2(8.1590,1.0000), yy, acos(3.4999)) / (p * p)) -" +
"	(vec3(p,inversesqrt(9.4561)) / sqrt((7.4969-radians(vec2(8.1590,1.0000)))).x), " +
"	o = vec3(vec2(8.1590,1.0000),exp(max(0.0810,2.2570)));" +
"	for (int i = 0; i < 99; i++) " +
"		o += (fr(o) * d);" +
"	c = vec4(abs((fr(o - d) * vec3(0, 0.1, 0.2)) + (fr(o - 0.6) " +
"	    * vec3(0.2, 0.1, 0))) * (yy - o.z), 1);" +
"}" +
"void mainImage12(out vec4 fragColor, in vec2 fragCoord) {" +
" 	mainImageX12(fragColor, fragCoord); " + 
"} ";