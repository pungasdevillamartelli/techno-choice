
// Font object container
function FontBitmap(list, canvasSize) {
	this.list = list; 
	this.characterTextures = {};
	this.canvasSize = canvasSize;
}


FontBitmap.prototype.initialize = function (glContext, htmlCanvas) {	
	var canvas = document.getElementById(htmlCanvas);
	var ctx = canvas.getContext('2d');
	canvas.width = this.canvasSize;
	canvas.height = this.canvasSize;

	for (var element in this.list) {
		this.createTextureFromCanvas(ctx, this.list[element], canvas, glContext);
	}
}

FontBitmap.prototype.createTextureFromCanvas = function (ctx, element, canvas, glContext) {
	var elementParts = element.split("-");
	ctx.fillStyle = "#FFFFFF"; 
	ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);	
	var img = document.getElementById(element);
	ctx.drawImage(img, 0, 0);
	
	if (this.characterTextures == null) { this.characterTextures = {}; }
	this.characterTextures[element == "pvm-letter-espacio" ? " " : elementParts[2]] = glContext.createTexture();
    handleLoadedTexture(this.characterTextures[element == "pvm-letter-espacio" ? " " : elementParts[2]], canvas, glContext);
}