var demoSingleton;

var ShaderSetResources = {
	backgrounds1: setShaderSet1,
	backgrounds2: setShaderSet2,
	backgrounds3: setShaderSetFutura,
	greenBarComments: setGreenBarComments,
	greenBarComments2: setGreenBarComments2,
	backgroundSceneScoring: setBackgroundSceneScoring,
	backgroundSceneScoring2: setBackgroundSceneScoring2,
	backgroundSceneScoring3: setBackgroundSceneScoring3,
	backgroundBlack: setShaderSceneBlack,
}

function Demo() {
	this.textureCanvas = null;
	this.glContext = null;
	demoSingleton = this;
}

Demo.prototype.render = function (glContext) {
	this.sequencer.render(glContext);
}

Demo.prototype.initialize = function (glContext, textCanvas) {
	var globalPostProcessingFragmentShader =
		codePrecisionDefinition + 
		"varying vec2 vTextureCoord; " +
		"uniform sampler2D uSampler; " +
		"uniform sampler2D vSampler; " +
		"uniform float time; " +
		"uniform float faderValue; " +
		"varying float xx; " + 
		"varying float yy; " + 
		"vec3 postProcessVHSA(in vec2 q) {" + 
		"	 vec2 uv = 0.5 + (q - 0.5);" + 
		"    float aa = sin(time * 3.0);" + 
		"    float bb = sin(time * 2.5);" + 
		"    float cc = sin(time * 3.9);" + 		
		"    vec3 col = vec3( " + 
		"    	texture2D(uSampler, vec2(uv.x + 0.005 * aa, uv.y)).r, " + 
		"    	texture2D(uSampler, vec2(uv.x + 0.002 * bb, uv.y)).g, " + 
		"    	texture2D(uSampler, vec2(uv.x - 0.0035 * cc, uv.y)).b " + 
		"    ); " + 
		"    return" + 
		"    	(col) * " + 
		"    	(0.9 + 0.1 * sin(10.0 * time + uv.y * 1000.0)) * " + 
		"    	(0.99 + 0.01 * sin(107.0 * time));" + 
		"}" +
		"vec3 postProcessVHSB(in vec2 q) {" + 
		"	 vec2 uv = 0.5 + (q - 0.5);" + 
		"    float aa = sin(time * 3.0);" + 
		"    float bb = sin(time * 2.5);" + 
		"    float cc = sin(time * 3.9);" + 
		"    vec3 col = vec3( " + 
		"    	texture2D(vSampler, vec2(uv.x + 0.005 * aa, uv.y)).r, " + 
		"    	texture2D(vSampler, vec2(uv.x + 0.002 * bb, uv.y)).g, " + 
		"    	texture2D(vSampler, vec2(uv.x - 0.0035 * cc, uv.y)).b " + 
		"    ); " + 
		"    return" + 
		"    	(col) * " + 
		"    	(0.9 + 0.1 * sin(10.0 * time + uv.y * 1000.0)) * " + 
		"    	(0.99 + 0.01 * sin(107.0 * time));" + 
		"}" +
		"void main(void) { " + 
		"	vec2 coord = vTextureCoord; " + 
		"   vec3 textureColorA = postProcessVHSA(vec2(coord.s, coord.t)); " + 
		"   vec3 textureColorB = postProcessVHSB(vec2(coord.s, coord.t)); " + 
		"	vec4 a = vec4(textureColorA.r, textureColorA.g, textureColorA.b, 1.0); " + 
		"	vec4 b = vec4(textureColorB.r, textureColorB.g, textureColorB.b, 1.0); " + 
		"	gl_FragColor = a * faderValue + (1.0 - faderValue) * b; " + 
		"}";
	
	// Scene sequencer
	this.sequencer = new TimeStepsSceneSequencer(this, sceneEventsTable, 1.0, glContext, globalPostProcessingFragmentShader);
	// Fonts
	// Scenes
	this.sequencer.addSceneNamed(initializeScenePungas, "scene pungas");
	this.sequencer.addSceneNamed(initializeSceneDistanceAcum1, "scene distance acum 1");
	this.sequencer.addSceneNamed(initializeSceneDistanceAcum2, "scene distance acum 2");
	this.sequencer.addSceneNamed(initializeSceneDistanceParticles, "scene distance particles");
	this.sequencer.addSceneNamed(initializeSceneBarScoring1, "scene bar scoring 1");
	this.sequencer.addSceneNamed(initializeSceneBarScoring2, "scene bar scoring 2");
	this.sequencer.addSceneNamed(initializeSceneBar1, "scene bar 1");
	this.sequencer.addSceneNamed(initializeSceneBar2, "scene bar 2");
	this.sequencer.addSceneNamed(initializeSceneBlack, "scene nothing");
	this.sequencer.initializeScenes(glContext, textCanvas);
}	

function initializeScenePungas (demo, glContext, textCanvas) {
	var background = new EntityShaderInterpolation(ShaderSetResources.backgrounds1, 25.0);
	background.initialize(glContext);
	var effectX = "sin(time * 4.0 + 4.0 * 3.141592653589 * y) * 0.0035";
	var effectY = "sin(time * 4.0 + 4.0 * 3.141592653589 * x) * 0.0035";
	var s = demo.sequencer.getStart("scene pungas");
	var e = demo.sequencer.getStart("scene distance acum 1");

	var shaderSourceTemplatePresents = 
		codePrecisionDefinition + 
		"varying vec2 vTextureCoord; " +
		"uniform sampler2D uSampler; " +
		"uniform highp float faderValue; " + 
		"uniform float time; " + 
		"uniform float acumBeats; " + 
		"uniform float wiggle; " + 	
		"varying float xx; " + 
		"varying float yy; " + 
		"void main(void) { " + 
		"	float x = vTextureCoord.s, y = vTextureCoord.t; " + 
		"  	vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); " + 
		"	gl_FragColor = vec4(textureColor.xyz, faderValue * (1.0 - textureColor.x)); " + 
		"}";
		
	var shaderSourceTemplate =	
		codePrecisionDefinition + 
		"varying vec2 vTextureCoord; " +
		"uniform sampler2D uSampler; " +
		"uniform highp float faderValue; " + 
		"uniform float time; " + 
		"uniform float wiggle; " + 	
		"varying float xx; " + 
		"varying float yy; " + 
		"float distortion2d(vec2 pos) { " + 
		"    float vx = pos.x, vy = pos.y; " + 
		"    float a = 15.0, b = 15.0; " + 
		"    return sin(vx * a) * cos(vy * a) / b; " + 
		"} " + 
		"float timeAffector(float t, float s, float r) { " + 
		"	if (t < s) " + 
		"		return 1.0; " + 
		"	else " + 
		"		return 1.0 + (t - s) * r; " + 
		"}" + 
		"bool isLameBackground(vec4 c) { " + 
		"	const float k = 0.05; " + 
		"	return ((abs(c.r - 0.196) < k) && (abs(c.g - 0.133) < k) &&  (abs(c.b - 0.027) < k)); " + 
		"} " + 
		"void main(void) { " + 
		"	float s = timeAffector(time, 19.0, 0.5);" + 
		"	vec2 tex = vTextureCoord / s - 0.5 / s + 0.5; " + 
		"	vec2 wiggledTexCoord = tex; " + 
		"	float x = wiggledTexCoord.s * s, y = wiggledTexCoord.t * s;" +
		"	wiggledTexCoord.s += VALUEPA; " + 
		"	wiggledTexCoord.t += VALUEPB; " + 
		"	vec2 d = vec2(sin(x * 3.0 + time), cos(y * 7.0 + time * 2.0)) / 20.0 + distortion2d(vec2(x * 2.5, y * 3.0)) / 12.0; " + 
		"   vec4 t = texture2D(uSampler, vec2(wiggledTexCoord.s + d.x, wiggledTexCoord.t + d.y)); " + 
		"	if (!isLameBackground(t)) {" + 
		"		float x = wiggledTexCoord.s, y = wiggledTexCoord.t;" + 
		"		gl_FragColor = vec4(t.x, t.y, t.z, faderValue); " + 
		"	} " + 
		" 	else " + 
		"		gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);" + 
		"}" ;

	var logoPungas = new LogoObject("logo-pungas", effectX, effectY,
							  [ new Fader(s + 8.25, s + 9.0, e - 1.1, e + 2.8) ], 
 							  new AnimationProperties(0.0, 0.0, 1.0, 1.0),
							  textCanvas, 
							  1024,
							  glContext,
							  0.0,
							  0,
							  shaderSourceTemplate);
							  
	var effectXPresents = "sin(time * 4.0 + 4.0 * 3.141592653589 * y) * 0.001";
	var effectYPresents = "sin(time * 4.0 + 4.0 * 3.141592653589 * x) * 0.001";	
	demo.logoPresents = new LogoObject("logo-presents", effectXPresents, effectYPresents,
							 [ new Fader(e - 3.0, e - 2.5, e + 2.5, e + 3.0) ], 
 							  new AnimationProperties(0.0, 0.0, 1.0, 1.0),
							  textCanvas, 
							  1024,
							  glContext,
							  0.0,
							  0,
							  shaderSourceTemplatePresents);
							  
	var renderer = new Renderer(MovizerRendererFragmentShaderSrcPungas3);
	renderer.initialize(glContext);
	return new Scene([ background, logoPungas, demo.logoPresents ], renderer);
}

function initializeSceneBarScoring1 (demo, glContext, textCanvas) {
	var entityFontFxFontNew = 
		// Line drawing function
		"float drawLine(vec2 p1, vec2 p2, vec2 uv) { " + 
		"  float a = abs(distance(p1, uv)); " + 
		"  float b = abs(distance(p2, uv)); " + 
		"  float c = abs(distance(p1, p2)); " + 
		"  if (a >= c || b >= c) return 0.0; " + 
		"  float p = (a + b + c) * 0.5; " + 
		"  float h = 2.0 / c * sqrt(p * (p - a) * (p - b) * (p - c)); " + 
		"  return mix(1.0, 0.0, smoothstep(0.5 * lineThickness, 1.5 * lineThickness, h)); " + 
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
		
	var entityFontFxNew = 
		entityFontFxParameters + 
		entityFontFxFxFunctions + 
		entityFontFxFontNew + 
		entityFontFxCharacterFunctions + 
		entityFontFxFrames;
	
	var background = new EntityShaderInterpolation(ShaderSetResources.backgroundSceneScoring, 1.0);
	background.initialize(glContext);
	var renderer = new Renderer(MovizerRendererFragmentShaderSrcDistanceSynchroScoring);
	renderer.initialize(glContext);
	var s = demo.sequencer.getStart("scene bar scoring 1");
	var message2 = new EntityFxFontInterpolation(entityFontFxNew, 4.0, 19.0, 9.0, 0.34, 0.60, 
		["    the", "production", "   of", "  climax", "   the"], 
		[ new Fader(s + 2.0, s + 2.5, s + 8.0, s + 9.0) ] );
	var message3 = new EntityFxFontInterpolation(entityFontFxNew, 4.0, 19.0, 9.0, 0.34, 0.2, 
		["  ", "  process", " capital", "    is", " machine"],
		[ new Fader(s + 2.0, s + 2.5, s + 8.0, s + 9.0) ] );
	message2.timeStart = s + 0.25;
	message3.timeStart = s + 0.25;
	message2.secondsToWait = 4.0;
	message3.secondsToWait = 4.0;
	message2.lineThickness = 30.0;
	message3.lineThickness = 30.0;
	message2.initialize(glContext);
	message3.initialize(glContext);
	
	return new Scene([ background, message2, message3 ], renderer);	
}

function initializeSceneBarScoring2 (demo, glContext, textCanvas) {
	var background = new EntityShaderInterpolation(ShaderSetResources.backgroundSceneScoring2, 1.0);
	var s = demo.sequencer.getStart("scene bar scoring 2");
	background.timeStart = s - 1.0;
	background.initialize(glContext);
	var renderer = new Renderer(MovizerRendererFragmentShaderSrcDistanceSynchroScoring);
	renderer.initialize(glContext);
	return new Scene([ background ], renderer);	
}

function initializeSceneDistanceAcum1 (demo, glContext, textCanvas) {
	var s = demo.sequencer.getStart("scene distance acum 1");

	var background = new EntityShaderInterpolation(ShaderSetResources.backgrounds2, 8.0);
	background.initialize(glContext);
	
	// #TODO: Flash at s + 4.76

	// Demo logo
	var effectX = "1.0";
	var effectY = "1.0";
	
	var shaderSourceTemplate = 
		codePrecisionDefinition + 
		"varying vec2 vTextureCoord; " +
		"uniform sampler2D uSampler; " +
		"uniform highp float faderValue; " + 
		"uniform float time; " + 
		"uniform float acumBeats; " + 
		"uniform float wiggle; " + 	
		"varying float xx; " + 
		"varying float yy; " + 
		"float distortion2d2(vec2 pos) { " + 
		"    float vx = pos.x; " + 
		"    float vy = pos.y; " + 
		"    float a = 9.0; " + 
		"    float b = 11.0; " + 
		"    return sin(vx * a) * cos(vy * a) / b; " + 
		"} " + 
		"void main(void) { " + 
		"	vec2 wiggledTexCoord = vTextureCoord; " + 
		"	float x = wiggledTexCoord.s, y = wiggledTexCoord.t;" + 
		"	wiggledTexCoord.s += VALUEPA; " + 
		"	wiggledTexCoord.t += VALUEPB; " + 
		"	vec2 d = vec2(sin(x * 3.0 + time), cos(y * 7.0 + time * 2.0)) / 20.0 + distortion2d2(vec2(x * 2.5, y * 3.0)) / 2.0;" + 
		"	float dis = distance(vec2(1.5, 1.5), wiggledTexCoord + d);" + 
		"	if (dis < 0.44) {" + 
		"   	vec4 textureColor = texture2D(uSampler, vec2(wiggledTexCoord.s, wiggledTexCoord.t) + distortion2d2(vec2(x * 2.5, y * 3.0 + time / 2.0)) / 10.0); " + 
		"		vec3 c = textureColor.xyz; " + 
		"		vec4 v = vec4(c.xyz, 1.0); " + 
		"		float rr = c.r - c.g - c.b; " + 
		"		rr = max(c.r - c.g - c.b, 0.0); " + 
		"		if (dis < 0.39) " + 
		"			gl_FragColor = vec4(v.x, v.y, v.z, faderValue); " + 
		"		else if (dis < 0.41) " + 
		"			gl_FragColor = vec4(v.x, v.y, v.z, 0.85 * faderValue); " + 
		"		else " + 
		"			gl_FragColor = vec4(v.x, v.y, v.z, 0.65 * faderValue); " + 
		"		if (c.r > 0.2 && c.g < 0.46) " + 
		"			gl_FragColor.a *= 0.0; " + 
		"		else " + 
		"			gl_FragColor.rgb *= 1.1; " + 
		"		gl_FragColor.rgb *= min(gl_FragColor.rgb, vec3(1.0,1.0,1.0)); " + 	
		"	} " + 
		"}" ;
		
	var logoDemo = new LogoObject("logo-demo", effectX, effectY,
							  [ new Fader(s + 4.75, s + 5.0, s + 17.0, s + 19.0) ], 
 							  new AnimationProperties(0.0, 0.0, 1.0, 1.0),
							  textCanvas, 
							  1024,
							  glContext,
							  0.0,
							  0, 
							  shaderSourceTemplate);

	var renderer = new BloomRenderer(MovizerRendererFragmentShaderSrcDistanceSynchro2);
	renderer.initialize(glContext);	
	return new Scene([ background, logoDemo, demo.logoPresents], renderer);
}

function initializeSceneDistanceAcum2 (demo, glContext, textCanvas) {
	var entityFontFxFramesNew = 
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
		"								distortion2d(transformed * 9.0 + time / 13.0) + " + 
		"								distortion2d(transformed * 1.5 + time / 7.0) + " +
		"								vec2(fragCoord.x * i - (charX+=1.0), transformed.y)); " + 
		"		vec4 t = finalColor + result; " + 
		"		finalColor = vec4(min(t.r, 1.0), min(t.g, 1.0), min(t.b, 1.0), min(t.a, 1.0)); " + 
		"		if (distance(result, vec4(0.0)) > 0.01) break; " + 
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
		"		if (distance(result, vec4(0.0)) > 0.01) break; " + 
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
		"	return textPart2(fragCoord - vec2(xdis, ydis), i / correctorX(), j / correctorY()); " + 
		"}";

	var entityFontFxFontNew = 
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
		"		value = drawLine(lines[k].xy * 1.0, lines[k].zw * 1.0, vec2(i, j) / (1.5 + sin(time * 2.0)));" + 
		"		colorValue = max(colorValue, value); " + 
		"	} " + 
		"	return vec4(colorValue, colorValue, colorValue, colorValue); " + 
		"} ";		
	
	var entityFontFxParametersNew = 
		"uniform int MessageBuffer[16]; " +
		"uniform float xdis; " +
		"uniform float ydis; " +
		"uniform float lineThickness; " + 
		"const int MAX_CHAR_LINES = 6; " +
		"uniform sampler2D cSampler; " +
		"const float FONT_DEFINITION = 25.0; ";
		
	var entityFontFxNew = 
		entityFontFxParametersNew + 
		entityFontFxFxFunctions + 
		entityFontFxFontNew + 
		entityFontFxCharacterFunctions + 
		entityFontFxFramesNew;	
	
	var rendererFragmentShader =
		codePrecisionDefinition + 
		"varying vec2 vTextureCoord; " +
		"uniform sampler2D uSampler; " +
		"uniform float time; " +
		"uniform float wiggle; " +
		"uniform float acumBeats; " +	
		"varying float yy; " + 
		"varying float xx; " + 
		"vec3 postProcessVHS(in vec2 q) {" + 
		"	 vec2 uv = 0.5 + (q - 0.5) * (0.9 + 0.1 * sin(0.2 * time));" + 
		"    float df = (0.8 + 0.2 * sin(109.0 * time)) * 0.0;" + 
		"    vec3 col = vec3( " + 
		"    	texture2D(uSampler, vec2(uv.x + 0.005 * df, uv.y)).r, " + 
		"    	texture2D(uSampler, vec2(uv.x + 0.002 * df, uv.y)).g, " + 
		"    	texture2D(uSampler, vec2(uv.x - 0.0035 * df, uv.y)).b " + 
		"    ); " + 
		"    return" + 
		"    	(col*0.5+0.5*col*col*col) * " + 
		"    	vec3(1.0, 0.9, 1.0) * " + 
		"    	(0.9 + 0.1 * sin(10.0 * time + uv.y * 1000.0)) * " + 
		"    	(0.99 + 0.01 * sin(107.0 * time));" + 
		"}" +
		"float sqr(float x) { return x; } " +
		"void main(void) { " + 
		"	float time = time / 2.0 - 6.0; " + 
		"	vec2 coord = vTextureCoord; " + 
		"	vec3 border = vec3(0.0); " + 	
		"	float rx = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.t)) * 0.011; " + 
		"	float ry = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.s)) * 0.011;	" + 
		"	vec3 textureColor = postProcessVHS(vec2(coord.s + rx, coord.t + ry)); " + 
		"	gl_FragColor = vec4(textureColor.r, textureColor.g , textureColor.b, 1.0); " + 
		"}  ";		
	
	// #NOTE 3.06 to see all frames 1 time and dont repeat (or maybe just a little bit)
	var background = new EntityShaderInterpolation(ShaderSetResources.backgrounds3, 3.06);
	background.initialize(glContext);
	var s = demo.sequencer.getStart("scene distance acum 2");
	var e = demo.sequencer.getStart("scene bar scoring 2");

	var message2 = new EntityFxFontInterpolation(entityFontFxNew, 4.0, 19.0, 9.0, 0.24, 0.6, 
		["   the", "  class", " simply", "  hold", "   the", "machinery", " ", "  lets", " them", "  our"], 
		[ new Fader(s + 2.0, s + 2.5, e - 0.5, e - 1.0) ] );
	var message3 = new EntityFxFontInterpolation(entityFontFxNew, 4.0, 19.0, 9.0, 0.25, 0.3, 
		["working", "  cannot", "  lay ", "   of", "readymade", " ", " ", "  hack", "  for", "purposes"],
		[ new Fader(s + 2.0, s + 2.5, e - 2.5, e - 1.0) ] );
	message2.globalScale = 2.5;
	message2.lineThickness = 30.0;
	message2.initialize(glContext);
	message3.lineThickness = 30.0;
	message3.initialize(glContext);	
	message2.timeStart = s + 0.25;
	message3.timeStart = s + 0.25;
	message2.secondsToWait = 3.65;
	message3.secondsToWait = 3.65;	
	var renderer = new BloomRenderer(rendererFragmentShader);
	renderer.initialize(glContext);	
	return new Scene([ background, message2, message3], renderer);
}

function initializeSceneDistanceParticles (demo, glContext, textCanvas) {
	var bloomFragmentShader = [
		codePrecisionDefinition, 
		"varying vec2 vTextureCoord; ",
		"uniform sampler2D uSampler; ",
		"uniform float time; ",
		"varying float xx; ", 
		"varying float yy; ", 
		"void main(void) { ", 
		//	Weight map
		" 	float weight[7]; ", 
		"   weight[0] = 0.5; ", 
		"   weight[1] = 0.227027; ", 
		"   weight[2] = 0.1945946; ", 
		"   weight[3] = 0.1216216; ", 
		"   weight[4] = 0.054054; ", 
		"   weight[5] = 0.026216; ", 
		"   weight[6] = 0.01216; ", 
		// Apply kernel
		"	vec2 coord = vTextureCoord; ", 
		"	vec3 result = texture2D(uSampler, coord).rgb * weight[0]; ",
		"	vec2 tex_offset = 1.0 / vec2(128.0); ", 
		" 	for (float i=1.0; i< 7.0; i++) {", 
		" 		for (float j=1.0; j< 5.0; j++) {", 
		" 			vec3 at = texture2D(uSampler, coord + vec2(tex_offset.x * i, tex_offset.y * j)).rgb; " + 
		" 			vec3 bt = texture2D(uSampler, coord - vec2(tex_offset.x * i, tex_offset.y * j)).rgb; " + 
		"   	    if ((at.b > 0.6) && (at.g < 0.7)) result += at * weight[int(i)] * weight[int(j)]; ", 
		"       	if ((bt.b > 0.6) && (bt.g < 0.7))  result += bt * weight[int(i)] * weight[int(j)]; ",  
		"   	}", 
		"   }", 
		"	gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0); ", 
		"}"].join('\n');
    
    var balls = new EntityShaderInterpolation(ShaderSetResources.backgroundSceneScoring3, 1.0);
    var s = demo.sequencer.getStart("scene bar scoring 2");
    balls.timeStart = s;
    balls.initialize(glContext);
	var renderer = new BloomRenderer(MovizerRendererFragmentShaderSrcPungas2, bloomFragmentShader);
	renderer.initialize(glContext);	
	var list = [ balls ];
	return new Scene(list, renderer);
}

function initializeSceneBar1 (demo, glContext, textCanvas) {
	var s = demo.sequencer.getStart("scene bar 1");
	var background = new EntityShaderInterpolationFont(
		ShaderSetResources.greenBarComments, 200.0,
		// Font bars
		19.0, 9.0, 0.34, 0.60, 
		["    greets goes to triad,pnx,hf,impure,gp,antlantis !                                                                          "], 
		2.0,
		[ new Fader(s + 2.0, s + 2.5, s + 8.0, s + 9.0) ] 
		);
	background.timeStart = s - 1.01;
	background.secondsToWait = 10.2;
	background.charsArray = charsArray2();
	background.initialize(glContext);
    var renderer = new Renderer(MovizerRendererFragmentShaderSrcDistanceSynchro2);
	renderer.initialize(glContext);	
	var list = [ background ];
	return new Scene(list, renderer);  
}

function initializeSceneBar2 (demo, glContext, textCanvas) {
	var s = demo.sequencer.getStart("scene bar 2");
	var background = new EntityShaderInterpolationFont(
		ShaderSetResources.greenBarComments2, 200.0,
		// Font bars
		19.0, 9.0, 0.34, 0.60, 
		[" oh yeah glsl,radio,cracking and security contributors too !                                            "], 
		2.0,
		[ new Fader(s + 2.0, s + 2.5, s + 8.0, s + 9.0) ] 
		);

	background.charsArray = charsArray2();
	background.timeStart = s - 1.01;
	background.secondsToWait = 10.2;
	background.initialize(glContext);
    var renderer = new Renderer(MovizerRendererFragmentShaderSrcDistanceSynchro2);
	renderer.initialize(glContext);	
	var list = [ background ];
	return new Scene(list, renderer);
}

function initializeSceneBlack (demo, glContext, textCanvas) {
	var background = new EntityShaderInterpolation(ShaderSetResources.backgroundBlack, 1.0);
	background.initialize(glContext);
	var renderer = new Renderer(DefaultRendererFragmentShaderSrc);
	renderer.initialize(glContext);	
	return new Scene([ background ], renderer);
}
