// To Do List 
// 2. Add player 1 and player 2 notation & scoreboard
// 3. Fix reset button
// 4. Add disappearing functionality
// 5. Clean up CSS & refactor

var app = angular.module("TicTac", ["firebase"])
app.controller("TicTacCtrl", function($scope, $firebase) {
  
  gameRef = new Firebase("https://tictactangular.firebaseio.com/");
  $scope.fbRoot = $firebase(gameRef);

  var IDs;
  var player;
  var xWin = "XXX";
  var oWin = "OOO";
  var header = document.getElementsByTagName('h1');

  $scope.fbRoot.$on("loaded", function() {
    IDs = $scope.fbRoot.$getIndex();

    if (IDs.length == 0) {
      $scope.fbRoot.$add( {
        cells: [['','',''],['','',''],['','','']],
        loadCount: 0,
        turn: false,
        counter: 0,
        win: false
      });
      // Why does this occur on the onload? Or does it set it so ALL changes from here on trigger the function?
      $scope.fbRoot.$on("change", function() {
        IDs = $scope.fbRoot.$getIndex();
        $scope.game = $scope.fbRoot.$child(IDs[0]);
      });
    } else {
      //Why is there no on change function here (for player 2)?
      $scope.game = $scope.fbRoot.$child(IDs[0]);
    };

    setTimeout($scope.playerAssign, 1000);
  });

  $scope.playerAssign = function() {
    $scope.game.loadCount++;
    $scope.animation = false;
    $scope.game.$save();
    if ($scope.game.loadCount == 1) {
      player = 'X';
      $scope.current = true;
    } else if ($scope.game.loadCount == 2) {
      player = 'O';
      $scope.current = false;
    } else {
      player = 'Spectator';
    }    
  }
  
  $scope.playerMove = function(r, c) {
    if ($scope.game.cells[r][c] == "" && $scope.game.win == false) {
      if (!$scope.game.turn && player == 'X') {
        $scope.game.cells[r][c] = 'X';
        $scope.game.counter++;
        $scope.game.turn = !$scope.game.turn;
      } else if ($scope.game.turn && player == 'O') {
        $scope.game.cells[r][c] = 'O';      
        $scope.game.counter++;
        $scope.game.turn = !$scope.game.turn;
      }
      $scope.winAnalysis();
      $scope.game.$save();
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
      $scope.game.win = "xwin";
    } else if (oWin == row1 || oWin == row2 || oWin == row3 || oWin == col1 || oWin == col2 || oWin == col3 || oWin == diag1 || oWin == diag2) {
      $scope.game.win = "owin";
    } else if ($scope.game.counter == 9) {
      $scope.game.win = "draw";
    }
  }

  $scope.$watch('game.win', function() {
    if ($scope.game.win == "xwin" && player == 'X') {
      header[0].innerHTML = "Congrats, X Wins!";
    } else if ($scope.game.win == "xwin" && player == 'O') {
      header[0].innerHTML = "Better luck next time..."
    } else if ($scope.game.win == "owin" && player == 'O') {
      header[0].innerHTML = "Congrats, O Wins!";
    } else if ($scope.game.win == "owin" && player == 'X') {
      header[0].innerHTML = "Better luck next time..."
    } else if ($scope.game.win == "draw") {
      header[0].innerHTML = "Draw x_x";      
    }
  });

  // $scope.revertCell = function() {
    // $scope.cells[r][c] = '';
  // }

  // $scope.gameReset = function() {
  //   $scope.game.cells = [['','',''],['','',''],['','','']];
  //   header[0].innerHTML = "Tic Tac Toe";
  //   $scope.game.turn = true;
  //   $scope.game.win = false;
  //   $scope.game.counter = 0;
  // }

  // CSS Class Management
  $scope.animation = true;
  $scope.current = true;

});