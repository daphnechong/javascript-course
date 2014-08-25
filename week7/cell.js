function Cell() {
	this.neighbouringBombCount = 0;
	this.isFlagged = false;
	this.isRevealed = false;
	this.isBomb = false;
	this.symbol = function() {
		var bombCount = this.neighbouringBombCount ? this.neighbouringBombCount : '';
    return this.isBomb ? 'X' : bombCount;
	};
}
