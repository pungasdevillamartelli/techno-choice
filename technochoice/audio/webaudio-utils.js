var sourceNode, javascriptNode;
var audioContext;
//var audioVariableAmplitude;
var acumBeats = 0.0;
// #NOTE: Used to store acumBeats value
var beatsData = {};

 
function sumToAcumulateBeats () {
	acumBeats += getAverageAmplitude() / 3000.0;
	
	// #NOTE: Used to store acumBeats value
	//beatsData[timerValue()] = acumBeats;
}

function interpolateSumToAcumulateBeats() {
	//return sumToAcumulateBeats();
	
	var t = timerValue();
	var last = -1;
	
	for (var i in beats) 
		if (Number(i) >= t) {
			last = i;
			break;
		}
	
	if (last == -1)
		return 0.0;

	acumBeats = beats[last];
}

function setupAudioNodes() {
	audioContext = new AudioContext();
	
	// Check for audio context
	if (! window.AudioContext) {
		if (! window.webkitAudioContext) 
			handleInitError('no audio context found');
		window.AudioContext = window.webkitAudioContext;
	}

	javascriptNode = audioContext.createScriptProcessor(audioFFTDefinition * 2, 1, 1);
	javascriptNode.connect(audioContext.destination);
	analyser = createAnalyzer(0.0, audioFFTDefinition);
	analyser2 = createAnalyzer(0.0, audioFFTDefinition);			
	sourceNode = audioContext.createBufferSource();
	splitter = audioContext.createChannelSplitter();
	sourceNode.connect(splitter);
	splitter.connect(analyser, 0, 0);
	splitter.connect(analyser2, 1, 0);
	analyser.connect(javascriptNode);
	sourceNode.connect(audioContext.destination);
	
/*	javascriptNode.onaudioprocess = function() {
		audioVariableAmplitude = getAverageAmplitude();
	}	*/
} 

function getAverageAmplitude() { 
	var array =  new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(array);
	var average = getAverageVolume(array);
	return average;
}

function createAnalyzer(smoothingTimeConstant, fftSize) {
	var analyser = audioContext.createAnalyser();
	analyser.smoothingTimeConstant = smoothingTimeConstant;
	analyser.fftSize = fftSize;
	analyser.maxDecibels = -10;
	return analyser;
}

function loadSound(url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		audioContext.decodeAudioData(request.response, function(buffer) {
			playSound(buffer);
			callback();
		}, onLoadSoundError);
	}
	request.send(); 
}

function playSound(buffer) {
	sourceNode.buffer = buffer;
	sourceNode.start(0);
}

function onLoadSoundError(e) {
	var label = document.getElementById("labelClick");
	label.innerHTML = "Initialization error: " + " Error loading audio.";
}

function getAverageVolumeFromFrecuency(analyser) {
	var array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(array);
	return getAverageVolume(array);
}

function getAverageVolume(array) {
	var values = 0, length = array.length;
	for (var i=0; i< length; i++)
		values += array[i];
	return values / length;
}
