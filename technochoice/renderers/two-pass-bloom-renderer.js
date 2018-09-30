// Default TWO pass scene shaders
var BloomRendererFragmentShaderSrcX =	
	[
	codePrecisionDefinition, 
	"varying vec2 vTextureCoord; ",
	"uniform sampler2D uSampler; ",
	"uniform float time; ",
	"varying float xx; ", 
	"varying float yy; ", 
	"void main(void) { ", 
	"	vec2 coord = vTextureCoord; ", 
	" 	float weight[7]; ", 
	//	Weight map
	"   weight[0] = 1.0; ", 
	"   weight[1] = 0.227027; ", 
	"   weight[2] = 0.1945946; ", 
	"   weight[3] = 0.1216216; ", 
	"   weight[4] = 0.054054; ", 
	"   weight[5] = 0.026216; ", 
	"   weight[6] = 0.01216; ", 
	"	vec3 result = texture2D(uSampler, coord).rgb * weight[0]; ",
	"	vec2 tex_offset = 1.0 / vec2(128.0); ", 
	" 	for(float i=1.0; i< 7.0; i++) {", 
    " 		vec3 at = texture2D(uSampler, coord + vec2(tex_offset.x * i, 0.0)).rgb; " + 
	" 		vec3 bt = texture2D(uSampler, coord - vec2(tex_offset.x * i, 0.0)).rgb; " + 
	"       if (at. r + at.b + at.g > 1.5) result += at * weight[int(i)]; ", 
	"       if (bt. r + bt.b + bt.g > 1.5) result += bt * weight[int(i)]; ",  
	"   }", 
	"	gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0); ", 
	"}"]
		.join('\n');

var BloomRendererFragmentShaderSrcY =	
	[
	codePrecisionDefinition, 
	"varying vec2 vTextureCoord; ",
	"uniform sampler2D uSampler; ",
	"uniform float time; ",
	"varying float xx; ", 
	"varying float yy; ", 
	"void main(void) { ", 
	"	vec2 coord = vTextureCoord; ", 
	" 	float weight[7]; ", 
	//	Weight map
	"   weight[0] = 1.0; ", 
	"   weight[1] = 0.227027; ", 
	"   weight[2] = 0.1945946; ", 
	"   weight[3] = 0.1216216; ", 
	"   weight[4] = 0.054054; ", 
	"   weight[5] = 0.026216; ", 
	"   weight[6] = 0.01216; ", 
	"	vec3 result = texture2D(uSampler, coord).rgb * weight[0]; ",
	"	vec2 tex_offset = 1.0 / vec2(128.0); ", 
	" 	for(float i=1.0; i< 7.0; i++) {", 
    " 		vec3 at = texture2D(uSampler, coord + vec2(tex_offset.x * i, 0.0)).rgb; " + 
	" 		vec3 bt = texture2D(uSampler, coord - vec2(tex_offset.x * i, 0.0)).rgb; " + 
	"       if (at. r + at.b + at.g > 1.5) result += at * weight[int(i)]; ", 
	"       if (bt. r + bt.b + bt.g > 1.5) result += bt * weight[int(i)]; ",  
    "   }", 
	"	gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0); ", 
	"}"]
		.join('\n');
		
function TwoPassBloomRenderer (sceneShaderSrc, bloomShaderSrcX, bloomShaderSrcY) {
	if (bloomShaderSrcX == null)
		this.fragmentBloomShaderSrcX = BloomRendererFragmentShaderSrcX;
	else
		this.fragmentBloomShaderSrcX = bloomShaderSrcX;

	if (bloomShaderSrcY == null)
		this.fragmentBloomShaderSrcY = BloomRendererFragmentShaderSrcY;
	else
		this.fragmentBloomShaderSrcY = bloomShaderSrcY;	

	if (bloomShaderSrc == null)
		this.fragmentBloomShaderSrc = BloomRendererFragmentShaderSrc;
	else
		this.fragmentBloomShaderSrc = bloomShaderSrc;	

	this.wiggle = 0.0
	this.rttFrameBuffer;
	this.rttTexture;	
	//this.rttBloomedFrameBuffer;
	//this.rttBloomedTexture;
}

TwoPassBloomRenderer.prototype = Object.create(new Renderer());

//#TODO: refactor and inherit all these functions
TwoPassBloomRenderer.prototype.initialize = function (gl) {
	this.mvMatrix = mat4.create();
	this.pMatrix = mat4.create();	

	this.initializeFrameBuffers(gl);	
	this.initializeSquare(gl);
	this.initializeShaders(gl);
	this.initializeShadersBloomX(gl);
	this.initializeShadersBloomY(gl);
}

TwoPassBloomRenderer.prototype.initializeShadersBloomX = function (gl) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, RendererVertexShaderSrc);
	gl.compileShader(vertexShader);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	var result = this.fragmentBloomShaderSrcX;
	gl.shaderSource(fragmentShader, result);
	gl.compileShader(fragmentShader);
	this.shaderProgramBloomX = gl.createProgram();
	var shaderProgram = this.shaderProgramBloom;
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

TwoPassBloomRenderer.prototype.initializeShadersBloomY = function (gl) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, RendererVertexShaderSrc);
	gl.compileShader(vertexShader);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	var result = this.fragmentBloomShaderSrcY;
	gl.shaderSource(fragmentShader, result);
	gl.compileShader(fragmentShader);
	this.shaderProgramBloomY = gl.createProgram();
	var shaderProgram = this.shaderProgramBloom;
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

TwoPassBloomRenderer.prototype.initializeSquare = function (gl) {
	this.squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	var vertices = [ 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.itemSize = 3;
	this.numItems = 4;
}

TwoPassBloomRenderer.prototype.initializeFrameBuffers = function (gl) {
	// rttTexture: extra buffer for drawing scene
	this.addFrameBuffer(gl, "rttFrameBuffer", "rttTexture");
	var renderbufferA = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferA);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this["rttFrameBuffer"].width, this["rttFrameBuffer"].height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this["rttTexture"], 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferA);
	
	// rttFinalTexture
	this.addFrameBuffer(gl, "rttFinalFrameBuffer", "rttFinalTexture");
	var renderbufferB = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferB);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this["rttFinalFrameBuffer"].width, this["rttFinalFrameBuffer"].height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this["rttFinalTexture"], 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferB); 

	this.unbindBuffers(gl);
}

TwoPassBloomRenderer.prototype.renderOnBuffers = function (scene, frameBuffer, frameBufferPost, texture, gl) {
	// Argument texture is associated to frameBuffer
	
	// STEP 1: Draw scene objects
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	for (var object in scene.objects) {
		scene.objects[object].render(gl);
	}
	
	gl.activeTexture(gl.TEXTURE0);
	gl.useProgram(this.shaderProgram);
	gl.bindFramebuffer(gl.FRAMEBUFFER, this["rttFrameBuffer"]);
    gl.disable(gl.DEPTH_TEST | gl.DEPTH_BUFFER_BIT);
	gl.clear(gl.COLOR_BUFFER_BIT);
    mat4.ortho(0, 1, 0, 1, 0.1, 100.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -1.0]);
	gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);

	// STEP 2: Check texture filled in previous step
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
	
	// Bind framebuffer to texture, BLOOM PASS 1
	gl.useProgram(this.shaderProgramBloom);
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBufferPost);
    gl.disable(gl.DEPTH_TEST | gl.DEPTH_BUFFER_BIT);
	gl.clear(gl.COLOR_BUFFER_BIT);
    mat4.ortho(0, 1, 0, 1, 0.1, 100.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -1.0]);
	gl.uniformMatrix4fv(this.shaderProgramBloom.pMatrixUniform, false, this.pMatrix);
	gl.uniformMatrix4fv(this.shaderProgramBloom.mvMatrixUniform, false, this.mvMatrix);
	
	gl.bindTexture(gl.TEXTURE_2D, this["rttTexture"]);
	gl.uniform1i(this.shaderProgramBloom.samplerUniform, 0);
	var location = gl.getUniformLocation(this.shaderProgramBloom, "time");
    gl.uniform1f(location, timerValue());	
	location = gl.getUniformLocation(this.shaderProgramBloom, "acumBeats");
	if (location) {
		interpolateSumToAcumulateBeats();
		gl.uniform1f(location, acumBeats);	
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgramBloom.vertexPositionAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgramBloom.textureCoordAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
		
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numItems);	

/*	// Bind framebuffer to texture, BLOOM PASS 2
	gl.useProgram(this.shaderProgramBloom);
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBufferPost);
    gl.disable(gl.DEPTH_TEST | gl.DEPTH_BUFFER_BIT);
	gl.clear(gl.COLOR_BUFFER_BIT);
    mat4.ortho(0, 1, 0, 1, 0.1, 100.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -1.0]);
	gl.uniformMatrix4fv(this.shaderProgramBloom.pMatrixUniform, false, this.pMatrix);
	gl.uniformMatrix4fv(this.shaderProgramBloom.mvMatrixUniform, false, this.mvMatrix);
	
	gl.bindTexture(gl.TEXTURE_2D, this["rttTexture"]);
	gl.uniform1i(this.shaderProgramBloom.samplerUniform, 0);
	var location = gl.getUniformLocation(this.shaderProgramBloom, "time");
    gl.uniform1f(location, timerValue());	
	location = gl.getUniformLocation(this.shaderProgramBloom, "acumBeats");
	if (location) {
		interpolateSumToAcumulateBeats();
		gl.uniform1f(location, acumBeats);	
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgramBloom.vertexPositionAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgramBloom.textureCoordAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
		
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numItems);	

	// #TODO: Ver porque da error con una textura no bindeada
	//this.renderFps(gl, 10.0, 19.0);
	//this.renderValue(gl, "time " + (timerValue().toFixed(2)), "time", 10.0, 18.0);
	//this.renderValue(gl, "scene " + 1, "scene", 10.0, 17.0);	*/
}

