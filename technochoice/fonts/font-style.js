
// Font object container
function FontStyle(fontName, canvasSize) {
	this.font = fontName;  	
	this.characterTextures = {};
	this.canvasSize = canvasSize;
	
	this.charactersNumbers = true;
	this.charactersCaps = true;
	this.charactersNormal = true;
}


FontStyle.prototype.initialize = function (glContext, htmlCanvas) {	
	var canvas = document.getElementById(htmlCanvas);
	var ctx = canvas.getContext('2d');
	canvas.width = this.canvasSize;
	canvas.height = this.canvasSize;
	var list = this.charactersList();
	
	for (var i in list) {
		this.createTexture(ctx, String.fromCharCode(list[i]), canvas, this.font, glContext);
	}
}

FontStyle.prototype.createTexture = function (ctx, character, canvas, font, glContext) {
	ctx.fillStyle = "#FFFFFF"; 
	ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
	ctx.fillStyle = "#000000"; 
	ctx.font = this.canvasSize + 5 + "px " + font;
	ctx.fillText(character, 9, this.canvasSize);

	if (this.characterTextures == null) { this.characterTextures = {}; }
	this.characterTextures[character] = glContext.createTexture();
    handleLoadedTexture(this.characterTextures[character], canvas, glContext);
}

FontStyle.prototype.charactersList = function () {
	var list = [];
	
	// Space
	list.push(32);
	
	// Numbers
	if (this.charactersNumbers) {
		for (var i=48; i< 58; i++) { list.push(i); }
	}
	
	// Caps
	if (this.charactersCaps) {
		for (var i=65; i< 91; i++) { list.push(i); }
	}
	
	// Mins
	if (this.charactersNormal) {
		for (var i=97; i< 123; i++) { list.push(i); }
	}
	
	return list;
} 