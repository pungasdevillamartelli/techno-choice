
function TimeStepsSceneSequencer (demo, timeSteps, delta, glContext, fragmentShader) {
	this.scenes = [];
	this.timeSteps = timeSteps;
	this.initializers = [];
	this.demo = demo;
	this.currentIndex = 1;
	this.renderer = new TransitionRenderer(fragmentShader);
	this.delta = delta;
	
	TimeStepsSceneSequencer.prototype = SceneSequencer;
	
	this.renderer.initialize(glContext);
} 


TimeStepsSceneSequencer.prototype.addScene = function (initializer) {
	this.addSceneNamed(initializer, "scene" + this.currentIndex);
	this.currentIndex++;
}

TimeStepsSceneSequencer.prototype.addSceneNamed = function (initializer, name) {
	this.initializers.push([name, initializer]);
}
	
TimeStepsSceneSequencer.prototype.initializeScenes = function (glContext, textCanvas) {
	for (var i=0; i< this.initializers.length; i++) {
		var sceneIndex = this.initializers[i][0];
		var start = this.getStart(sceneIndex);
		var end;
		
		if (start == undefined) {
			start = 99999;
			end = 99999;
		}
		else
			end = this.getEnd(sceneIndex);
		
		this.scenes.push(this.initializers[i][1](this.demo, glContext, textCanvas, start, end));
	}
}
	
TimeStepsSceneSequencer.prototype.getSceneNumber = function (timeValue) {
	var sceneName = "no scene";
	
	// Iterate over all the scenes and get the last which asserts the condition
	for (var i=0; i< this.timeSteps.length; i++) {
		var sceneStartValue = this.timeSteps[i][0];
		
		if (this.timeSteps[i][1].split(' ')[0] == "scene") {
			// Set the scene if current value is after current scene value OR first scene on the events list if none selected
			if ((timeValue >= sceneStartValue) || (sceneName == "no scene")) {
				sceneName = this.timeSteps[i][1];
			}
		}
	}
	
	for (var k=0; k< this.initializers.length; k++) {
		if (this.initializers[k][0] == sceneName)
			return k;
	}
	
	return -1;
}

TimeStepsSceneSequencer.prototype.getNextSceneNumber = function (timeValue) {
	var sceneName = "no scene";
	
	// Iterate over all the scenes and get the last which asserts the condition
	
	for (var i=0; i< this.timeSteps.length; i++) {
		var sceneStartValue = this.timeSteps[i][0];
		
		if (this.timeSteps[i][1].split(' ')[0] == "scene") {
			// Set the scene if current value is after current scene value OR first scene on the events list if none selected
			if ((timeValue >= sceneStartValue) || (sceneName == "no scene")) {
				sceneName = this.timeSteps[i][1];
			}
		}
	}
	
	for (var k=0; k< this.initializers.length; k++) {
		if (this.initializers[k][0] == sceneName)
			return k;
	}
	
	return -1;
}

TimeStepsSceneSequencer.prototype.getNextSceneTime = function (timeValue) {
	var lastIndex = -1;
	
	for (var i=0; i< this.timeSteps.length; i++) {
		var sceneStartValue = this.timeSteps[i][0];
		
		if (this.timeSteps[i][1].split(' ')[0] == "scene") {
			// Set the scene if current value is after current scene value OR first scene on the events list if none selected
			if ((timeValue >= sceneStartValue)) {
				lastIndex = i;
			}
		}
	}
	
	if (lastIndex >= 0)
		return this.timeSteps[lastIndex+1][0];
	else {
		// #TODO: show error
		return -1;
	}
}

TimeStepsSceneSequencer.prototype.getFaderValue = function (time, sceneNextTime) {
	if (time <= (sceneNextTime - this.delta))
		return 0;
	else {
		var startTransitionTime = sceneNextTime - this.delta;
		return (time - startTransitionTime) / this.delta;
	}
}

// Answer start of the first occurrence for the event
TimeStepsSceneSequencer.prototype.getStart = function (name) {
	for (var i=0; i< this.timeSteps.length; i++) {
		if (this.timeSteps[i][1] == name)
			return this.timeSteps[i][0];
	}
	
	// Error
}

// Answer end of the last occurrence for the event
TimeStepsSceneSequencer.prototype.getEnd = function (name) {	
	// #NOTE: Existence of a final scene with 99999 value is assumed !!!
	
	var last
	for (var i=0; i< this.timeSteps.length; i++) {
		if (this.timeSteps[i][1] == name) {
			last = i;
		}
	}
	//return this.timeSteps[last+1][0];
	return this.timeSteps[last][0];
}

// #TODO: delete scene sequencer or inherit and delete
TimeStepsSceneSequencer.prototype.render = function (context, renderer) {
	var timeValue = timerValue();
	var sceneNumber = this.getSceneNumber(timeValue);
	var scene = this.scenes[sceneNumber];
	var sceneNextTime = this.getNextSceneTime(timeValue);
	// #TODO: unhardcode 0.05
	var nextTimeValue = sceneNextTime + 0.05; 
	var sceneNextNumber = this.getNextSceneNumber(nextTimeValue);
	var sceneNext = this.scenes[sceneNextNumber];
	var faderValue = this.getFaderValue(timeValue, sceneNextTime);
	
	// #TODO: update speed
	if (sceneNext == undefined)
		sceneNext = scene;
	
	this.renderer.render(scene, sceneNext, faderValue, context);
	
	// #NOTE: Frame rate adjustment hook
	this.keepDelta(context);
}

// #TODO: delete scene sequencer or inherit and delete
TimeStepsSceneSequencer.prototype.keepDelta = function (gl) {
	var now = performance.now();
	if (last != undefined) {
		delta = now - last;
	}
	
	last = now;
} 

// #TODO: delete scene sequencer or inherit and delete
TimeStepsSceneSequencer.prototype.getScene = function () {
	var sceneNumber = this.getSceneNumber();
	return this.scenes[sceneNumber];
}

