// Questions
// 1. When do you use $scope vs. var? What has to be referenced by $scope vs not? 
// 2. When do you have to use semicolons vs not? Why do so many places not seem to require them?

function TicTacCtrl ($scope) {
  $scope.cells = [['','',''],['','',''],['','','']];
  var xTurn = {val: true}
  var counter = 0
  var header = document.getElementsByTagName('h1')
  var xWin = "XXX"
  var oWin = "OOO"
  $scope.place = function(r, c) {
    if($scope.cells[r][c] == "") {
      if (xTurn.val) {
        event.target.className = 'xmove';
        $scope.cells[r][c] = 'X';
        counter++
      } else {
        event.target.className = 'omove';
        $scope.cells[r][c] = 'O';
        counter++
      }
      xTurn.val = !xTurn.val;
    }
    var scanRow1 = $scope.cells[0].join("");
    var scanRow2 = $scope.cells[1].join("");
    var scanRow3 = $scope.cells[2].join("");
    var scanCol1 = $scope.cells[0][0] + $scope.cells[1][0] + $scope.cells[2][0];
    var scanCol2 = $scope.cells[0][1] + $scope.cells[1][1] + $scope.cells[2][1];
    var scanCol3 = $scope.cells[0][2] + $scope.cells[1][2] + $scope.cells[2][2];
    var scanDag1 = $scope.cells[0][0] + $scope.cells[1][1] + $scope.cells[2][2];
    var scanDag2 = $scope.cells[0][2] + $scope.cells[1][1] + $scope.cells[2][0];

    if (xWin == scanRow1 || xWin == scanRow2 || xWin == scanRow3 || xWin == scanCol1 || xWin == scanCol2 || xWin == scanCol3 || xWin == scanDag1 || xWin == scanDag2) {
      header[0].innerHTML = "Congrats, X Wins!";
      win = true;
    } else if (oWin == scanRow1 || oWin == scanRow2 || oWin == scanRow3 || oWin == scanCol1 || oWin == scanCol2 || oWin == scanCol3 || oWin == scanDag1 || oWin == scanDag2) {
      header[0].innerHTML = "Congrats, O Wins!";
      win = true;
    } else if (counter == 9) {
      header[0].innerHTML = "Draw x_x";
    };
  }
  // $scope.reset = function() {
    
  //   cells[1][1] = className = 'cell animated bounceIn'
  // }
}