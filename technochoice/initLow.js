var audioFileName = "audio/theme.mp3";
var audioFFTDefinition = 512;
var audioUseAudioAnalisys = true;

var demo, full = false, loaded = false;


function toggleFullscreen() {
	if (!loaded) {
		return;
	}
	
	if (full == true) {
		takeOutFullscreen();
		full = false;
	}
	else {
		makeFullscreen();
		full = true;
	}
}

function takeOutFullscreen() {
	if (document.exitFullscreen) {			  document.exitFullscreen();		} 
	else if (document.msExitFullscreen) {	  document.msExitFullscreen();		} 
	else if (document.mozCancelFullScreen) {  document.mozCancelFullScreen();	} 
	else if (document.webkitExitFullscreen) { document.webkitExitFullscreen();	}
	setCanvasWithoutFullscreen();
} 

function setCanvasWithoutFullscreen() {
	var canvas = document.getElementById("glCanvas"), style = canvas.style;
	style.width = Math.floor(window.screen.availWidth / 2);
	style.height = Math.floor(window.screen.availHeight / 2);	
}

function makeFullscreen() {
	var canvas = document.getElementById("glCanvas");
	setCanvasSize(canvas);
	requestCanvasFullScreen(canvas);
}

function makeFullscreenInitial() {
	var canvas = document.getElementById("glCanvas");
	setCanvasSize(canvas);
}

function setCanvasSize(canvas) {
	var style = canvas.style;
	canvas.width = Math.floor(window.screen.availWidth / 2);
	canvas.height = Math.floor(window.screen.availHeight / 2);		
	style.width = window.screen.availWidth + "px";
	style.height = window.screen.availHeight + "px"; 
}

function requestCanvasFullScreen(canvas) {
	if (canvas.requestFullscreen) {				canvas.requestFullscreen();			}
	else if (canvas.msRequestFullscreen) {		canvas.msRequestFullscreen();		}
	else if (canvas.mozRequestFullScreen) {		canvas.mozRequestFullScreen();		}
	else if (canvas.webkitRequestFullscreen) {	canvas.webkitRequestFullscreen();	}
}

function startupDraw () {
	var label = document.getElementById("labelClick");
	
	try {
		var canvas = document.getElementById("glCanvas");
		var gl = initGL(canvas);
		demo = new Demo();
		resetTimer();	
		demo.initialize(gl, "textureCanvas");
		setupAudioNodes();
	}
	catch(err) {
		label.innerHTML = "Initialization error: " + err.message;
		return;
	}
	
	loadAudioFromUrl(
		function () {
			loaded = true;
			label.innerHTML = "Click canvas for fullscreen";
			setCanvasWithoutFullscreen();
			resetTimer();	
			requestFrame(demo, gl);
		}
	);
}

function loadAudioFromUrl(callback) {
	loadSound(audioFileName, callback);
}

function requestFrame(demo, gl) {
	demo.render(gl);
	last = performance.now();
	window.requestAnimationFrame(function () { 
		requestFrame(demo, gl); 
	});
}

function initGL(canvas) {
	//try 
	{
		var gl = canvas.getContext("experimental-webgl", { alpha: true, depth: true });
		var canvas = document.getElementById("glCanvas"), style = canvas.style;
		style.width = 768; // window.screen.availWidth;
		style.height = 768; // window.screen.availHeight;
		return gl;
	}
	//catch (e) {
	//	console.log("Error in WebGL initialization.");
	//}
	if (!gl) {
		alert("Could not initialize WebGL");
		return null;
	}
}

document.addEventListener("DOMContentLoaded", function(event) { 
	makeFullscreenInitial();
})