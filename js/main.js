// To Do List 
// 3. Fix reset button
// 4. Add disappearing functionality
// 6. Deploy to heroku, push to github (and write readme), update pivotal tracker, and upload to your domain

var app = angular.module("TicTac", ["firebase"])
app.controller("TicTacCtrl", function($scope, $firebase) {
  
  gameRef = new Firebase("https://tictactangular.firebaseio.com/");
  $scope.fbRoot = $firebase(gameRef);

  var IDs;
  var xWin = "XXX";
  var oWin = "OOO";
  var header = document.getElementsByTagName('h1');
  $scope.player;
  $scope.animation = true;

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
    $scope.game.$save();
    if ($scope.game.loadCount == 1) {
      $scope.player = 'X';
    } else if ($scope.game.loadCount == 2) {
      $scope.player = 'O';
    } else {
      $scope.player = 'Spectator';
    }    
  }
  
  $scope.playerMove = function(r, c) {
    if ($scope.game.cells[r][c] == "" && $scope.game.win == false) {
      $scope.animation = false;
      if (!$scope.game.turn && $scope.player == 'X') {
        $scope.game.cells[r][c] = 'X';
        $scope.game.counter++;
        $scope.game.turn = !$scope.game.turn;
      } else if ($scope.game.turn && $scope.player == 'O') {
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
      $scope.animation = true;
    } else if (oWin == row1 || oWin == row2 || oWin == row3 || oWin == col1 || oWin == col2 || oWin == col3 || oWin == diag1 || oWin == diag2) {
      $scope.game.win = "owin";
      $scope.animation = true;
    } else if ($scope.game.counter == 9) {
      $scope.game.win = "draw";
    }
  }

  $scope.$watch('game.win', function() {
    if ($scope.game.win == "xwin" && ($scope.player == 'X' || $scope.player == 'Spectator')) {
      header[0].innerHTML = "Congrats, X Wins!";
    } else if ($scope.game.win == "xwin" && $scope.player == 'O') {
      header[0].innerHTML = "Sorry, X Wins!"
    } else if ($scope.game.win == "owin" && ($scope.player == 'O' || $scope.player == 'Spectator')) {
      header[0].innerHTML = "Congrats, O Wins!";
    } else if ($scope.game.win == "owin" && $scope.player == 'X') {
      header[0].innerHTML = "Sorry, O Wins!"
    } else if ($scope.game.win == "draw") {
      header[0].innerHTML = "Draw x_x";      
    }
  });

  $scope.gameReset = function() {
    header[0].innerHTML = "Tic Tac Toe";
    $scope.animation = true;
    $scope.game.cells = [['','',''],['','',''],['','','']];
    $scope.game.turn = false;
    $scope.game.win = false;
    $scope.game.counter = 0;
    $scope.game.$save();
  }

  // $scope.revertCell = function() {
    // $scope.cells[r][c] = '';
  // }


});