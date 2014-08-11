function Board(size) {
  this.grid = [];
  this.gridSize = size;

  this.setupGrid();
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

  var one = {x: 0, y: 0};
  var two = {x: 0, y: 1};
  var three = {x: 0, y: 2};
  var four = {x: 1, y: 0};
  var five = {x: 1, y: 1};
  var six = {x: 1, y: 2};
  var seven = {x: 2, y: 0};
  var eight = {x: 2, y: 1};
  var nine = {x: 2, y: 2};

  this.winningLines = [
    [one, two, three],
    [one, four, seven],
    [one, five, nine],
    [two, five, eight],
    [three, five, seven],
    [three, six, nine],
    [four, five, six],
    [seven, eight, nine]
  ]
}

Game.prototype.playTurn = function(e) {
  var symbol = this.firstPlayer ? 'X' : 'O';
  var coords = e.currentTarget.id.split('-');
 
  this.firstPlayer = !this.firstPlayer;
  this.board.setCell({ x: coords[1], y: coords[0] }, symbol);
  
  if (this.isWinner()) {
    console.log('you won!!!')
    $('.cell').unbind('click');
  }
}

Game.prototype.isWinner = function() {
  var self = this;
  var isWinningLine = false;
  for (var i = 0; i < this.winningLines.length; i++) {
    var line = this.winningLines[i];
    var first = self.board.getCell(line[0]);
    var second = self.board.getCell(line[1]);
    var third = self.board.getCell(line[2]);

    if (first == second && second == third &&  first != ' ')
    {
      isWinningLine = true;
      break;
    }
  }
  return isWinningLine;
}

$(function() {
  var board = new Board(3);
  var game = new Game(board);

  $('.cell').click(game.playTurn.bind(game));
})