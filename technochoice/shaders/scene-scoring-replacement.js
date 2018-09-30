var setBackgroundSceneScoring2 =
	codePrecisionDefinition +
	"const int RAY_MARCHING_ITERATIONS = 95; " + 
	"const float RAY_MARCHING_TMAX = 40.0; " + 
	"const float MATERIAL_SKY = -1.0; " + 
	"const float MATERIAL_FLOOR = 1.49; " + 
	"const float MATERIAL_BALL = 47.0; " + 
	"const vec3 COLOR_SKY = vec3(0.8, 0.7, 0.5); " + 
	"const vec3 COLOR_BALL = vec3(0.2, 0.5, 0.9); " + 
	"const vec3 COLOR_FLOOR = vec3(0.2, 0.2, 0.2); " + 
	" " + 
	"vec3 bar(float x, float y) {   " + 
	"	float xxx = ((abs(((y-0.4)-(sin((x+(time*2.0)))/5.0)))*4.0)-(3.1052/3.1007));   " + 
	"	if (xxx < 0.5) " + 
	"		return vec3(faceforward(xxx, 5.8649, xxx)) * xxx; " + 
	"	else " + 
	"		return vec3(0.0);   " + 
	"}   " + 
	"vec2 hash( vec2 p ) { " + 
	"	p = vec2( dot(p,vec2(107.1,301.7)), " + 
	"			  dot(p,vec2(151.5,353.3)) ); " + 
	"	return -1.0 + 2.0*fract(sin(p)*43758.5453123); " + 
	"} " + 
	" " + 
	"float noise( in vec2 p ) { " + 
	"    vec2 i = floor( p ); " + 
	"    vec2 f = fract( p ); " + 
	"	vec2 u = f*f*(3.0-2.0*f); " + 
	"    return mix( mix( dot(hash( i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),  " + 
	"                     dot(hash( i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x), " + 
	"                mix( dot(hash( i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),  " + 
	"                     dot(hash( i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y); " + 
	"} " + 
	" " + 
	"float fractalnoise(in vec2 p, float scale, float opacity) { " + 
	"	float f = 0.0; " + 
	"    p *= scale; " + 
	"    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 ); " + 
	"    f  = 0.5000*noise(p);  " + 
	"    p = m*p; " + 
	"    f += 0.2500*noise(p);  " + 
	"    p = m*p; " + 
	"    f += 0.1250*noise(p);  " + 
	"    p = m*p; " + 
	"    f += 0.0625*noise(p);  " + 
	"    p = m*p; " + 
	"    f += 0.0312*noise(p);  " + 
	"	return (1.0 - opacity) + opacity * f; " + 
	"} " + 
	" " + 
	"float objectFloor(vec3 pos, float level) { " + 
	"	return pos.y - level; " + 
	"}  " + 
	" " + 
	"float objectSphere(vec3 pos, float radius) { " + 
	"	return length(pos) - radius; " + 
	"}  " + 
	" " + 
	"vec2 opU(vec2 d1, vec2 d2) { " + 
	"	return (d1.x < d2.x) ? d1 : d2; " + 
	"} " + 
	" " + 
	"vec2 hit(in vec3 pos) { " + 
	"	vec3 sphereRotPoint = vec3(pos.x + cos(time + pos.z),  " + 
	"                               pos.y + 0.5 * sin(time + pos.z),  " + 
	"                               mod(pos.z + time * 4.0, 0.75)) " + 
	"                           	- vec3(-1.25, 0.1, 0.2); " + 
	"  	 " + 
	"    vec2 sphereZ = vec2(objectSphere( " + 
	"                    	vec3(pos.x, pos.y, mod(pos.z + time, 1.0))  " + 
	"       						- vec3(-1.25, 0.1, 0.2), 0.25), MATERIAL_BALL), " + 
	"         sphereRot = vec2(objectSphere(sphereRotPoint, 0.15), MATERIAL_BALL), " + 
	"         sphereRotRot = " + 
	"        	vec2(objectSphere( " + 
	"        		sphereRotPoint +  " + 
	"        		vec3(0.25 * cos(time * 2.0), " + 
	"                     0.25 * sin(time * 2.0), " + 
	"                     0.0), " + 
	"                  0.06), " + 
	"                 	MATERIAL_BALL), " + 
	"        sphereRotRot2 = vec2(objectSphere( " + 
	"        		sphereRotPoint +  " + 
	"        		vec3(0.25 * cos(time * 2.0 + 6.28 * 0.33), " + 
	"                     0.25 * sin(time * 2.0 + 6.28 * 0.33), " + 
	"                     0.0), " + 
	"                  0.06), " + 
	"                 	MATERIAL_BALL), " + 
	"        sphereRotRot3 = vec2(objectSphere( " + 
	"        		sphereRotPoint +  " + 
	"        		vec3(0.25 * cos(time * 2.0 + 6.28 * 0.66), " + 
	"                     0.25 * sin(time * 2.0 + 6.28 * 0.66), " + 
	"                     0.0), " + 
	"                  0.06), " + 
	"                 	MATERIAL_BALL), " + 
	"        floorPlane = vec2(objectFloor(pos - vec3(0.25, -1.0, 0.0), 0.0), MATERIAL_FLOOR); " + 
	"     " + 
	"    vec2 res = opU(opU(opU(sphereRotRot, opU(sphereRotRot2, sphereRotRot3)), floorPlane),  " + 
	"                   opU(sphereRot, sphereRot)); " + 
	"     " + 
	"    return res; " + 
	"} " + 
	" " + 
	"vec3 calcNormal(in vec3 pos) { " + 
	"	vec3 eps = vec3(0.001, 0.0, 0.0); " + 
	"	vec3 nor = vec3( " + 
	"		hit(pos + eps.xyy).x - hit(pos - eps.xyy).x, " + 
	"		hit(pos + eps.yxy).x - hit(pos - eps.yxy).x, " + 
	"		hit(pos + eps.yyx).x - hit(pos - eps.yyx).x); " + 
	"	return normalize(nor); " + 
	"} " + 
	" " + 
	"mat3 setCamera(in vec3 ro, in vec3 ta, float cr) { " + 
	"	vec3 cw = normalize(ta-ro); " + 
	"	vec3 cp = vec3(sin(cr), cos(cr), 0.0); " + 
	"	vec3 cu = normalize(cross(cw, cp)); " + 
	"	vec3 cv = normalize(cross(cu, cw)); " + 
	"	return mat3(cu, cv, cw); " + 
	"} " + 
	" " + 
	"bool isMaterial (float material, float value) { " + 
	"	return abs(material - value) < 0.01; " + 
	"} " + 
	" " + 
	"vec3 colorForMaterial(float material, vec3 p) { " + 
	"	if (isMaterial(material, MATERIAL_FLOOR)) { " + 
	"        return 0.4 + COLOR_FLOOR * mod(floor(p.x * 4.0) + floor(p.z * 4.0), 2.0); " + 
	"	} " + 
	"	else if (isMaterial(material, MATERIAL_BALL)) " + 
	"		return COLOR_BALL; " + 
	"	else if (isMaterial(material, MATERIAL_SKY)) " + 
	"		return vec3(fractalnoise(vec2(p.x / 20.0, p.z), 0.1, 0.2)); " + 
	"	else " + 
	"		return vec3(0.0, 1.0, 0.0); " + 
	"} " + 
	" " + 
	"vec2 castRayToWorld(in vec3 ro, in vec3 rd) { " + 
	"	float tmin=1.0, tmax=RAY_MARCHING_TMAX, precis=0.01, t=tmin, m=-1.0; " + 
	" " + 
	"	for (int i=0; i< RAY_MARCHING_ITERATIONS; i++) { " + 
	"		vec2 p = hit(ro + rd * t); " + 
	"		if ((precis > p.x) || (t > tmax)) break; " + 
	"		t += p.x; " + 
	"		m = p.y; " + 
	"	} " + 
	" " + 
	"	if (t > tmax) m = -1.0; " + 
	"	return vec2(t, m); " + 
	"} " + 
	" " + 
	"vec3 render(in vec3 ro, in vec3 rd) { " + 
	"	vec2 value = castRayToWorld(ro, rd); " + 
	"	float distance = value.x; " + 
	"	float material = value.y; " + 
	"	vec3 color; " + 
	"	 " + 
	"	if (isMaterial(material, MATERIAL_SKY))  " + 
	"		color = COLOR_SKY; " + 
	"	else { " + 
	"		vec3 pos = ro + distance * rd; " + 
	"		color = colorForMaterial(material, pos); " + 
	"		vec3 normal = calcNormal(pos); " + 
	"		vec3 light = normalize(vec3(-0.6, 0.7, -0.5));	 " + 
	"		float dif = clamp(dot(normal, light), 0.0, 1.0); " + 
	"		float amb = clamp(0.5+0.5*normal.y, 0.0, 1.0); " + 
	"		vec3 brdf = vec3(dif); " + 
	"		brdf += 1.2 * amb * vec3(0.50, 0.20, 1.00); " + 
	"		color *= brdf; " + 
	"	} " + 
	"	 " + 
	"	return color; " + 
	"}  " + 
	" " + 
	"void mainImageBB(out vec4 fragColor, in vec2 fragCoord) { " + 
	"	vec2 q = fragCoord.xy; " + 
	"	vec2 p = q * 2.0 - 1.0; " + 
	"   vec3 ro = vec3(-1.25, 0.25, time); " + 
	"	vec3 ta = vec3(-3.5 + 1.0 / 100.0, -1.1  + 1.0 / 100.0 , 0.5); " + 
	"	mat3 ca = setCamera(ro, ta, 0.0); " + 
	"	vec3 rd = ca * normalize(vec3(p.xy, 2.5)); " + 
	"	fragColor = vec4(render(ro, rd), 1.0); " + 
	"} " + 
	"void mainImageAA(out vec4 fragColor, in vec2 fragCoord) { " + 
	"	vec3 barx = bar(reflect(dot(mix(refract(tan(time),xx,0.0),yy,6.4298),sign(radians(max(clamp(1.2251,0.9673,time),degrees(7.4997))))),min(5.8044,xx)), ((fragCoord+fragCoord).x * 1.5));" + 
	"	vec4 t;" + 
	"	mainImageBB(t, fragCoord); " + 
	"	if ((barx.r + barx.g + barx.b) < 0.01)" + 
	"		fragColor = (vec4(0.6743,yy,xx,1.0) + t) / 2.0;" + 
	"	else " + 
	"		fragColor = (vec4(0.6743,yy,xx,1.0) + vec4(barx, 1.0)) ; " + 
	"}  " + 
	"void mainImage1(out vec4 fragColor, in vec2 fragCoord) { " + 
	"	vec4 a; " + 
	"	mainImageAA(a, fragCoord); " + 
	"	fragColor = a; " + 
	"}";

	var setBackgroundSceneScoring3 =
	codePrecisionDefinition +
	"const int RAY_MARCHING_ITERATIONS = 95; " + 
	"const float RAY_MARCHING_TMAX = 40.0; " + 
	"const float MATERIAL_BALL = 47.0; " + 
	"const float MATERIAL_FLOOR = 1.49; " + 
	"const vec4 COLOR_BALL = vec4(0.2, 0.5, 0.9, 1.0); " + 
	" " + 
	"vec3 bar(float x, float y) {   " + 
	"	return vec3(0.0);   " + 
	"}   " + 
	"vec2 hash( vec2 p ) { " + 
	"	p = vec2( dot(p,vec2(107.1,301.7)), " + 
	"			  dot(p,vec2(151.5,353.3)) ); " + 
	"	return -1.0 + 2.0*fract(sin(p)*43758.5453123); " + 
	"} " + 
	" " + 
	"float noise( in vec2 p ) { " + 
	"    vec2 i = floor( p ); " + 
	"    vec2 f = fract( p ); " + 
	"	 vec2 u = f*f*(3.0-2.0*f); " + 
	"    return mix( mix( dot(hash( i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),  " + 
	"                     dot(hash( i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x), " + 
	"                mix( dot(hash( i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),  " + 
	"                     dot(hash( i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y); " + 
	"} " + 
	" " + 
	"float fractalnoise(in vec2 p, float scale, float opacity) { " + 
	"	float f = 0.0; " + 
	"    p *= scale; " + 
	"    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 ); " + 
	"    f  = 0.5000*noise(p);  " + 
	"    p = m*p; " + 
	"    f += 0.2500*noise(p);  " + 
	"    p = m*p; " + 
	"    f += 0.1250*noise(p);  " + 
	"    p = m*p; " + 
	"    f += 0.0625*noise(p);  " + 
	"    p = m*p; " + 
	"    f += 0.0312*noise(p);  " + 
	"	return (1.0 - opacity) + opacity * f; " + 
	"} " + 
	" " + 
	"float objectFloor(vec3 pos, float level) { " + 
	"	return pos.y - level; " + 
	"}  " + 
	" " + 
	"float objectSphere(vec3 pos, float radius) { " + 
	"	return length(pos) - radius; " + 
	"}  " + 
	" " + 
	"vec2 opU(vec2 d1, vec2 d2) { " + 
	"	return (d1.x < d2.x) ? d1 : d2; " + 
	"} " + 
	" " + 
	"vec2 hit(in vec3 pos) { " + 
	"	vec3 sphereRotPoint = vec3(pos.x + cos(time + pos.z),  " + 
	"                               pos.y + 0.5 * sin(time + pos.z),  " + 
	"                               mod(pos.z + time * 4.0, 0.75)) " + 
	"                           	- vec3(-1.25, 0.1, 0.2); " + 
	"  	 " + 
	"    vec2 sphereZ = vec2(objectSphere( " + 
	"                    	vec3(pos.x, pos.y, mod(pos.z + time, 1.0))  " + 
	"       						- vec3(-1.25 * (3.3 + sin(acumBeats)), 0.1* (3.3 + sin(acumBeats)), 0.2), 0.25), MATERIAL_BALL), " + 
	"         sphereRot = vec2(objectSphere(sphereRotPoint, 0.15), MATERIAL_BALL), " + 
	"         sphereRotRot = " + 
	"        	vec2(objectSphere( " + 
	"        		sphereRotPoint +  " + 
	"        		vec3(0.25 * cos(time * 2.0) * (3.3 + sin(acumBeats)), " + 
	"                     0.25 * sin(time * 2.0) * (1.1 + sin(acumBeats)), " + 
	"                     0.0), " + 
	"                  0.06), " + 
	"                 	MATERIAL_BALL), " + 
	"        sphereRotRot2 = vec2(objectSphere( " + 
	"        		sphereRotPoint +  " + 
	"        		vec3(0.25 * cos(time * 2.0 + 6.28 * 0.33)* (1.0 + sin(acumBeats)), " + 
	"                     0.25 * sin(time * 2.0 + 6.28 * 0.33)* (1.0 + sin(acumBeats)), " + 
	"                     0.0), " + 
	"                  0.06), " + 
	"                 	MATERIAL_BALL), " + 
	"        sphereRotRot3 = vec2(objectSphere( " + 
	"        		sphereRotPoint +  " + 
	"        		vec3(0.25 * cos(time * 2.0 + 6.28 * 0.66)* (1.0 + 1.5 * sin(acumBeats)), " + 
	"                     0.25 * sin(time * 2.0 + 6.28 * 0.66)* (1.0 + 2.0 * sin(acumBeats)), " + 
	"                     0.0), " + 
	"                  0.06), " + 
	"                 	MATERIAL_BALL), " + 
	"        floorPlane = vec2(objectFloor(pos - vec3(0.25, -1.0, 0.0), 0.0), MATERIAL_FLOOR); " + 
	"     " + 
	"    vec2 res = opU(opU(opU(sphereRotRot, opU(sphereRotRot2, sphereRotRot3)), floorPlane),  " + 
	"                   opU(sphereRot, sphereRot)); " + 
	"     " + 
	"    return res; " + 
	"} " + 
	" " + 
	"vec3 calcNormal(in vec3 pos) { " + 
	"	vec3 eps = vec3(0.001, 0.0, 0.0); " + 
	"	vec3 nor = vec3( " + 
	"		hit(pos + eps.xyy).x - hit(pos - eps.xyy).x, " + 
	"		hit(pos + eps.yxy).x - hit(pos - eps.yxy).x, " + 
	"		hit(pos + eps.yyx).x - hit(pos - eps.yyx).x); " + 
	"	return normalize(nor); " + 
	"} " + 
	" " + 
	"mat3 setCamera(in vec3 ro, in vec3 ta, float cr) { " + 
	"	vec3 cw = normalize(ta-ro); " + 
	"	vec3 cp = vec3(sin(cr), cos(cr), 0.0); " + 
	"	vec3 cu = normalize(cross(cw, cp)); " + 
	"	vec3 cv = normalize(cross(cu, cw)); " + 
	"	return mat3(cu, cv, cw); " + 
	"} " + 
	" " + 
	"bool isMaterial (float material, float value) { " + 
	"	return abs(material - value) < 0.01; " + 
	"} " + 
	" " + 
	"vec4 colorForMaterial(float material, vec3 p) { " + 
	"	if (isMaterial(material, MATERIAL_BALL)) " + 
	"		return COLOR_BALL; " + 
	"	else " + 
	"		return vec4(0.0, 1.0, 0.0, 0.0); " + 
	"} " + 
	" " + 
	"vec2 castRayToWorld(in vec3 ro, in vec3 rd) { " + 
	"	float tmin=1.0, tmax=RAY_MARCHING_TMAX, precis=0.01, t=tmin, m=-1.0; " + 
	" " + 
	"	for (int i=0; i< RAY_MARCHING_ITERATIONS; i++) { " + 
	"		vec2 p = hit(ro + rd * t); " + 
	"		if ((precis > p.x) || (t > tmax)) break; " + 
	"		t += p.x; " + 
	"		m = p.y; " + 
	"	} " + 
	" " + 
	"	if (t > tmax) m = -1.0; " + 
	"	return vec2(t, m); " + 
	"} " + 
	" " + 
	"vec4 render(in vec3 ro, in vec3 rd) { " + 
	"	vec2 value = castRayToWorld(ro, rd); " + 
	"	float distance = value.x; " + 
	"	float material = value.y; " + 
	"	vec4 color; " + 
	"	 " + 
	"	if (isMaterial(material, MATERIAL_BALL)) { " + 
	"		vec3 pos = ro + distance * rd; " + 
	"		color = colorForMaterial(material, pos); " + 
	"		vec3 normal = calcNormal(pos); " + 
	"		vec3 light = normalize(vec3(-0.6, 0.7, -0.5));	 " + 
	"		float dif = clamp(dot(normal, light), 0.0, 1.0); " + 
	"		float amb = clamp(0.5+0.5*normal.y, 0.0, 1.0); " + 
	"		vec3 brdf = vec3(dif); " + 
	"		brdf += 1.2 * amb * vec3(0.50, 0.20, 1.00); " + 
	"		color.rgb *= brdf; " + 
	"		color.a = 1.0; " + 
	"	} " + 
	"	else " + 
	"		color = vec4(0.0, 0.0, 1.0, 0.0); " + 
	"	 " + 
	"	return color; " + 
	"}  " + 
	" " + 
	"void mainImageBB(out vec4 fragColor, in vec2 fragCoord) { " + 
	"	vec2 q = fragCoord.xy; " + 
	"	vec2 p = q * 2.0 - 1.0; " + 
	"   vec3 ro = vec3(-1.25, 0.25, time); " + 
	"	vec3 ta = vec3(-3.5 + 1.0 / 100.0, -1.1  + 1.0 / 100.0 , 0.5); " + 
	"	mat3 ca = setCamera(ro, ta, 0.0); " + 
	"	vec3 rd = ca * normalize(vec3(p.xy, 2.5)); " + 
	"	fragColor = render(ro, rd); " + 
	"} " + 
	"void mainImageAA(out vec4 fragColor, in vec2 fragCoord) { " + 
	"	vec3 barx = bar(reflect(dot(mix(refract(tan(time),xx,0.0),yy,6.4298),sign(radians(max(clamp(1.2251,0.9673,time),degrees(7.4997))))),min(5.8044,xx)), ((fragCoord+fragCoord).x * 1.5));" + 
	"	vec4 t;" + 
	"	mainImageBB(t, fragCoord); " + 
	"	fragColor = clamp((vec4(0.6743,yy,xx,1.0) + t) / 2.0, 0.0, t.a);" + 
	"}  " + 
	"vec2 iResolutionX = vec2(8.1590,1.0000); " +
"float getTime() { return time + 20.0; } " +
"float ALPHAVALUE = 1.0; " +
" " +
"float f1(vec3 pq) { " +
"	float iGlobalTime = getTime(); " +
"	pq.z += 3.1090; " +
"	return length(((0.05 * cos((5.5872 * pq.y) * pq.x)) + cos((pq-iGlobalTime))) - (0.7088 * cos((length(vec4(max(1.3796,6.6359),iResolutionX,xx))/9.3943) * ((pq.z + (0.3 * pq.x)) - pq.y)))) - fract(clamp(yy,1.7386,getTime())); " +
"} " +
"void mainImageX1(out vec4 c, vec2 p) { " +
"	vec3 d = length(clamp(iResolutionX, yy, 0.0) / (p * p)) - (vec3(p, 1) / sqrt((7.4969-radians(iResolutionX))).x), o = vec3(iResolutionX,exp(max(0.0810,mix(xx,radians(((9.7406/exp(distance(iResolutionX,p)))*inversesqrt(0.1470))),pow(getTime(),distance(c,c)))))); " +
"	for (int i = 0; i < 99; i++) " +
"		o += (f1(o) * d); " +
"	c = vec4(abs((f1(o - d) * vec3(0, 0.1, 0.2)) + (f1(o - 0.6) * vec3(0.2, 0.1, 0))) * (yy - o.z), ALPHAVALUE); " +
"} " + 
"float f2(vec3 pq) { " + 
"	float iGlobalTime = getTime(); " + 
"	pq.z += 3.1090; " + 
"	return length(((0.05 * cos((tan(log(iGlobalTime)) * pq.y) * max(pq,pq).x)) + cos((pq-iGlobalTime))) - (inversesqrt(normalize(dot(pow(iResolutionX,iResolutionX),iResolutionX))) * cos((length(vec4(max(1.3796,6.6359),iResolutionX,xx))/9.3943) * ((pq.z + (0.3 * pq.x)) - vec3(getTime(),2.6350,6.2676).y)))) - fract(clamp(yy,1.7386,1.2111)); " + 
"} " + 
"void mainImageX2(out vec4 c, vec2 p) { " + 
"	vec3 d = length(clamp(iResolutionX, yy, 0.0) / (p * p)) - (vec3(p, 1) / sqrt((7.4969-radians(iResolutionX))).x), o = vec3(iResolutionX,exp(max(0.0810,2.2570))); " + 
"	for (int i = 0; i < 99; i++) " + 
"		o += (f2(o) * d); " + 
"	c = vec4(abs((f2(o - d) * vec3(0, 0.1, 0.2)) + (f2(o - 0.6) * vec3(0.2, 0.1, 0))) * (yy - o.z), ALPHAVALUE); " + 
"} " + 
"float f3(vec3 pq) { " + 
"	float iGlobalTime = time; " + 
"	pq.z += yy; " + 
"	return length(((atan(6.7157) * cos((tan(log(iGlobalTime)) * step(time,pq).y) * pq.x)) + cos(pq - iGlobalTime)) - (0.7088 * cos(length(vec4(max(1.3796, 6.6359), iResolutionX, xx)) / 9.3943 * (((pow(iResolutionX,iResolutionX).yxy).z + (length(((mix(pq,pq,3.5508).yyyx).xwy)) * atan(((vec4(8.7520,iGlobalTime,5.0155,time).yxwy).zzy),(normalize(pq).xxx)).x)) - vec3(time, 2.635, 6.2676).y)))) - fract(clamp(length((mod(pq,pq)/iGlobalTime)),inversesqrt(ceil(4.5980)),sin(8.1627))); " + 
"} " + 
"void mainImageX3(out vec4 c, vec2 p) { " + 
"	vec2 fragCoord = p; " + 
"	float x = length(fract(min(mod(fragCoord, mod(mod(log(fragCoord), dot(fragCoord, fragCoord)), fragCoord - dot(fragCoord, fragCoord))), yy))); " + 
"	vec4 color = vec4(xx, x - (length(fragCoord) * sqrt(x)), yy, acos(x)); " + 
"	vec3 d = length(clamp(iResolutionX, yy, 0.0) / (p * p)) - (vec3(p, 1) / sqrt(7.4969 - radians(iResolutionX)).x), o = vec3(iResolutionX, exp(max(0.081, 2.257))); " + 
"	for (int i = 0; i < 99; i++) " + 
"		o += (f3(o) * d); " + 
"	c = vec4(abs((f3(o - d) * vec3(0, 0.1, 0.2)) + (f3(o - 0.6) * vec3(0.2, 0.1, 0))) * (yy - o.z), ALPHAVALUE); " + 
"} " + 
"void mainImage1(out vec4 fragColor, vec2 p) { " + 
"	mainImageAA(fragColor, p); " + 
"	if (fragColor.a < 0.5) mainImageX1(fragColor, p); " + 
"} " + 
"void mainImage2(out vec4 fragColor, vec2 p) { " + 
"	mainImageAA(fragColor, p); " + 
"	if (fragColor.a < 0.5) mainImageX2(fragColor, p); " + 
"} " + 
"void mainImage3(out vec4 fragColor, vec2 p) { " + 
"	mainImageAA(fragColor, p); " + 
"	if (fragColor.a < 0.5) mainImageX3(fragColor, p); " + 
"} ";
