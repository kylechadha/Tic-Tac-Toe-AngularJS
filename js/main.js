function TicTacCtrl ($scope) {
  $scope.cells = [['','',''],['','',''],['','','']];
  var turn = {val: true}, counter = 0, header = document.getElementsByTagName('h1'), win = false, xWin = "XXX", oWin = "OOO";

  $scope.playerMove = function(r, c) {
    if($scope.cells[r][c] == "" && win == false) {
      if (turn.val) {
        // event.target.className = 'xmove';
        $scope.cells[r][c] = 'X';
      } else {
        // event.target.className = 'omove';
        $scope.cells[r][c] = 'O';
      }
      console.log(counter);
      counter++;
      turn.val = !turn.val;
      $scope.winAnalysis();
    }
  }

  $scope.winAnalysis = function() {
    var row1 = $scope.cells[0].join("");
    var row2 = $scope.cells[1].join("");
    var row3 = $scope.cells[2].join("");
    var col1 = $scope.cells[0][0] + $scope.cells[1][0] + $scope.cells[2][0];
    var col2 = $scope.cells[0][1] + $scope.cells[1][1] + $scope.cells[2][1];
    var col3 = $scope.cells[0][2] + $scope.cells[1][2] + $scope.cells[2][2];
    var diag1 = $scope.cells[0][0] + $scope.cells[1][1] + $scope.cells[2][2];
    var diag2 = $scope.cells[0][2] + $scope.cells[1][1] + $scope.cells[2][0];

    if (xWin == row1 || xWin == row2 || xWin == row3 || xWin == col1 || xWin == col2 || xWin == col3 || xWin == diag1 || xWin == diag2) {
      header[0].innerHTML = "Congrats, X Wins!";
      win = true;
    } else if (oWin == row1 || oWin == row2 || oWin == row3 || oWin == col1 || oWin == col2 || oWin == col3 || oWin == diag1 || oWin == diag2) {
      header[0].innerHTML = "Congrats, O Wins!";
      win = true;
    } else if (counter == 9) {
      header[0].innerHTML = "Draw x_x";
    }
  }

  $scope.gameReset = function() {
    $scope.cells = [['','',''],['','',''],['','','']];
    header[0].innerHTML = "Tic Tac Toe";
    counter = 0;
    win = false;
  }

}