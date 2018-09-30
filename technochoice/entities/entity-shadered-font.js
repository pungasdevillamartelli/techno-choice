// Max text length
var MAX_TEXT_LENGTH = 11;

// Font lyric background
var EntityFxFontInterpolationVertexShaderSrc = 
	"attribute vec3 aVertexPosition; " +
	"attribute vec2 aTextureCoord; " + 
	"uniform mat4 uMVMatrix; " + 
	"uniform mat4 uPMatrix; " + 
	"varying float xx, yy; " + 
	"void main(void) { " + 
	"	vec2 coord = aTextureCoord; " + 
	"	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 2.0); " + 
	"	xx = clamp(aVertexPosition.x,0.0,1.0); " + 
	"	yy = clamp(aVertexPosition.y,0.0,1.0); " + 
	"}";

var EntityFxFontInterpolationFragmentShaderSrc =
	codePrecisionDefinition + 
	"varying float xx; " + 
	"varying float yy; " + 
	"uniform float indexA; " + 
	"uniform float indexB; " + 
	"uniform float aa; " + 
	"uniform float time; " + 
	"uniform float faderValue; " + 	
	" SHADER_FUNCTION_DEFINITIONS " + 
	"vec3 hsl2rgb(in float h, float s, float l) {" + 
	"	vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0); " + 
	"	return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0)); " +
	"} " + 	
	"void main(void) { " + 
	"	float a = aa, x = xx * 10.0, y = yy * 10.0; " + 	
	"	vec4 vaa, vbb; " + 
	" SHADER_CALL " + 
	"	float tt = 0.0; " + 
	"	vec3 value = vec3((vaa.x * a + vbb.x * (1.0 - a)) * faderValue, (vaa.y * a + vbb.y * (1.0 - a)) * faderValue, (vaa.z * a + vbb.z * (1.0 - a)) * faderValue); " +
	"	tt = value.b; " + 
	"	value = hsl2rgb(value.x, value.y,  value.z); " + 
	"	gl_FragColor = vec4(value, tt * faderValue); " + 
	"}";
	
		
function EntityFxFontInterpolation (entity, timeFrame, sizeX, sizeY, x, y, texts, step, effects) {
	this.entity = entity;
	this.globalScale = 1.0;
	this.x = x;
	this.y = y;	
	this.sizeX = sizeX;	
	this.sizeY = sizeY;
	this.texts = texts; 
	this.frameSelector = new NextFrameSelector(timeFrame);
	this.step = step;
	this.timeStart = 0.0;
	this.secondsToWait = 2.0;
	this.lineThickness = 15.0;
	this.effects = effects;
} 

EntityFxFontInterpolation.prototype = Object.create(new Entity());

EntityFxFontInterpolation.prototype.initialize = function (gl) {
	this.mvMatrix = mat4.create();
	this.pMatrix = mat4.create();
	this.initBuffersRGB(gl);
	this.initShadersRGBAnimate(gl);
	this.frameSelector.initializeInterpolation(this.entity.length);
	
	if (!gl.getExtension("OES_texture_float"))
		handleInitError("Can't use OES_texture_float GLSL extension."); 
	
	this.texture = this.textureFromFloats(gl, 256, 1, new Float32Array(this.charsArray1()));
}

EntityFxFontInterpolation.prototype.textureFromFloats = function (gl, w, h, array) {
	var oldActive = gl.getParameter(gl.ACTIVE_TEXTURE);
	gl.activeTexture(gl.TEXTURE15);
	
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, array);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	
	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.activeTexture(oldActive);
	return texture;	
}

EntityFxFontInterpolation.prototype.messageArray = function () {
	var aIndex = "a".charCodeAt(0);
	var result = this.textNow().split('').map(
		function (x) { 
			if (x == ' ') return 255;
			return x.charCodeAt(0) - aIndex; 
		} );
	
	while (result.length < MAX_TEXT_LENGTH)
		result.push(255);
	
	return result;
}

EntityFxFontInterpolation.prototype.textNow = function () {
	var v = timerValue() - this.timeStart;
	if (v < 0.0) v = 0.0;
	var i = Math.floor(v / this.secondsToWait) % this.texts.length;
	return this.texts[Math.floor(i)];
}	

EntityFxFontInterpolation.prototype.charsArray1 = function () {
	const infinite = 5000.0;
	
	return [
			// A
			4.5, 1.0, 9.0, 9.0,
			4.5, 1.0, 1.0, 9.0,
			2.5, 6.0, 7.5, 6.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// B
			1.0, 1.0, 1.0, 9.0,
			1.0, 9.0, 9.0, 9.0,
			1.0, 1.0, 7.0, 1.0,
			1.0, 4.5, 9.0, 4.5,
			7.0, 1.0, 7.0, 4.5,
			9.0, 4.5, 9.0, 9.0,			
			// C
			1.0, 1.0, 1.0, 9.0,
			1.0, 8.0, 8.0, 9.0,
			1.0, 1.0, 8.0, 1.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// D
			1.0, 1.0, 1.0, 9.0,
			6.5, 1.0, 9.0, 4.5,
			9.0, 4.5, 6.5, 9.0,
			6.5, 9.0, 1.0, 9.0,
			6.5, 1.0, 1.0, 1.0,
			0.0, 0.0, 0.0, 0.0,
			// E
			1.0, 1.0, 1.0, 9.0,
			1.0, 8.0, 8.0, 9.0,
			1.0, 1.0, 8.0, 1.0,
			1.0, 4.5, 8.0, 4.5,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// F
			1.0, 1.0, 1.0, 9.0,
			1.0, 1.0, 8.0, 1.0,
			1.0, 4.5, 8.0, 4.5,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// G
			1.0, 1.0, 1.0, 9.0,
			1.0, 1.0, 9.0, 1.0,
			1.0, 9.0, 9.0, 9.0,
			9.0, 9.0, 9.0, 5.0,
			9.0, 5.0, 4.5, 5.0,
			0.0, 0.0, 0.0, 0.0,
			// H
			1.0, 0.5, 1.0, 9.0,
			9.0, 0.5, 9.0, 9.0,
			1.0, 4.5, 9.0, 4.5,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,			
			// I
			4.0, 1.0, 4.0, 9.0,
			4.0, 0.5, 4.0, -1.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// J
			4.0, 0.0, 4.0, 8.0,
			4.0, 7.0, 2.0, 9.0,
			0.0, 0.0, 0.0, 0.0,		
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// K
			1.0, 1.0, 1.0, 9.0,
			1.0, 5.0, 9.0, 1.0,
			1.0, 5.0, 9.0, 9.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// L
			1.0, -infinite, 1.0, 12.0,
			1.0, 12.0, infinite, 12.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,			
			// M
			1.0, 1.0, 1.0, 9.0,
			9.0, 1.0, 9.0, 9.0,
			1.0, 2.0, 4.5, 5.0,
			9.0, 2.0, 4.5, 5.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// N
			1.0, 1.0, 1.0, infinite,
			1.0, 2.0, 9.0, 8.0,
			9.0, -3.0, 9.0, 9.0,
			9.0, -3.0, infinite, -3.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// O
			1.5, 1.5, 1.5, 8.5,
			8.5, 1.5, 8.5, 8.5,
			1.5, 8.5, 8.5, 8.5,
			1.5, 1.5, 8.5, 1.5,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// P
			1.0, 1.0, 1.0, 9.0,
			1.0, 1.0, 9.0, 1.0,
			1.0, 4.0, 9.0, 4.0,
			9.0, 1.0, 9.0, 4.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// Q
			1.5, 1.5, 1.5, 8.5,
			8.5, 1.5, 8.5, 8.5,
			1.5, 8.5, 8.5, 8.5,
			1.5, 1.5, 8.5, 1.5,
			6.0, 6.0, 9.75, 9.75,
			0.0, 0.0, 0.0, 0.0,
			// R
			1.0, 1.0, 1.0, 9.0,
			1.0, 1.0, 9.0, 1.0,
			1.0, 4.0, 9.0, 4.0,
			9.0, 1.0, 9.0, 4.0,
			5.0, 4.0, 9.0, 9.0,
			0.0, 0.0, 0.0, 0.0,
			// S
			1.0, 1.0, 8.0, 1.0,
			1.0, 1.0, 8.0, 9.0,
			1.0, 9.0, 8.0, 9.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// T
			1.0, 1.0, 9.0, 1.0,
			4.5, 1.0, 4.5, 9.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,			
			// U
			1.0, 1.0, 1.0, 9.0,
			9.0, 1.0, 9.0, 9.0,
			1.0, 9.0, 9.0, 9.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// V
			1.0, 1.0, 4.5, 9.0,
			9.0, 1.0, 4.5, 9.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,			
			// W
			0.0, 0.0, 2.5, 9.0,
			2.5, 9.0, 4.5, 6.0,
			4.5, 6.0, 6.5, 9.0,
			6.5, 9.0, 10.0, 0.0,
			0.0, 0.0, 0.0, 0.0,			
			0.0, 0.0, 0.0, 0.0,
			// X
			1.0, 1.0, 9.0, 9.0,
			1.0, 9.0, 9.0, 1.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,			
			// Y
			4.5, 4.5, 1.0, 1.0,
			4.5, 4.5, 9.0, 1.0,
			4.5, 4.5, 4.5, 9.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// Z
			1.0, 1.0, 8.0, 1.0,
			8.0, 1.0, 1.0, 9.0,
			1.0, 9.0, 8.0, 9.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			// EXTRA
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
			0.0, 0.0, 0.0, 0.0,
		];
} 

EntityFxFontInterpolation.prototype.render = function (gl) {
	var globalVa = timerValue();
	gl.useProgram(this.shaderProgram);	
	this.frameSelector.updateInterpolationValues(this.entity.length);

	// Update animation
	for (var effect in this.effects) 
		this.effects[effect].apply(this);
	
	// Send uniforms
	var location = gl.getUniformLocation(this.shaderProgram, "time");
	gl.uniform1f(location, globalVa);
	
	location = gl.getUniformLocation(this.shaderProgram, "faderValue");
    gl.uniform1f(location, this.transparencyValue);	
	var valueAA = (globalVa - this.frameSelector.lastUpdate) / this.frameSelector.timeFrame;
	location = gl.getUniformLocation(this.shaderProgram, "indexA");
	gl.uniform1f(location, this.frameSelector.indexA);	
	location = gl.getUniformLocation(this.shaderProgram, "indexB");
	gl.uniform1f(location, this.frameSelector.indexB);	
	location = gl.getUniformLocation(this.shaderProgram, "aa");
	var aa = valueAA < 1.0 ? valueAA : 1.0;
	gl.uniform1f(location, 1.0 - aa);	
	// Send character definitions
	location = gl.getUniformLocation(this.shaderProgram, "MessageBuffer");
	gl.uniform1iv(location, this.messageArray());
	location = gl.getUniformLocation(this.shaderProgram, "xdis");
	gl.uniform1f(location, this.x.toFixed(2));	
	location = gl.getUniformLocation(this.shaderProgram, "ydis");
	gl.uniform1f(location, this.y.toFixed(2));	
	location = gl.getUniformLocation(this.shaderProgram, "lineThickness");
	gl.uniform1f(location, this.lineThickness);		
	var textureUnit = 0;
	var texture = this.texture;
	gl.activeTexture(gl.TEXTURE0 + textureUnit);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	location = gl.getUniformLocation(this.shaderProgram, "cSampler");
	gl.uniform1i(location, textureUnit);
	
	gl.enable(gl.BLEND);
	gl.blendEquation(gl.FUNC_ADD);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
	gl.disable(gl.DEPTH_TEST);
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	mat4.identity(this.pMatrix);
	mat4.ortho(0, 1, 0, 1, 0.1, 10.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -10.0]);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
//	gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numItems);
}

EntityFxFontInterpolation.prototype.initBuffersRGB = function (gl) {
	this.squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	var vertices = [ 2.0, 2.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.itemSize = 3;
	this.numItems = 4;
}

EntityFxFontInterpolation.prototype.createFunctions = function () {
	var functions = ["textFunction"];
	var result = [];

	for (var i=0; i< functions.length; i++) {
		var counter = 0;
		
		exists = this.entity.indexOf(functions[i] + (counter + 1)) >= 0;
		while (exists == true) {
			counter++;
			exists = this.entity.indexOf(functions[i] + (counter + 1)) >= 0;
		}
		
		result.push({ name: functions[i], count: counter });
	}
	
	this.functions = result;
}	
	
EntityFxFontInterpolation.prototype.maxTextsLength = function () {	
	var maxLength = this.texts[0].length;
	
	for (var i=1; i< this.texts.length; i++) {
		if (maxLength < this.texts[i].length)
			maxLength = this.texts[i].length;
	}
	
	return maxLength;
}
	
EntityFxFontInterpolation.prototype.initShadersRGBAnimate = function (gl) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, EntityFxFontInterpolationVertexShaderSrc);
	gl.compileShader(vertexShader);

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	this.createFunctions();
	
	// Replace function definitions (EntityFxFontInterpolationFragmentShaderSrc just have headers)
	var source = EntityFxFontInterpolationFragmentShaderSrc.replace("SHADER_FUNCTION_DEFINITIONS", this.entity);
	// Replace call to shader functions
	var funcionesCode = "if (false) {} ";
	for (var j=0; j < this.functions.length; j++)
		for (var i=0; i< this.functions[j].count; i++)
			funcionesCode += " else if (mod(indexA, " + this.functions[j].count.toFixed(2) + ") == " + i + ".0) { vaa = " + 
				this.functions[j].name + (i+1) + "(vec2(xx, yy), " + 
					this.sizeX.toFixed(2) + ", " + this.sizeY.toFixed(2) + "); } ";
	funcionesCode += " if (false) {} ";
	for (var j=0; j < this.functions.length; j++)
		for (var i=0; i< this.functions[j].count; i++)
			funcionesCode += " else if (mod(indexB, " + this.functions[j].count.toFixed(2) + ") == " + i + ".0) { vbb = " + 
				this.functions[j].name + (i+1) + "(vec2(xx, yy), " + 
					this.sizeX.toFixed(2) + ", " + this.sizeY.toFixed(2) + "); } ";
	source = source.replace("SHADER_CALL", funcionesCode);

	// Set with max of all texts
	var maxLength = this.maxTextsLength();
	source = source.replace("MAX_LENGTH_TEXT", maxLength);
	source = source.replace("MAX_LENGTH_TEXT", maxLength);
	
	// Compile and get matrix uniforms
	gl.shaderSource(fragmentShader, source);
	gl.compileShader(fragmentShader);

	this.shaderProgram = gl.createProgram();
	var shaderProgram = this.shaderProgram;
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
	this.checkShaderLinkStatus(gl, fragmentShader, vertexShader);
	gl.useProgram(shaderProgram);
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	//shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	//gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

EntityFxFontInterpolation.prototype.charsArrayPermutated = function () {
	if (this.permutatedArray == null) {
		this.permutatedArray = this.charsArray1().copy();
		
		for (var i=0; i< this.permutatedArray.length; i++) {
			var a = Math.random() * this.permutatedArray.length;
			var b = Math.random() * this.permutatedArray.length;
			var aux = this.permutatedArray[a];
			this.permutatedArray[a] = this.permutatedArray[b];
			this.permutatedArray[b] = aux;
		}
	}
	
	return this.permutatedArray;
}
