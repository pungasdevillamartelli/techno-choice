 
function SceneSequencer () {
	this.scenes = [];
} 


SceneSequencer.prototype.render = function (context, renderer) {
	var sceneNumber = this.getSceneNumber();
	renderer.render(this.scenes[sceneNumber], context);
	this.keepDelta(gl);
}

SceneSequencer.prototype.getScene = function () {
	var sceneNumber = this.getSceneNumber();
	return this.scenes[sceneNumber];
}

SceneSequencer.prototype.keepDelta = function (gl) {
	var now = performance.now();
	if (last != undefined) {
		delta = now - last;
	}
	
	last = now;
} 