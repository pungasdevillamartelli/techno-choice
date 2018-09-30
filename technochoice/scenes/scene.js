
function Scene (objects, renderer) {
	this.objects = objects;
	
	if (renderer != null)
		this.renderer = renderer;
	else {
		//var defaultRenderer = new Renderer(MovizerRendererFragmentShaderSrc2)
		this.renderer = demoSingleton.renderer;
	}
}

Scene.prototype.render = function (context) {
	this.renderer.render(this, context);
	//this.sequencer.keepDelta(context);
}

Scene.prototype.renderOnBuffers = function (frameBuffer, frameBufferPost, texture, context) {
	this.renderer.renderOnBuffers(this, frameBuffer, frameBufferPost, texture, context);
	//this.sequencer.keepDelta(context);
}
