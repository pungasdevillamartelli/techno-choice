
// STRING
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

// TIME
var globalStartTime = 0.0;


function resetTimer() {
	globalStartTime = Date.now();
}

function timerValue() {
	return (Date.now() - globalStartTime) / 1000.0;
}


// MATH
function degToRad (angle) {
	return Math.PI * angle / 180;
}

function clamp (min, max, value) {
	if (value < min)
		return min;
	if (value > max)
		return max;
	return value;
}


// ERROR HANDLE
function handleInitError(str) {
	throw new Error(str);
}


// TEXTURES
function handleLoadedTexture(texture, textureCanvas, gl) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas); 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function createTexture(gl, size) {
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size.offsetWidth, size.offsetHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	return texture;
}

// SOME FUNCTIONS FOR OLD OBJECT
var shaderVectorialFunctionsDefinitionText =
 	"vec3 veccos(in vec3 a) { return vec3(cos(a.x), cos(a.y), cos(a.z)); } " + 
	"vec3 vecsin(in vec3 a) { return vec3(sin(a.x), sin(a.y), sin(a.z)); } " + 
	"vec3 vectan(in vec3 a) { return vec3(tan(a.x), tan(a.y), tan(a.z)); } " + 
	"vec3 vecabs(in vec3 a) { return vec3(abs(a.x), abs(a.y), abs(a.z)); } " + 
	"vec3 vecsqr(in vec3 a) { return vec3(a.x * a.x, a.y * a.y, a.z * a.z); } " + 
	"vec3 vecadd(in vec3 a, in vec3 b) { return vec3(a.x + b.x, a.y + b.y, a.z + b.z); } " + 
	"vec3 vecsubstract(in vec3 a, in vec3 b) { return vec3(a.x - b.x, a.y - b.y, a.z - b.z); } " + 
	"vec3 vecmultiply(in vec3 a, in vec3 b) { return vec3(a.x * b.x, a.y * b.y, a.z * b.z); } " + 
	"vec3 vecdiv(in vec3 a, in vec3 b) { return vec3(a.x / b.x, a.y / b.y, a.z / b.z); } " + 
	"vec3 createvector(in float a, in float b, in float c) { return vec3(a, b, c); } " + 
	"vec3 veccolormap(in vec3 a, in vec3 b, in vec3 c) { return createvector(a.x / 10.0, b.x / 10.0, c.x / 10.0); } " + 			
	"float divideprotected(in float x, in float y) { if (abs(y) < 0.001) return 0.0; return x / y; }" + 
	"float sqr(in float x) { return x * x; }";
