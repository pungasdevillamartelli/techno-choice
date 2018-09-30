
function NextFrameSelector(timeFrame) {
	this.timeFrame = timeFrame;
	this.indexA = 0;
	this.indexB = 0;
	
	
	this.nextFrame = function (n) {
		return Math.floor(this.indexB + 1);
	}

	this.initializeInterpolation = function (n) {
		this.indexA = 0;
		if (this.indexA >= n) this.indexA = 0;
		this.indexB = this.nextFrame(n);
		if (this.indexB >= n) this.indexB = 0;		
		this.lastUpdate = timerValue();
	}

	this.updateInterpolationValues = function (n) {	
		var value = timerValue();
		if ((value - this.lastUpdate) > this.timeFrame) {
			this.indexA = this.indexB;
			if (this.indexA >= n) this.indexA = 0;
			this.indexB = this.nextFrame(n);
			if (this.indexB >= n) this.indexB = 0;
			this.lastUpdate = value;
		}
	}
}