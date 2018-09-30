
var setGreenBarComments = 
	codePrecisionDefinition +
	" " + 
	entityFontFxParameters + 
	entityFontFxFxFunctions + 
	entityFontFxFont + 
	entityFontFxCharacterFunctions + 
"float sacos(float x) { return acos(clamp(x, -1.0, 1.0)); } " + 
"float sasin(float x) { return asin(clamp(x, -1.0, 1.0)); } " + 
"vec2 sasin(vec2 x) { return asin(clamp(x, -1.0, 1.0)); } " + 
"vec3 sasin(vec3 x) { return asin(clamp(x, -1.0, 1.0)); } " + 	
"vec4 movingTextOnBar(vec2 fragColor, float i, float j) { " + 
"	vec2 transformed; " + 
"	float xi = fragColor.x * i + time * 2.5; " + 
"	vec4 returnValue = vec4(0.0); " + 
"	transformed.x = mod(xi, i); " + 
"	transformed.y = fragColor.y * j; " + 
"	for (int k=0; k< 128; k++) {" + 
//"	 	int character = int(texture2D(cSampler, vec2(768, 0)).r * 256.0); " + 
//"		vec4 v = letterGeneric(character, vec2(xi - float(k), transformed.y)); " + 
"		vec4 v = letterGeneric(MessageBuffer[k], vec2(xi - float(k), transformed.y)); " + 
"		if (abs(v.r) + abs(v.g) + abs(v.b) > 0.0) " + 
"			return v; " + 
"	} " + 
"	return returnValue; " + 
"} " + 
" " + 
"vec3 bar(float x, float y) { " + 
"	float time = time / 3.0; " + 
"	float xxx = ((abs(((y-0.4000)-(sin((x+(time*2.0000)))/5.0000)))*4.0000)-(sin((x+(time*5.0000)))/9.6482)); " + 
"	if (xxx < 0.5) { " + 
"		return fract(vec3(vec2(cos(floor(xx)), yy), xxx)) * xxx; " + 
"	} " + 
"	else { " + 
"		return vec3(0.0); " + 
"	} " + 
"} " + 
" " + 
"vec3 textbar(float x, float y, out float intext) { " + 
"	float time = time / 3.0; " + 
"	float xxx = ((abs(((y-0.4)-(sin((x+(time*2.0)))/5.0)))*4.0)-(sin((x+(time*5.0)))/9.6482)); " + 
"	 " + 
"	intext = xxx; " + 
"	if (xxx < 0.5) { " + 
"		float yminval = 0.0, ymaxval = 1.0,delta = 1.0 / 128.0; " + 
"		 " + 
"		for (float i=0.0; i< 128.0; i+=1.0) { " + 
"			yminval = i * delta; " + 
"			if ((bar(x, yminval).b) > 0.0) { " + 
"				break; " + 
"			} " + 
"		}	 " + 
"		 " + 
"		for (float i=0.0; i< 128.0; i+=1.0) { " + 
"			ymaxval = 1.0 - i * delta; " + 
"			if ((bar(x, ymaxval).b) > 0.0) { " + 
"				break; " + 
"			} " + 
"		} " + 
"		 " + 
"		float size = 1.0 / (ymaxval - yminval); " + 
"		vec4 logo = movingTextOnBar(vec2(xx, yy - yminval), 8.0, size); " + 
"		 " + 
"		return bar(x, y) + logo.xyz; " + 
"	} " + 
"	else { " + 
"		return vec3(0.0); " + 
"	} " + 
"} " + 
" " + 
"vec2 iResolutionA = vec2(8.1595,1.0000); " + 
" " + 
"float f(vec3 p) { " + 
"	float iGlobalTime = time; " + 
"	p.z += iGlobalTime; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (yy * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - asin(0.3157); " + 
"} " + 
"vec3 mainImageBackground(vec2 p) { " + 
"	vec3 d = length((clamp(iResolutionA,yy,0.0)/(p*p))) - (vec3(p,yy) / iResolutionA.x), o = clamp(d,xx,distance(p,iResolutionA)); " + 
"	for (int i = 0; i < 99; i++) { " + 
"		o += (f(o) * d); " + 
"	} " + 
"	return vec4(abs((f(o - d) * vec3(0, 0.1, 0.2)) + (f(o - 0.6) * vec3(0.2, 0.1, 0))) * ((mix(o,d,xx)+6.8977) - (mix(o,d,xx)+max(atan(min(min((refract(9.3239,xx,yy)*7.3389),(5.4259+step(yy,3.5313))),dot(yy,0.2013)),yy),3.8527)).z), 1).rgb; " + 
"} " + 
"vec3 background(float x, float y) { " + 
"	return mainImageBackground(vec2(cos(xx),xx)); " + 
"} " + 
"void mainImage1(out vec4 fragColor, vec2 p) { " + 
"	float intext; " + 
"	vec3 text = textbar(p.x, p.y, intext); " + 
"	if (intext < 0.5) " + 
"	fragColor = vec4(text, 1.0); " + 
"	else " + 
"	fragColor = vec4(background(p.x, p.y), 1.0); " + 
"} " + 
"void mainImage2(out vec4 fragColor, vec2 p) { " + 
"	float intext; " + 
"	vec3 text = textbar(p.x, p.y, intext); " + 
"	if (intext < 0.5) " + 
"		fragColor = vec4(text, 1.0); " + 
"	else  " + 
"		fragColor = vec4(background(p.x, p.y), 1.0); " + 
"} ";

var setGreenBarComments2 = 
	codePrecisionDefinition +
	" " + 
	entityFontFxParameters + 
	entityFontFxFxFunctions + 
	entityFontFxFont + 
	entityFontFxCharacterFunctions + 
"float sacos(float x) { return acos(clamp(x, -1.0, 1.0)); } " + 
"float sasin(float x) { return asin(clamp(x, -1.0, 1.0)); } " + 
"vec2 sasin(vec2 x) { return asin(clamp(x, -1.0, 1.0)); } " + 
"vec3 sasin(vec3 x) { return asin(clamp(x, -1.0, 1.0)); } " + 
" " + 
"vec4 movingTextOnBar(vec2 fragColor, float i, float j) { " + 
"	vec2 transformed; " + 
"	float xi = fragColor.x * i + time * 2.5; " + 
"	vec4 returnValue = vec4(0.0); " + 
"	transformed.x = mod(xi, i); " + 
"	transformed.y = fragColor.y * j; " + 
"	for (int k=0; k< 128; k++) {" + 
//"	 	int character = int(texture2D(cSampler, vec2(768, 0)).r * 256.0); " + 
//"		vec4 v = letterGeneric(character, vec2(xi - float(k), transformed.y)); " + 
"		vec4 v = letterGeneric(MessageBuffer[k], vec2(xi - float(k), transformed.y)); " + 
"		if (abs(v.r) + abs(v.g) + abs(v.b) > 0.0) " + 
"			return v; " + 
"	} " + 
"	return returnValue; " + 
"} " + 
" " + 
"vec3 bar(float x, float y) { " + 
"	float time = time / 3.0; " + 
"	float xxx = ((abs(((y-0.4000)-(sin((x+(time*2.0000)))/5.0000)))*4.0000)-(sin((x+(time*5.0000)))/9.6482)); " + 
"	if (xxx < 0.5) { " + 
"		return fract(vec3(vec2(cos(floor(xx)), yy), xxx)) * xxx; " + 
"	} " + 
"	else { " + 
"		return vec3(0.0); " + 
"	} " + 
"} " + 
" " + 
"vec3 textbar(float x, float y, out float intext) { " + 
"	float time = time / 3.0; " + 
"	float xxx = ((abs(((y-0.4)-(sin((x+(time*2.0)))/5.0)))*4.0)-(sin((x+(time*5.0)))/9.6482)); " + 
"	 " + 
"	intext = xxx; " + 
"	if (xxx < 0.5) { " + 
"		float yminval = 0.0, ymaxval = 1.0,delta = 1.0 / 128.0; " + 
"		 " + 
"		for (float i=0.0; i< 128.0; i+=1.0) { " + 
"			yminval = i * delta; " + 
"			if ((bar(x, yminval).b) > 0.0) { " + 
"				break; " + 
"			} " + 
"		}	 " + 
"		 " + 
"		for (float i=0.0; i< 128.0; i+=1.0) { " + 
"			ymaxval = 1.0 - i * delta; " + 
"			if ((bar(x, ymaxval).b) > 0.0) { " + 
"				break; " + 
"			} " + 
"		} " + 
"		 " + 
"		float size = 1.0 / (ymaxval - yminval); " + 
"		vec4 logo = movingTextOnBar(vec2(xx, yy - yminval), 8.0, size); " + 
"		 " + 
"		return bar(x, y) + logo.xyz; " + 
"	} " + 
"	else { " + 
"		return vec3(0.0); " + 
"	} " + 
"} " + 
" " + 
// Used http://rock.pungas.space:9000/editor-code.html?id=935b50c0-a287-11e8-ad2b-693b8100ddd0 finally
"vec2 iResolutionA = vec2(8.1595,1.0); " + 
" " + 
"float f(vec3 p, vec2 px) { " + 
"	p.z += time; " + 
"	return length(((0.05 * cos((9.0 * p.y) * p.x)) + cos(p)) - (px.y * cos(distance(p,p) * ((p.z + (0.3 * p.x)) - p.y)))) - sasin(0.3157); " + 
"} " + 
"vec3 mainImageBackground(vec2 p, vec2 point) { " + 
"	vec3 d = length((clamp(iResolutionA,point.y,sacos(3.4999))/(p*p))) - (vec3(inversesqrt(p),8.4743) / iResolutionA.x),  " + 
"	     o = clamp(d,p.x,1.0986); " + 
"	for (int i = 0; i < 99; i++) " + 
"		o += (f(o, point) * d); " + 
"	return vec4(abs((f(o - d, point) * vec3(0, 0.1, 0.2)) + (f(o - 0.6, point) * vec3(0.2, 0.1, 0))) * ((step(p.y,5.322)*6.8977) + o.z), 1).xyz; " + 
"} " + 
"vec3 background(float x, float y) { " + 
"	return mainImageBackground(vec2(xx,xx), vec2(xx, yy)); " + 
"} " + 
"void mainImage1(out vec4 fragColor, vec2 p) { " + 
"	float intext; " + 
"	vec3 text = textbar(p.x, p.y, intext); " + 
"	if (intext < 0.5) " + 
"		fragColor = vec4(text, 1.0); " + 
"	else " + 
"		fragColor = vec4(background(p.x, p.y), 1.0); " + 
"} " + 
"void mainImage2(out vec4 fragColor, vec2 p) { " + 
"	float intext; " + 
"	vec3 text = textbar(p.x, p.y, intext); " + 
"	if (intext < 0.5) " + 
"		fragColor = vec4(text, 1.0); " + 
"	else  " + 
"		fragColor = vec4(background(p.x, p.y), 1.0); " + 
"} ";
