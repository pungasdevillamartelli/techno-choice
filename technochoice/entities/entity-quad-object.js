// RGB animated
var QuadObjectVertextShaderSrc = 
	"attribute vec3 aVertexPosition; " +
	"attribute vec2 aTextureCoord; " + 
	"uniform mat4 uMVMatrix; " + 
	"uniform mat4 uPMatrix; " + 
	"void main(void) { " + 
	"	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 2.0); " + 
	"}";
	
var QuadObjectFragmentShaderSrc =
	codePrecisionDefinition + 
	"void main(void) { " + 
	"	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); " + 
	"}";
	

function QuadObject (x, y, height, width, gl) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	
	this.initialize(gl);
} 

QuadObject.prototype = Object.create(new Entity());

QuadObject.prototype.initialize = function (gl) {
	this.mvMatrix = mat4.create();
	this.pMatrix = mat4.create();
	this.initBuffers(gl);
	this.initShaders(gl);
}

QuadObject.prototype.render = function (gl) {
	gl.useProgram(this.shaderProgram);

	gl.disable(gl.DEPTH_TEST);
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	
	mat4.identity(this.pMatrix);
	mat4.ortho(0, 1, 0, 1, 0.1, 100.0, this.pMatrix);
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -10.0]);
	mat4.scale(this.mvMatrix, [1.0, this.height / 10.0, -10.0])
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.itemSize, gl.FLOAT, false, 0, 0);
	this.setMatrixUniforms(gl);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.numItems);
}

QuadObject.prototype.initBuffers = function (gl) {
	this.squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	var vertices = [ 1.0,  1.0,  0.0, 0.0,  1.0,  0.0, 1.0,  0.0,  0.0, 0.0,  0.0,  0.0 ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.itemSize = 3;
	this.numItems = 4;
}

QuadObject.prototype.initShaders = function (gl) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, QuadObjectVertextShaderSrc);
	gl.compileShader(vertexShader);

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, QuadObjectFragmentShaderSrc);
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
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}