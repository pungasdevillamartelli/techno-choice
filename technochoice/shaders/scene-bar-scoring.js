var setBackgroundSceneScoring =
	codePrecisionDefinition + 
	"vec3 bar(float x, float y) { " + 
	"	float xxx = ((abs(((y-0.4)-(sin((x+(time*2.0)))/5.0)))*4.0)-(3.1052/3.1007)); " + 
	"	if (xxx < 0.5)  " + 
	"		return (vec3(faceforward(xxx,5.8649,xxx))*xxx); " + 
	"	else " + 
	"		return vec3(0.0); " + 
	"} " + 
	"void mainImage1(out vec4 fragColor, in vec2 fragCoord) { " + 
	"	fragColor = vec4(0.6743,yy,xx,1.0) + " + 
	"				vec4(bar(reflect(dot(mix(refract(tan(time), xx, 0.0), yy, 6.4298), sign(radians(max(clamp(1.2251,0.9673,time),degrees(7.4997))))), min(5.8044,xx)), ((fragCoord+fragCoord).x * 1.5)), 1.0); " + 
	"} ";