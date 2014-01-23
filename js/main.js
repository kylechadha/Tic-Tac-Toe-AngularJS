function TicTacCtrl ($scope) {
  $scope.cells = [['','',''],['','',''],['','','']];
  var turn = {val: true}, counter = 0, header = document.getElementsByTagName('h1'), xWin = "XXX", oWin = "OOO";

  $scope.playerMove = function(r, c) {
    if($scope.cells[r][c] == "") {
      if (turn.val) {
        event.target.className = 'xmove';
        $scope.cells[r][c] = 'X';
        counter++;
      } else {
        event.target.className = 'omove';
        $scope.cells[r][c] = 'O';
        counter++;
      }
      turn.val = !turn.val;
      $scope.winAnalysis();
    }
  }

  $scope.winAnalysis = function() {
    var row1 = $scope.cells[0].join(""), row2 = $scope.cells[1].join(""), row3 = $scope.cells[2].join(""), col1 = $scope.cells[0][0] + $scope.cells[1][0] + $scope.cells[2][0], col2 = $scope.cells[0][1] + $scope.cells[1][1] + $scope.cells[2][1], col3 = $scope.cells[0][2] + $scope.cells[1][2] + $scope.cells[2][2], diag1 = $scope.cells[0][0] + $scope.cells[1][1] + $scope.cells[2][2], diag2 = $scope.cells[0][2] + $scope.cells[1][1] + $scope.cells[2][0];

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

}