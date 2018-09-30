var codePrecisionDefinition = "precision highp float; ";

// SHADER RESOURCE HEADER
// ----------------------
//	"precision mediump float; " + 
//	"varying float xx; " + 
//	"varying float yy; " + 
//	"uniform float indexA; " + 
//	"uniform float indexB; " + 
//	"uniform float aa; " + 
//	"uniform float time; " + 
//	"uniform float faderValue; " + 	
//
//  and at the end:
// 
// "void main() { " + 
// "	mainImageN(gl_FragColor, vec2(xx, yy)); " + 
// "} "
// 
// So we does´nt have to redefine any of these


//#TODO
// Control automatically required precision
//int range[2], precision;
//glGetShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT, range, &precision);

/*
From the OpenGL ES Shading Language reference:

highp - 16-bit, floating point range: -2^62 to 2^62, integer range: -2^16 to 2^16
mediump - 10 bit, floating point range: -2^14 to 2^14, integer range: -2^10 to 2^10
lowp - 8 bit, floating point range: -2 to 2, integer range: -2^8 to 2^8

The fragment language requires any uses of lowp and mediump to compile without error. Support for highp is optional.
*/