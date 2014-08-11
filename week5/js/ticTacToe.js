function Board(size) {
  this.grid = [];
  this.gridSize = size;
}

Board.prototype.setupGrid = function() {
  for (var i = 0; i < this.gridSize; i++) {
    this.grid[i] = [];
    for (var j = 0; j < this.gridSize; j++) {
      this.grid[i][j] = ' ';
    }
  }
}

Board.prototype.setCell = function(point, value) {
  this.grid[point.x][point.y] = value;
  var row = $('.row').eq(point.y);
  var cell = row.find('.cell').eq(point.x);
  cell.text(value);
}

Board.prototype.getCell = function(point) {
  return this.grid[point.x][point.y];
}


function Game(board) {
  this.firstPlayer = true;
  this.board = board;
}

Game.prototype.playTurn = function() {
  var symbol = this.firstPlayer ? 'X' : 'O';
  this.firstPlayer = !this.firstPlayer; 
  console.log('playing turn!', symbol);
}


$(function() {
  var board = new Board(3);
  var game = new Game(board);

  $('.cell').click(game.playTurn.bind(game));
})