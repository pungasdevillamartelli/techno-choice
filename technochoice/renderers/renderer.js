// Default second pass scene shader
var DefaultRendererFragmentShaderSrc =	
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"varying float xx; " + 
	"varying float yy; " + 
	"void main(void) { " + 
	"	vec2 coord = vTextureCoord; " + 
	"   vec4 textureColor = texture2D(uSampler, vec2(coord.s, coord.t)); " + 
	"	gl_FragColor = textureColor; "  + 
	"}";

var MovizerRendererFragmentShaderSrcPungas2 =	
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"uniform float time; " +
	"uniform float wiggle; " +
	"varying float yy; " + 
	"varying float xx; " + 
	//"bool condition(in vec2 fragCoord, out vec3 border) { " + 
	//"	float time = time / 0.25; " + 
	//"	float iGlobalTime = refract(distance(xx, 3.8525), 2.7079, asin(fragCoord).x); " + 
	//"	float value = (((fragCoord.y)+(sin(((dot(fragCoord,fragCoord)*20.0)+time))/10.0))+(sin((((fragCoord.y)*10.0)+iGlobalTime))/10.0)); " + 
	//"	float d = abs(value - 0.5) * 20.0; " + 
	//"	border = 1.0 / (vec3(d) * vec3(d) * vec3(d)); " + 
	//"	return value > 0.5; " + 
	//"} " + 
	//"float sqr(float x) { return x; } " +
	//"vec3 decolorize(vec4 c) { return vec3(c.r + c.g + c.b) / 3.0; } " + 
	"void main(void) { " + 
	"	float time = time / 2.0 + 2.0; " + 
	"	vec2 coord = vTextureCoord; " + 
	"	vec3 border = vec3(0.0); " + 	
	"   vec4 textureColor = texture2D(uSampler, vec2(coord.s, coord.t)); " + 
	"	float rr = (textureColor.r + textureColor.g + textureColor.b) / 6.0; " +
	//"  	if (condition(coord + vec2(0.0, sqr(sin(time / 2.0))), border)) { " + 
	//"		float rx = sin(time * 4.0 + 4.0 * 3.141592653589 * coord.t) * 0.02; " + 
	//"		float ry = sin(time * 4.0 + 4.0 * 3.141592653589 * coord.s) * 0.02;	" + 
	//"   	vec4 textureColor = texture2D(uSampler, vec2(coord.s + rx, coord.t + ry)); " + 
	//"			gl_FragColor = vec4(decolorize(textureColor), 1.0); " + 
	//"}	else {" + 
	"		gl_FragColor = vec4(textureColor.r, textureColor.g , textureColor.b, 1.0); " + 
	//"} " + 
	"	gl_FragColor += vec4(border, 1.0);" + 
	"} ";	


var MovizerRendererFragmentShaderSrcDistanceSynchro =	
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"uniform float time; " +
	"uniform float wiggle; " +
	"uniform float acumBeats; " +	
	"varying float yy; " + 
	"varying float xx; " + 
	"bool condition(in vec2 fragCoord, out vec3 border) { " + 
	"	float time = (acumBeats) / 0.25; " + 
	"	float iGlobalTime = refract(distance(xx, 3.8525), 2.7079, asin(fragCoord).x); " + 
	"	float value = (((fragCoord.y)+(sin(((dot(fragCoord,fragCoord)*20.0)+time))/10.0))+(sin((((fragCoord.y)*10.0)+iGlobalTime))/10.0)); " + 
	"	float d = abs(value - 0.5) * 20.0; " + 
	"	border = 1.0 / (vec3(d) * vec3(d) * vec3(d)); " + 
	"	return value > 0.5; " + 
	"} " + 
	"float sqr(float x) { return x; } " +
	"vec3 decolorize(vec4 c) { return vec3(c.r + c.g + c.b) / 3.0; } " + 
	"void main(void) { " + 
	"	float time = time / 2.0 - 6.0; " + 
	"	vec2 coord = vTextureCoord; " + 
	"	vec3 border = vec3(0.0); " + 	
	"   vec4 textureColor = texture2D(uSampler, vec2(coord.s, coord.t)); " + 
	"	float rr = (textureColor.r + textureColor.g + textureColor.b) / 6.0; " +
	"  	if (condition(coord + vec2(0.0, sin((time+acumBeats) / 5.0)), border)) { " + 
	"			float rx = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.t)) * 0.011; " + 
	"			float ry = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.s)) * 0.011;	" + 
	"   		vec4 textureColor = texture2D(uSampler, vec2(coord.s + rx, coord.t + ry)); " + 
	"			gl_FragColor = vec4(decolorize(textureColor), 1.0); " + 
	"}	else {" + 
	"		gl_FragColor = vec4(textureColor.r, textureColor.g , textureColor.b, 1.0); } " + 
	"	gl_FragColor += vec4(border, 1.0);" + 
	"}  ";		

var MovizerRendererFragmentShaderSrcDistanceSynchro2 =
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"uniform float time; " +
	"uniform float wiggle; " +
	"uniform float acumBeats; " +	
	"varying float yy; " + 
	"varying float xx; " + 
	"float sqr(float x) { return x; } " +
	"vec3 decolorize(vec4 c) { return vec3(c.r + c.g + c.b) / 3.0; } " + 
	"void main(void) { " + 
	"	float time = time / 2.0 - 6.0; " + 
	"	vec2 coord = vTextureCoord; " + 
	"	vec3 border = vec3(0.0); " + 	
	"	float rx = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.t)) * 0.011; " + 
	"	float ry = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.s)) * 0.011;	" + 
	"	vec4 textureColor = texture2D(uSampler, vec2(coord.s + rx, coord.t + ry)); " + 
	"	gl_FragColor = vec4(textureColor.r, textureColor.g , textureColor.b, 1.0); " + 
	"}  ";		

var MovizerRendererFragmentShaderSrcDistanceSynchroScoring =	
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"uniform float time; " +
	"uniform float wiggle; " +
	"uniform float acumBeats; " +	
	"varying float yy; " + 
	"varying float xx; " + 
	"bool condition(in vec2 fragCoord, out vec3 border) {" +
	"	float time = (acumBeats) / 0.25; " + 
	"	float iGlobalTime = refract(distance(xx, 3.8525), 2.7079, asin(fragCoord).x); " + 
	"float value = (fragCoord.y + (sin((dot(fragCoord, acos(fragCoord)) * 20.0) + time) / 10.0)) + (sin((fragCoord.y * 10.0) + iGlobalTime) / 10.0);" +
	"	float d = abs(value - 0.5) * 20.0; " + 
	"	border = 1.0 / (vec3(d) * vec3(d) * vec3(d)); " + 
	"return value > 0.5;" +
	"}	" +
	"float sqr(float x) { return x; } " +
	"vec3 decolorize(vec4 c) { return vec3(c.r + c.g + c.b) / 3.0; } " + 
	"void main(void) { " + 
	"	float time = time / 2.0 + 2.0; " + 
	"	vec2 coord = vTextureCoord; " + 
	"	vec3 border = vec3(0.0); " + 	
	"   vec4 textureColor = texture2D(uSampler, vec2(coord.s, coord.t)); " + 
	"	float rr = (textureColor.r + textureColor.g + textureColor.b) / 6.0; " +
	"  	if (condition(coord + vec2(0.0, sin((time+acumBeats) / 15.0)), border)) { " + 
	"			float rx = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.t)) * 0.011; " + 
	"			float ry = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.s)) * 0.011;	" + 
	"	   		vec4 textureColor = texture2D(uSampler, vec2(coord.s + rx, coord.t + ry)); " + 
	"			gl_FragColor = vec4(decolorize(textureColor), 1.0); " + 
	"}	else {" + 
	"			float rx = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.t)) * 0.011; " + 
	"			float ry = sqr(sin((time+acumBeats) * 4.0 + 4.0 * 3.141592653589 * coord.s)) * 0.011;	" + 
	"	   		vec4 textureColor = texture2D(uSampler, vec2(coord.s + rx, coord.t + ry)); " + 
	"		gl_FragColor = vec4(textureColor.r, textureColor.g , textureColor.b, 1.0); } " + 
	"	gl_FragColor += vec4(border, 1.0);" + 
	"}  ";	
	
var MovizerRendererFragmentShaderSrcPungas3 =	
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"uniform float time; " +
	"uniform float acumBeats; " +
	"varying float yy; " + 
	"varying float xx; " + 
	"bool condition(in vec2 fragCoord, out vec3 border) { " + 
	"	float time = (acumBeats * 2.0) / 0.25; " + 
	"	float iGlobalTime = refract(distance(xx, 3.8525), 2.7079, asin(fragCoord).x); " + 
	"	float value = (((fragCoord.y)+(sin(((dot(fragCoord,fragCoord)*20.0)+time))/10.0))+(sin((((fragCoord.y)*10.0)+iGlobalTime))/10.0)); " + 
	"	float d = abs(value - 0.5) * 20.0; " + 
	"	border = 1.0 / (vec3(d) * vec3(d) * vec3(d)); " + 
	"	return value > 0.5; " + 
	"} " + 
	"vec3 decolorize(vec4 c) { " + 
	"	return vec3(c.r + c.g + c.b) / 3.0; " + 
	"} " + 
	"void main(void) { " + 
	"	float time = time / 2.0 + 5.0; " + 
	"	vec2 coord = vTextureCoord; " + 
	"	vec3 border = vec3(0.0); " + 	
	"	float rx = sin(time * 4.0 + 4.0 * 3.141592653589 * coord.t) * 0.01; " + 
	"	float ry = sin(time * 4.0 + 4.0 * 3.141592653589 * coord.s) * 0.01;	" + 
	"   vec4 textureColor = texture2D(uSampler, vec2(coord.s + rx, coord.t + ry)); " + 
	"	float v = sin((time+acumBeats+8.0) / 13.0); " + 
	"  	if (condition(coord + vec2(0.0, v), border)) { " + 
	"			rx = sin(acumBeats * 4.0 + 4.0 * 3.141592653589 * coord.t) * 0.011; " + 
	"			ry = sin(acumBeats * 4.0 + 4.0 * 3.141592653589 * coord.s) * 0.011;	" + 
	"			vec4 textureColor = texture2D(uSampler, vec2(coord.s + rx, coord.t + ry)); " + 
	"			gl_FragColor = vec4(decolorize(textureColor), 1.0); " + 
	"}	else {" + 
	"		gl_FragColor = vec4(textureColor.r, textureColor.g , textureColor.b, 1.0); } " + 
	"	gl_FragColor += vec4(border, 1.0);" + 
	"} ";

	
var RendererVertexShaderSrc =  		
	"attribute vec3 aVertexPosition; " + 
	"attribute vec2 aTextureCoord; " + 
	"uniform mat4 uMVMatrix; " + 
	"uniform mat4 uPMatrix; " + 
	"varying float xx; " + 
	"varying float yy; " + 	
	"varying vec2 vTextureCoord; " + 
	"void main(void) { " + 
	"	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); " + 
	"	vTextureCoord = aTextureCoord; " + 
	"}";
	

// #DEBUG: function purpose only
var last, frames=0, framesDelta=20, delta = 1 / 60.0, frameCounter=0;



function Renderer (fragmentShaderSrc) {
	if (fragmentShaderSrc == null)
		this.fragmentShaderSrc = DefaultRendererFragmentShaderSrc;
	else
		this.fragmentShaderSrc = fragmentShaderSrc;

	this.wiggle = 0.0
	this.rttFramebuffer;
	this.rttTexture;
}

Renderer.prototype.initialize = function (gl) {
	this.mvMatrix = mat4.create();
	this.pMatrix = mat4.create();	

	this.initializeFrameBuffers(gl);	
	this.initializeSquare(gl);
	this.initializeShaders(gl);
}

Renderer.prototype.checkShaderLinkStatus = function (gl, fragmentShader, vertexShader) {
    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
        var fsErrorDescription = gl.getShaderInfoLog(fragmentShader);
        var vsErrorDescription = gl.getShaderInfoLog(vertexShader);
        var fsLastError = gl.getProgramInfoLog(shaderProgram);
        if (vertexShader) 		gl.deleteShader(vertexShader);	
        if (fragmentShader) 	gl.deleteShader(fragmentShader);	
        handleInitError("Could not initialize shaders (" + fsErrorDescription + vsErrorDescription + " -- " + fsLastError + ").");
    }
    if (vertexShader) 		gl.deleteShader(vertexShader);	
    if (fragmentShader) 	gl.deleteShader(fragmentShader);
}

Renderer.prototype.initializeShaders = function (gl) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, RendererVertexShaderSrc);
	gl.compileShader(vertexShader);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	var result = this.fragmentShaderSrc;
	gl.shaderSource(fragmentShader, result);
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
	shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
}	

Renderer.prototype.initializeSquare = function (gl) {
	this.squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	var vertices = [ 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.itemSize = 3;
	this.numItems = 4;
}

Renderer.prototype.initializeFrameBuffers = function (gl) {
	this.rttFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.rttFramebuffer);
    this.rttFramebuffer.width = gl.drawingBufferWidth;
    this.rttFramebuffer.height = gl.drawingBufferHeight;
	
	this.rttTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.rttTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.rttFramebuffer.width, this.rttFramebuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
	var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.rttFramebuffer.width, this.rttFramebuffer.height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.rttTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

	this.unbindBuffers(gl);
}

Renderer.prototype.unbindBuffers = function (gl) {
	gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

Renderer.prototype.render = function (scene, gl) {
	// Scene
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.rttFramebuffer);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	for (var object in scene.objects) {
		scene.objects[object].render(gl);
	}
	
	gl.useProgram(this.shaderProgram);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
	gl.disable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT);
    mat4.ortho(0, 1, 0, 1, 0.1, 100.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -1.0]);
	
	gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
	
	gl.bindTexture(gl.TEXTURE_2D, this.rttTexture);
	gl.uniform1i(this.shaderProgram.samplerUniform, 0);
	var location = gl.getUniformLocation(this.shaderProgram, "time");
    gl.uniform1f(location, timerValue());	
	location = gl.getUniformLocation(this.shaderProgram, "acumBeats");
	if (location) {
		interpolateSumToAcumulateBeats();
		gl.uniform1f(location, acumBeats);	
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numItems);	
}	

Renderer.prototype.renderOnBuffers = function (scene, frameBuffer, frameBufferPost, texture, gl) {
	// Scene
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	for (var object in scene.objects) {
		scene.objects[object].render(gl);
	}
	
	gl.activeTexture(gl.TEXTURE0);
	gl.useProgram(this.shaderProgram);
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBufferPost);
    gl.disable(gl.DEPTH_TEST);
    mat4.ortho(0, 1, 0, 1, 0.1, 100.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -1.0]);

	gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);

	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(this.shaderProgram.samplerUniform, 0);
	var location = gl.getUniformLocation(this.shaderProgram, "time");
    gl.uniform1f(location, timerValue());	
	location = gl.getUniformLocation(this.shaderProgram, "acumBeats");
	if (location) {
		interpolateSumToAcumulateBeats();
		gl.uniform1f(location, acumBeats);	
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numItems);	
}

Renderer.prototype.renderFps = function (gl, x, y) {
	if (this.fpsObject == undefined) {
		var effectX = "0.0", effectY = "0.0";	
		var fontTexture = "CREATEVECTOR(0.0, 0.0, 0.0)", fontBorderTexture = "CREATEVECTOR(0.0, 0.0, 0.8)";
		var fontStyle = new FontStyle("Verdana", 128);
		fontStyle.initialize(gl, "textureCanvas");
		this.fpsObject = new TextObject(fontStyle, "", effectX, effectY, fontTexture, fontBorderTexture, 
							 [ ], new AnimationProperties(x, y, 20.0, 20.0),
							 "textureCanvas", gl);
		this.fpsObject.transparencyValue = 1.0;
	}

	frames++;
	frameCounter++;
	if (frames >= framesDelta) {
		var now = performance.now();
		if (last != undefined) {
			delta = now - last;
		}
		
		last = now;
		frames = 0;
		this.fpsObject.text = "fps " + (1000.0 / delta).toFixed(2);
	}

	this.fpsObject.render(gl);
}

Renderer.prototype.renderValue = function (gl, value, concept, x, y) {
	if (this[concept] == undefined) {
		var effectX = "0.0", effectY = "0.0";	
		var fontTexture = "CREATEVECTOR(0.0, 0.0, 0.0)", fontBorderTexture = "CREATEVECTOR(0.0, 0.0, 0.8)";
		var fontStyle = new FontStyle("Verdana", 128);
		fontStyle.initialize(gl, "textureCanvas");
		this[concept] = new TextObject(fontStyle, "", effectX, effectY, fontTexture, fontBorderTexture, 
							 [ ], new AnimationProperties(x, y, 20.0, 20.0),
							 "textureCanvas", gl);
		this[concept].transparencyValue = 1.0;	
	}

	this[concept].text = value;
	this[concept].render(gl);
}

Renderer.prototype.renderScene = function (gl, value, concept, x, y) {
	if (this[concept] == undefined) {
		var effectX = "0.0", effectY = "0.0";	
		var fontTexture = "CREATEVECTOR(0.0, 0.0, 0.0)", fontBorderTexture = "CREATEVECTOR(0.0, 0.0, 0.8)";
		var fontStyle = new FontStyle("Verdana", 128);
		fontStyle.initialize(gl, "textureCanvas");
		this[concept] = new TextObject(fontStyle, "", effectX, effectY, fontTexture, fontBorderTexture, 
							 [ ], new AnimationProperties(x, y, 20.0, 20.0),
							 "textureCanvas", gl);
		this[concept].transparencyValue = 1.0;
	}
	
	this[concept].text = value;
	this[concept].render(gl);
}

Renderer.prototype.addFrameBuffer = function (gl, bufferName, textureName) {
	this[bufferName] = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, this[bufferName]);
	this[bufferName].width = gl.drawingBufferWidth;
    this[bufferName].height = gl.drawingBufferHeight;
	
	this[textureName] = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this[textureName]);	
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this[bufferName].width, this[bufferName].height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
}

Renderer.prototype.renderBar = function (gl, x, y, value) {
	if (this.quadObject == undefined) {
		this.quadObject = new QuadObject(x, y, 1.0, 1.0, gl);
	}
	
	this.quadObject.height = 5;
	this.quadObject.width = 5;
	this.quadObject.render(gl);
}