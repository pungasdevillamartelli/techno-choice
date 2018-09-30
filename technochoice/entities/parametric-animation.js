
function ParametricAnimation(x, y, z, sizeX, sizeY, sizeZ) {
	this.xFunction = eval(x);
	this.yFunction = eval(y);
	this.zFunction = eval(z);
}


ParametricAnimation.prototype.x = function (i) { 
	return this.xFunction(i); 
}

ParametricAnimation.prototype.y = function (i) { 
	return this.yFunction(i); 
}

ParametricAnimation.prototype.z = function (i) { 
	return this.zFunction(i); 
}

