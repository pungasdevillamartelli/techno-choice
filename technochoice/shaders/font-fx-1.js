
var entityFontFxParameters = 
	"uniform int MessageBuffer[64]; " +
	"uniform float xdis; " +
	"uniform float ydis; " +
	"uniform float lineThickness; " + 
	"const int MAX_CHAR_LINES = 6; " +
	"uniform sampler2D cSampler; " +
	"const float FONT_DEFINITION = 25.0; ";
	
var entityFontFxFxFunctions = 
/*	"vec2 hash(vec2 p) { " + 
	"p = vec2(dot(p, vec2(107.1,301.7)), dot(p, vec2(151.5,353.3))); " + 
	"return -1.0 + 2.0*fract(sin(p)*43758.5453123); " + 
	"} " + 
	"float noise(in vec2 p) { " + 
	"    vec2 i = floor( p ); " + 
	"    vec2 f = fract( p ); " + 
	"    vec2 u = f*f*(3.0-2.0*f); " + 
	"    return mix( mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)), " + 
	"                    dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x), " + 
	"                mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), " + 
	"                    dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), " + 
	"						u.x), " + 
	"				 u.y); " + 
	"} " + 
	" " + 
	"float fractalnoise(in vec2 p, float scale, float opacity) { " + 
	"	 float f = 0.0; " + 
	"    p *= scale; " + 
	"    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 ); " + 
	"    f  = 0.5000*noise(p); " + 
	"    p = m*p; " + 
	"    f += 0.2500*noise(p); " + 
	"    p = m*p; " + 
	"    f += 0.1250*noise(p); " + 
	"    p = m*p; " + 
	"    f += 0.0625*noise(p); " + 
	"    p = m*p; " + 
	"    f += 0.0312*noise(p); " + 
	"	 return (1.0 - opacity) + opacity * f; " + 
	"} " + */
	" " + 
	"float distortion(vec3 pos) { " + 
	"    float vx = pos.x; " + 
	"    float vy = pos.y; " + 
	"    float vz = pos.z; " + 
	"    float a = 100.0; " + 
	"    float b = 25.0; " + 
	"    return sin(vx * a) * sin(vy * a) * sin(vz * a) / b; " + 
	"} " +  
	" " + 
	"float distortion2d(vec2 pos) { " + 
	"    float vx = pos.x; " + 
	"    float vy = pos.y; " + 
	"    float a = 25.0; " + 
	"    float b = 25.0; " + 
	"    return sin(vx * a) * sin(vy * a) / b; " + 
	"} " + 
	"float distortion2d2(vec2 pos) { " + 
	"    float vx = pos.x; " + 
	"    float vy = pos.y; " + 
	"    float a = 15.0; " + 
	"    float b = 15.0; " + 	
	"    return sin(vx * a) * cos(vy * a) / b; " + 
	"} ";
	
var entityFontFxFont = 
	// Line drawing function
	"float drawLine(vec2 p1, vec2 p2, vec2 uv) { " + 
	"  float a = abs(distance(p1, uv)); " + 
	"  float b = abs(distance(p2, uv)); " + 
	"  float c = abs(distance(p1, p2)); " + 
	"  if (a >= c || b >= c) return 0.0; " + 
	"  float p = (a + b + c) * 0.5; " + 
	"  float h = 2.0 / c * sqrt(p * (p - a) * (p - b) * (p - c)); " + 
	"  float r1 = mix(1.0, 0.0, smoothstep(0.9 * lineThickness, 1.5 * lineThickness, h)); " + 
	"  return r1; " + 
	"} " + 
	// Character drawing functions
	"vec4 letter(vec4 lines[MAX_CHAR_LINES], vec2 fragCoordExtern) { " + 
	"	float colorValue = 0.0, value; " + 
	"	vec2 fragCoord = fragCoordExtern; " + 
	"	float i = floor(fragCoord.x * 12.0 * FONT_DEFINITION); " + 
	"	float j = (((11.0 - 1.0) * FONT_DEFINITION)) - floor(fragCoord.y * 11.0 * FONT_DEFINITION); " + 
	" 	" + 
	"	for (int k=0; k < MAX_CHAR_LINES; k++) { " + 
	"		if (lines[k].x == 0.0 && lines[k].y == 0.0 && lines[k].z == 0.0 && lines[k].w == 0.0) " + 
	"			break; " + 
	"		value = drawLine(lines[k].xy * 1.0, lines[k].zw * 1.0, vec2(i, j));" + 
	"		colorValue = max(colorValue, value); " + 
	"	} " + 
	"	return vec4(colorValue, colorValue, colorValue, colorValue); " + 
	"} ";

// Texture binding float array passing
var entityFontFxCharacterFunctions = 
	"vec4 letterGeneric(int indexFont, vec2 fragCoord) { " + 
	"	vec4 lines[MAX_CHAR_LINES]; " + 
	"	lines[0] = texture2D(cSampler, vec2(0 + indexFont * MAX_CHAR_LINES, 0) / 256.0) * FONT_DEFINITION; " + 
	"	lines[1] = texture2D(cSampler, vec2(1 + indexFont * MAX_CHAR_LINES, 0) / 256.0) * FONT_DEFINITION; " + 	
	"	lines[2] = texture2D(cSampler, vec2(2 + indexFont * MAX_CHAR_LINES, 0) / 256.0) * FONT_DEFINITION; " + 
	"	lines[3] = texture2D(cSampler, vec2(3 + indexFont * MAX_CHAR_LINES, 0) / 256.0) * FONT_DEFINITION; " + 
	"	lines[4] = texture2D(cSampler, vec2(4 + indexFont * MAX_CHAR_LINES, 0) / 256.0) * FONT_DEFINITION; " + 
	"	lines[5] = texture2D(cSampler, vec2(5 + indexFont * MAX_CHAR_LINES, 0) / 256.0) * FONT_DEFINITION; " + 
	"	return letter(lines, fragCoord); " + 
	"}";
	
var entityFontFxFrames = 
	// Frames with text
	"vec4 textPart1(vec2 fragCoord, float i, float j) { " + 
	"	vec2 transformed = vec2(fragCoord.x * i, fragCoord.y * j); " + 
	"	float charX = -1.0; " + 
	"	vec4 finalColor = vec4(0.0, 0.0, 0.0, 1.0); " + 
	"	vec4 result; " + 
	"	" + 
	"	for (int ij=0; ij< MAX_LENGTH_TEXT; ij++) { " + 
	"		if (MessageBuffer[ij] == 255) break; " + 
	"		result = letterGeneric(	MessageBuffer[ij], " + 
	"								distortion2d(transformed * 15.0) + " + 
	"								distortion2d(transformed * 1.5 + time / 7.0) + " +
	"								vec2(fragCoord.x * i - (charX+=1.0), transformed.y)); " + 
	"		vec4 t = finalColor + result; " + 
	"		finalColor = vec4(min(t.r, 1.0), min(t.g, 1.0), min(t.b, 1.0), min(t.a, 1.0)); " + 
	"		if (distance(result, vec4(0.0)) > 0.001) break; " + 
	"	} " + 
	"	return finalColor; " + 
	"} " + 
	"vec4 textPart2(vec2 fragCoord, float i, float j) { " + 
	"	vec2 transformed = vec2(fragCoord.x * i, fragCoord.y * j); " + 
	"	float charX = -1.0; " + 
	"	vec4 finalColor = vec4(0.0, 0.0, 0.0, 1.0); " + 
	"	vec4 result; " + 
	"	for (int ij=0; ij< MAX_LENGTH_TEXT; ij++) { " + 
	"		if (MessageBuffer[ij] == 255) break; " + 
	"		result = letterGeneric(MessageBuffer[ij], " +
	"					distortion2d(transformed * 1.2 + time / 15.0) + vec2(fragCoord.x * i - (charX+=1.0), transformed.y)); " + 
	"		vec4 t = finalColor + result; " + 
	"		finalColor = vec4(min(t.r, 1.0), min(t.g, 1.0), min(t.b, 1.0), min(t.a, 1.0)); " + 
	"		if (distance(result, vec4(0.0)) > 0.001) break; " + 
	"	} " + 
	"	return finalColor; " + 
	"} " + 
	// Deformer functions
	"float correctorX() { " + 
	"	return (2.0 + sin(time * 2.3) * cos(time * 7.3)/ 2.0) / 2.0; " + 
	"} " + 
	"float correctorY() { " + 
	"	return (2.0 + cos(time * 2.7) * sin(time * 3.3)/ 2.0) / 2.0; " + 
	"} " +	
	// Different frame definitions for interpolation under "textFunction" template function
	"vec4 textFunction1(vec2 fragCoord, float i, float j) { " + 
	"	return textPart1(fragCoord - vec2(xdis, ydis), i / correctorX(), j / correctorY()); " + 
	"} "  + 	
	"vec4 textFunction2(vec2 fragCoord, float i, float j) { " + 
	"	return textPart2(fragCoord - vec2(xdis, ydis),i / correctorX(), j / correctorY()); " + 
	"}";

