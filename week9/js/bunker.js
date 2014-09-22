function Bunker(missileCount, x, y) {
	this.missileCount = missileCount;
	this.isAlive = true;
	this.x = x;
	this.y = y;
}

// Bunker.prototype = Object.create(Target.prototype, { 
// 	missileCount: {
// 		value: 10, 
// 		writeable: true
// 	}
// });

// var bunker = new Bunker(20);
// bunker.missileCount // 20

// var bunker2 = new Bunker();
// bunker2.missileCount // 10