 
// Shader background
var EntityShaderInterpolationVertexShaderSrcFont = 
	"attribute vec3 aVertexPosition; " +
	"attribute vec2 aTextureCoord; " + 
	"uniform mat4 uMVMatrix; " + 
	"uniform mat4 uPMatrix; " + 
	"varying float xx, yy; " + 
	"varying vec2 vTextureCoord; " + 	
	"void main(void) { " + 
	"	vec2 coord = aTextureCoord; " + 
	"	vTextureCoord = aTextureCoord; " + 	
	"	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 2.0); " + 
	"	xx = clamp(aVertexPosition.x, 0.0, 1.0); " + 
	"	yy = clamp(aVertexPosition.y, 0.0, 1.0); " + 
	"}";

var EntityShaderInterpolationFragmentShaderSrcFont =
	codePrecisionDefinition + 
	"varying float xx; " + 
	"varying float yy; " + 
	"varying vec2 vTextureCoord; " + 
	"uniform float indexA; " + 
	"uniform float indexB; " + 
	"uniform float aa; " + 
	"uniform float time; " + 
	"uniform float acumBeats; " +
	"uniform float faderValue; " + 	
	" SHADER_FUNCTION_DEFINITIONS " + 
	"void main(void) { " + 
	"	vec2 wiggledTexCoord = vTextureCoord; " + 	
	// #NOTE: Added because could not be used at all
	"	float aux = acumBeats;" + 
	"	float a = aa, x = xx * 10.0, y = yy * 10.0; " + 
	"	vec4 vaa, vbb; " + 
	" SHADER_CALL " + 
	"	gl_FragColor = vec4((vaa.x * a + vbb.x * (1.0 - a)) * faderValue, (vaa.y * a + vbb.y * (1.0 - a)) * faderValue, (vaa.z * a + vbb.z * (1.0 - a)) * faderValue, 1.0); " + 
	"}";
	
	
function EntityShaderInterpolationFont (entity, timeFrame, sizeX, sizeY, x, y, texts, step, effects, charsArray) {
	this.entity = entity;
	this.globalScale = 1.0;
	this.globalXRef = 1.0;
	this.globalYRef = 1.0;	
	this.frameSelector = new NextFrameSelector(timeFrame);
	this.lineThickness = 15.0;	
	this.x = x;
	this.y = y;	
	this.sizeX = sizeX;	
	this.sizeY = sizeY;
	this.texts = texts; 	

	if (charsArray != null)
		this.charsArray = charsArray;
	else
		this.charsArray = charsArray1();
	this.timeStart = 0.0;
} 

EntityShaderInterpolationFont.prototype = Object.create(new Entity());

EntityShaderInterpolationFont.prototype.initialize = function (gl) {
	this.mvMatrix = mat4.create();
	this.pMatrix = mat4.create();
	this.initBuffersRGB(gl);
	this.initShadersRGBAnimate(gl);
	this.frameSelector.initializeInterpolation(this.entity.length);
	
	if (!gl.getExtension("OES_texture_float"))
		handleInitError("Can't use OES_texture_float GLSL extension."); 
	
	this.texture = this.textureFromFloats(gl, 256, 1, new Float32Array(this.charsArray));		
}

EntityShaderInterpolationFont.prototype.textureFromFloats = function (gl, w, h, array) {
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

EntityShaderInterpolationFont.prototype.render = function (gl) {
	var globalVa = timerValue();
	gl.useProgram(this.shaderProgram);	
	
	this.frameSelector.updateInterpolationValues(this.entity.length);
	
	// #TODO: Update info for these variables usage
	var location = gl.getUniformLocation(this.shaderProgram, "time");
	var objectTime = globalVa - this.timeStart;
	if (objectTime < 0.0) objectTime = 0.0;
	
	gl.uniform1f(location, objectTime);	
	
    //gl.uniform1f(location, globalVa);	
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
	location = gl.getUniformLocation(this.shaderProgram, "acumBeats");
	gl.uniform1f(location, acumBeats);
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
	mat4.ortho(0, 1, 0, 1, 0.1, 100.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -10.0]);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numItems);
}

EntityShaderInterpolationFont.prototype.initBuffersRGB = function (gl) {
	this.squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	var vertices = [ 2.0, 2.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.itemSize = 3;
	this.numItems = 4;
}

EntityShaderInterpolationFont.prototype.createFunctions = function () {
	// #TODO: do it automatically searching for a declaration on the shader??
	//var functions = getFunctionsToInterpolate();
	var functions = ["mainImage"];
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
	
EntityShaderInterpolationFont.prototype.initShadersRGBAnimate = function (gl) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, EntityShaderInterpolationVertexShaderSrcFont);
	gl.compileShader(vertexShader);

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	this.createFunctions();
	
	// Replace function definitions (EntityShaderInterpolationFragmentShaderSrcFont just have headers)
	var source = EntityShaderInterpolationFragmentShaderSrcFont.replace("SHADER_FUNCTION_DEFINITIONS", this.entity);
	
	// Replace call to shader functions
	var funcionesCode = "if (false) {} ";
	for (var j=0; j < this.functions.length; j++)
		for (var i=0; i< this.functions[j].count; i++)
			funcionesCode += " else if (mod(indexA, " +  this.functions[j].count.toFixed(2) + ") == " + i + ".0) { " + this.functions[j].name + (i+1) + "(vaa, vec2(xx, yy)); } ";
	funcionesCode += " if (false) {} ";
	for (var j=0; j < this.functions.length; j++)
		for (var i=0; i< this.functions[j].count; i++)
			funcionesCode += " else if (mod(indexB, " +  this.functions[j].count.toFixed(2) + ") == " + i + ".0) { " + this.functions[j].name + (i+1) + "(vbb, vec2(xx, yy)); } ";
	source = source.replace("SHADER_CALL", funcionesCode);
	
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
	shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

EntityShaderInterpolationFont.prototype.messageArray = function () {
	var aIndex = "a".charCodeAt(0);
	var result = this.textNow().split('').map(
		function (x) { 
			if (x == ' ') return 255;
			if (x == ',') return "z".charCodeAt(0) - aIndex + 1;
			if (x == '.') return "z".charCodeAt(0) - aIndex + 2;
			if (x == '!') return "z".charCodeAt(0) - aIndex + 3;
			return x.charCodeAt(0) - aIndex; 
		} );
	
	while (result.length < MAX_TEXT_LENGTH)
		result.push(255);
	
	return result;
}

EntityShaderInterpolationFont.prototype.textNow = function () {
	var v = timerValue() - this.timeStart;
	if (v < 0.0) v = 0.0;
	var i = Math.floor(v / this.secondsToWait) % this.texts.length;
	return this.texts[Math.floor(i)];
}	
