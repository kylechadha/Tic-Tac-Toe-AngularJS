var app = angular.module("TicTac", ["firebase"])
app.controller("TicTacCtrl", function($scope, $firebase) {
  
  gameRef = new Firebase("https://tictactangular.firebaseio.com/");
  $scope.fbRoot = $firebase(gameRef);

  var IDs;
  var xWin = "XXX";
  var oWin = "OOO";
  var header = document.getElementsByTagName('h1');

  $scope.fbRoot.$on("loaded", function() {
    IDs = $scope.fbRoot.$getIndex();
    if (IDs.length == 0) {
      $scope.fbRoot.$add( {
        cells: [['','',''],['','',''],['','','']],
        turn: true,
        counter: 0,
        win: false
      });
      // Why does this occur on the onload? Or does it set it so ALL changes from here on trigger the function?
      $scope.fbRoot.$on("change", function() {
        IDs = $scope.fbRoot.$getIndex();
        $scope.game = $scope.fbRoot.$child(IDs[0]);
      });
    } else {
      //Why is there no on change function here (for player 2)? Or is this not for player 2?
      $scope.game = $scope.fbRoot.$child(IDs[0]);
    }
  });

  $scope.playerMove = function(r, c) {
    if($scope.game.cells[r][c] == "" && $scope.game.win == false) {
      if ($scope.game.turn) {
        $scope.game.cells[r][c] = 'X';
      } else {
        $scope.game.cells[r][c] = 'O';
      }
      $scope.game.counter++;
      $scope.game.turn = !$scope.game.turn;
      $scope.winAnalysis();
      // setTimeout($scope.revertCell(r, c), 5000);
    }
  }

  $scope.winAnalysis = function() {
    var row1 = $scope.game.cells[0].join("");
    var row2 = $scope.game.cells[1].join("");
    var row3 = $scope.game.cells[2].join("");
    var col1 = $scope.game.cells[0][0] + $scope.game.cells[1][0] + $scope.game.cells[2][0];
    var col2 = $scope.game.cells[0][1] + $scope.game.cells[1][1] + $scope.game.cells[2][1];
    var col3 = $scope.game.cells[0][2] + $scope.game.cells[1][2] + $scope.game.cells[2][2];
    var diag1 = $scope.game.cells[0][0] + $scope.game.cells[1][1] + $scope.game.cells[2][2];
    var diag2 = $scope.game.cells[0][2] + $scope.game.cells[1][1] + $scope.game.cells[2][0];

    if (xWin == row1 || xWin == row2 || xWin == row3 || xWin == col1 || xWin == col2 || xWin == col3 || xWin == diag1 || xWin == diag2) {
      header[0].innerHTML = "Congrats, X Wins!";
      $scope.game.win = true;
    } else if (oWin == row1 || oWin == row2 || oWin == row3 || oWin == col1 || oWin == col2 || oWin == col3 || oWin == diag1 || oWin == diag2) {
      header[0].innerHTML = "Congrats, O Wins!";
      $scope.game.win = true;
    } else if ($scope.game.counter == 9) {
      header[0].innerHTML = "Draw x_x";
    }
  }

  // $scope.revertCell = function() {
    // $scope.cells[r][c] = '';
  // }

  $scope.gameReset = function() {
    $scope.game.cells = [['','',''],['','',''],['','','']];
    header[0].innerHTML = "Tic Tac Toe";
    $scope.game.turn = true;
    $scope.game.win = false;
    $scope.game.counter = 0;
  }

});