 
// Shader background
var EntityShaderInterpolationVertexShaderSrc = 
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
  
var EntityShaderInterpolationFragmentShaderSrc = [
	codePrecisionDefinition,
	"varying float xx; ",
	"varying float yy; ",
	"varying vec2 vTextureCoord; ",
	"uniform float indexA; ",
	"uniform float indexB; ",
	"uniform float aa; ",
	"uniform float time; ",
	"uniform float acumBeats; ",
	"uniform float faderValue; ",	
	" SHADER_FUNCTION_DEFINITIONS ",
	"void main(void) { ",
	"	vec2 wiggledTexCoord = vTextureCoord; ",
	// #NOTE: Added because could not be used at all
	"	float aux = acumBeats;",
	"	float a = aa, x = xx * 10.0, y = yy * 10.0; ",
	"	vec4 vaa, vbb; ",
	" SHADER_CALL ",
	"	gl_FragColor = vec4((vaa.x * a + vbb.x * (1.0 - a)) * faderValue, (vaa.y * a + vbb.y * (1.0 - a)) * faderValue, (vaa.z * a + vbb.z * (1.0 - a)) * faderValue, 1.0); ",
	"}"]
		.join('\n');
	
	
function EntityShaderInterpolation (entity, timeFrame) {
	this.entity = entity;
	this.globalScale = 1.0;
	this.globalXRef = 1.0;
	this.globalYRef = 1.0;	
	this.frameSelector = new NextFrameSelector(timeFrame);
	this.timeStart = 0.0;
} 

EntityShaderInterpolation.prototype = Object.create(new Entity());

EntityShaderInterpolation.prototype.initialize = function (gl) {
	this.mvMatrix = mat4.create();
	this.pMatrix = mat4.create();
	this.initBuffersRGB(gl);
	this.initShadersRGBAnimate(gl);
	this.frameSelector.initializeInterpolation(this.entity.length);
}

EntityShaderInterpolation.prototype.render = function (gl) {
	var globalVa = timerValue();
	gl.useProgram(this.shaderProgram);	
	
	this.frameSelector.updateInterpolationValues(this.entity.length);
	
	// #TODO: Update info for these variables usage
	var location = gl.getUniformLocation(this.shaderProgram, "time");
	var objectTime = globalVa - this.timeStart;
	if (objectTime < 0.0) objectTime = 0.0;
	
	gl.uniform1f(location, objectTime);	
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
	if (location != null)
		gl.uniform1f(location, acumBeats);
	
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

EntityShaderInterpolation.prototype.initBuffersRGB = function (gl) {
	this.squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
	var vertices = [ 2.0, 2.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.itemSize = 3;
	this.numItems = 4;
}

EntityShaderInterpolation.prototype.createFunctions = function () {
	// #TODO: do it automatically searching for a declaration on the shader??
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
	
EntityShaderInterpolation.prototype.initShadersRGBAnimate = function (gl) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, EntityShaderInterpolationVertexShaderSrc);
	gl.compileShader(vertexShader);

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	this.createFunctions();
	
	// Replace function definitions (EntityShaderInterpolationFragmentShaderSrc just have headers)
	var source = EntityShaderInterpolationFragmentShaderSrc.replace("SHADER_FUNCTION_DEFINITIONS", this.entity);
	
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
	var p = gl.getParameter(gl.CURRENT_PROGRAM);
	
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(p, "aVertexPosition");
	if (shaderProgram.vertexPositionAttribute < 0) 
		handleInitError("Cant initialize vertexPositionAttribute.");
	else
		gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	
	shaderProgram.textureCoordAttribute = gl.getAttribLocation(p, 'aTextureCoord');
	if (shaderProgram.textureCoordAttribute < 0) {
		const numAttribs = gl.getProgramParameter(shaderProgram, gl.ACTIVE_ATTRIBUTES);
		for (var i=0; i < numAttribs; ++i) {
		  var info = gl.getActiveAttrib(shaderProgram, i); 
		  //console.log('name:', info.name, 'type:', info.type, 'size:', info.size); 
		}

		//handleInitError("Cant initialize textureCoordAttribute.");
	}
	else
		gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
	
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}
