
var TransitionRendererFragmentShaderMixerSrc =
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"uniform sampler2D vSampler; " +
	"uniform float time; " +
	"uniform float faderValue; " +
	"varying float xx; " + 
	"varying float yy; " + 
	"void main(void) { " + 
	"	vec2 coord = vTextureCoord; " + 
	"   vec4 textureColorA = texture2D(uSampler, vec2(coord.s, coord.t)); " + 
	"   vec4 textureColorB = texture2D(vSampler, vec2(coord.s, coord.t)); " + 
	"	vec4 a = vec4(textureColorA.r, textureColorA.g , textureColorA.b, 1.0); " + 
	"	vec4 b = vec4(textureColorB.r, textureColorB.g , textureColorB.b, 1.0); " + 
	"	gl_FragColor = a * faderValue + (1.0 - faderValue) * b; " + 
	"}";
/*
// #NOTE: Bloom could be added here too
var BloomTransitionRendererFragmentShaderMixerSrc =
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"uniform sampler2D vSampler; " +
	"uniform float time; " +
	"uniform float faderValue; " +
	"varying float xx; " + 
	"varying float yy; " + 
	"void main(void) { " + 
	"	" + 
	"	vec2 tex_offset = 1.0 / textureSize(image, 0); " + 
	"	vec3 result = texture2D(image, TexCoords).rgb * weight[0]; " + 
	"	" + 
	"	vec2 coord = vTextureCoord; " + 
	"   vec4 textureColorA = texture2D(uSampler, vec2(coord.s, coord.t)); " + 
	"   vec4 textureColorB = texture2D(vSampler, vec2(coord.s, coord.t)); " + 
	"	vec4 a = vec4(textureColorA.r, textureColorA.g , textureColorA.b, 1.0); " + 
	"	vec4 b = vec4(textureColorB.r, textureColorB.g , textureColorB.b, 1.0); " + 
	"	gl_FragColor = a * faderValue + (1.0 - faderValue) * b; " + 
	"	gl_FragColor.g = 0.0; " + 
	"	gl_FragColor.b = 0.0; " + 
	"}";

// #NOTE: debug version
var TransitionRendererFragmentShaderMixerSrc =	
	codePrecisionDefinition + 
	"varying vec2 vTextureCoord; " +
	"uniform sampler2D uSampler; " +
	"uniform sampler2D vSampler; " +
	"uniform float time; " +
	"uniform float faderValue; " +
	"varying float xx; " + 
	"varying float yy; " + 
	"void main(void) { " + 
	"	vec2 coord = vTextureCoord; " + 
	"   vec4 textureColorA = texture2D(uSampler, vec2(coord.s, coord.t)); " + 
	"   vec4 textureColorB = texture2D(vSampler, vec2(coord.s, coord.t)); " + 
	"	vec4 a = vec4(textureColorA.r, textureColorA.g , textureColorA.b, 1.0); " + 
	"	vec4 b = vec4(textureColorB.r, textureColorB.g , textureColorB.b, 1.0); " + 
	"	if (coord.t < 0.33) {" + 
	"	if (coord.s > 0.66)" + 
	"			gl_FragColor = a; " + 
	"		else " + 
	"			gl_FragColor = b; " +
	"	} " + 
	"	else " + 
	"		gl_FragColor = a * faderValue + (1.0 - faderValue) * b; " + 
	"}";
*/
	
function TransitionRenderer (fragmentShaderSrc) {
	if (fragmentShaderSrc == null)
		this.fragmentShaderSrc = TransitionRendererFragmentShaderMixerSrc;
	else
		this.fragmentShaderSrc = fragmentShaderSrc;

	this.rttFramebufferA;
	this.rttFramebufferAPost;
	this.rttTextureA;
	this.rttTextureAPost;
	this.rttFramebufferB;
	this.rttFramebufferBPost;
	this.rttTextureB;
	this.rttTextureBPost;
}

TransitionRenderer.prototype = Object.create(new Renderer());

TransitionRenderer.prototype.initialize = function (gl) {
	this.mvMatrix = mat4.create();
	this.pMatrix = mat4.create();

	this.initializeFrameBuffers(gl);
	this.initializeSquare(gl);
	this.initializeShaders(gl);
}

TransitionRenderer.prototype.initializeShaders = function (gl) {
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
	shaderProgram.samplerUniformU = gl.getUniformLocation(shaderProgram, "uSampler");
	shaderProgram.samplerUniformV = gl.getUniformLocation(shaderProgram, "vSampler");
}	

TransitionRenderer.prototype.initializeSquare = function (gl) {
	this.squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	var vertices = [ 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.itemSize = 3;
	this.numItems = 4;
}
TransitionRenderer.prototype.initializeFrameBuffers = function (gl) {
	// rttFramebuffer 1
	this.addFrameBuffer(gl, "rttFramebufferA", "rttTextureA");
	var renderbufferA = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferA);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this["rttFramebufferA"].width, this["rttFramebufferA"].height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this["rttTextureA"], 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferA);
	
	// rttFramebuffer 2
	this.addFrameBuffer(gl, "rttFramebufferB", "rttTextureB");
	var renderbufferB = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferB);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this["rttFramebufferB"].width, this["rttFramebufferB"].height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this["rttTextureB"], 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferB);

	// rttFramebuffer 1 Post
	this.addFrameBuffer(gl, "rttFramebufferAPost", "rttTextureAPost");
	var renderbufferA = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferA);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this["rttFramebufferAPost"].width, this["rttFramebufferAPost"].height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this["rttTextureAPost"], 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferA);
	
	// rttFramebuffer 2 Post
	this.addFrameBuffer(gl, "rttFramebufferBPost", "rttTextureBPost");
	var renderbufferB = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbufferB);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this["rttFramebufferBPost"].width, this["rttFramebufferBPost"].height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this["rttTextureBPost"], 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbufferB);

	this.unbindBuffers(gl);
}

TransitionRenderer.prototype.render = function (scene, sceneNext, faderValue, gl) {
	// Scene render
	scene.renderOnBuffers(this["rttFramebufferA"], this["rttFramebufferAPost"], this["rttTextureA"], gl);
	if (faderValue != 0)	
		sceneNext.renderOnBuffers(this["rttFramebufferB"], this["rttFramebufferBPost"], this["rttTextureB"], gl);
	
	// Now render on screen framebuffer
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.useProgram(this.shaderProgram);
    gl.disable(gl.DEPTH_TEST);
    mat4.ortho(0, 1, 0, 1, 0.1, 100.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -1.0]);
	
	gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
	
	// Mix all using 2 textures
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this["rttTextureAPost"]);
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, this["rttTextureBPost"]);
	
	gl.uniform1i(this.shaderProgram.samplerUniformU, 1);
	gl.uniform1i(this.shaderProgram.samplerUniformV, 0);
	
	var location = gl.getUniformLocation(this.shaderProgram, "time");
    gl.uniform1f(location, timerValue());	
	location = gl.getUniformLocation(this.shaderProgram, "faderValue");
    gl.uniform1f(location, faderValue);	
	
	// Draw square with final effect
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numItems);		
	
	// #TODO: Ver porque da error con una textura no bindeada
	//this.renderFps(gl, 10.0, 19.0);
	//this.renderValue(gl, "time " + (timerValue().toFixed(2)), "time", 10.0, 18.0);
	//this.renderValue(gl, "scene " + 1, "scene", 10.0, 17.0);
	//this.renderValue(gl, "faderValue " + faderValue, "faderValue", 10.0, 17.0);
	//this.renderBar(gl, 0.0, 0.0, acumBeats);
}