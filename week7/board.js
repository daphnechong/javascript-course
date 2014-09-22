function Board(size) {
  this.grid = [];
  this.gridSize = size;
}

Board.prototype.isCellWithinGrid = function(x, y) {
  return x < this.gridSize 
    && x >=0
    && y < this.gridSize 
    && y >=0;
}

Board.prototype.getNeighbours = function(x, y) {
  var self = this;
  var coords = [ 
    { x: x + 1, y: y },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x, y: y - 1 },
    { x: x - 1, y: y },
    { x: x - 1, y: y + 1 },
    { x: x - 1, y: y - 1 }
  ];

  for (var i = 0; i < coords.length; i++) {
    var point = coords[i];
    if (!self.isCellWithinGrid(point.x, point.y)) {
      coords.splice(i, 1);
      i--; //hackfest.
    }
  }

  // you can use .filter() to get rid of the other points not in the gridSize

  return coords;
}

Board.prototype.updateBombCountsAround = function(x, y) {
  var self = this;

  this.getNeighbours(x, y).forEach(function(point) {
    var cell = self.getCell(point.x, point.y);
    cell.neighbouringBombCount++;
  });
}

Board.prototype.setupBombs = function(bombCount) {
  var count = 0;
  while (count < bombCount) {
    var index = Math.random() * this.gridSize * this.gridSize;
    var x = Math.floor(index / this.gridSize);
    var y = Math.floor(index % this.gridSize);
    var cell = this.getCell(x, y);
    if (!cell.isBomb) {
      cell.isBomb = true;
      this.updateBombCountsAround(x, y);
      count++;
    }
  }
}

Board.prototype.setupGrid = function() {
  for (var i = 0; i < this.gridSize; i++) {
    this.grid[i] = [];
    for (var j = 0; j < this.gridSize; j++) {
      this.grid[i][j] = new Cell();
    }
  }
}

Board.prototype.renderGrid = function() {
  for (var i = 0; i < this.grid.length; i++) {
    var row = $('<div>').addClass('row');
    $('#board').append(row);
    for (var j = 0; j < this.grid[i].length; j++) {
      var cell = this.grid[j][i];
      var elem = $('<div>').addClass('cell').text(cell.symbol());
      elem.attr('id', j + '-' + i);
      row.append(elem);
    }
  }
}

Board.prototype.reveal = function(x, y) {
  var self = this;
  var cell = this.getCell(x, y);

  if (cell.isBomb) {
    console.log('BOOM');
  }
  else {
    if (cell.isRevealed) return;
    cell.isRevealed = true;

    $('#'+x+'-'+y).css('background-color', 'red')

    if (!cell.neighbouringBombCount) {
      var neighbours = this.getNeighbours(x, y);
      neighbours.forEach(function(n) {
        if (n.neighbouringBombCount) {
          var id = n.x + '-' + n.y;
          $('#' + id).text(n.neighbouringBombCount)
        } 
        else {
          self.reveal(n.x, n.y);
        }
      });
    }
    
  }
}

// Board.prototype.setCell = function(point, value) {
//   this.grid[point.x][point.y] = value;
//   var row = $('.row').eq(point.y);
//   var cell = row.find('.cell').eq(point.x);
//   cell.text(value);
// }

Board.prototype.getCell = function(x, y) {
  return this.grid[x][y];
}