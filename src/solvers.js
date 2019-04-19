/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// find -a- solution
window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n:n})
  var inner = function (r, c, count) {
    
    if (board.get(r)[c] === 1) {
      return;
    }

    board.togglePiece(r, c);

    if (board.hasAnyRooksConflicts()) {
      board.togglePiece(r, c);
      return;
    }
    
    count++
    
    if (count === n) {
      solution = board;
      return;
    }
    
    for (var i = 0; i < board.rows().length; i++) {
      for (var j = 0; j < board.rows().length; j++) {
        inner(i, j, count)
      }
    }

  }

  inner(0,0,0);
  // if(max !== n){ return false}

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
//return the total number of solutions that are possible
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;
  let board = new Board({n: n});

  let searchSolutions = function (n, board, rows = 0) {
   
    if (rows === n) {
      solutionCount++;
      return;
    }

    for (let col = 0; col < n; col++) {
      board.togglePiece(rows, col);
      if (!board.hasAnyRooksConflicts()) {
        searchSolutions(n, board, rows + 1);
      }
      board.togglePiece(rows, col);
    }
    
  } 

  searchSolutions(n , board)
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var solution = 0;
  var board = new Board({n:n});

  var findSolutions = function (r, c, count) {
    if (n === 0) { return; }
    
    if (board.get(r)[c] === 1) {
      return;
    }

    board.togglePiece(r, c);

    if (board.hasAnyQueensConflicts()) {
      board.togglePiece(r, c);
      return;
    }
    
    count++;
    
    if (count === n) {
      solution = board;
      return;
    }
    
    for (var i = 0; i < board.rows().length; i++) {
      for (var j = 0; j < board.rows().length; j++) {
        findSolutions(i, j, count);
      }
    }
  }
  
  for (var i = 0; i < board.rows().length; i++) {
    for (var j = 0; j < board.rows().length; j++) {
      board = new Board({n:n});
      findSolutions(i, j, 0);
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if(!solution){
    board = new Board({n:n})
    return board.rows();
  }
  console.log(solution.rows())
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // if (n === 0 || n === 1) { 
  //   return n; 
  // }

  // if (n === 4) {
  //   debugger;
  // }

  // var solutions = {};
  // var board = new Board({ n: n })
  // let rowLength = board.rows();

  // var findSolutions = function (r, c, count) {
  //   count++;

  //   if (board.hasAnyQueensConflicts()) {
  //     board.togglePiece(r, c);
  //     count -= 1;
  //     return;
  //   }
    
  //   if (count === n) {
  //     solutions[JSON.stringify(rowLength)] = rowLength;
  //     return;
  //   }

  //   for (let i = 0; i < rowLength.length; i++) {
  //     for (let j = 0; j < rowLength.length; j++) {
  //       if (board.get(i)[j] === 1) {
  //         continue;
  //       }
  //       board.togglePiece(i, j);
  //       findSolutions(i, j, count)
  //       board.togglePiece(i, j);
  //     }
  //   }
  // }

  // findSolutions(0, 0, -1);
  let solutionCount = 0;
  let board = new Board({n: n});

  let searchSolutions = function (n, board, rows = 0) {
   
    if (rows === n) {
      solutionCount++;
      return;
    }

    for (let col = 0; col < n; col++) {
      board.togglePiece(rows, col);
      if (!board.hasAnyQueensConflicts()) {
        searchSolutions(n, board, rows + 1);
      }
      board.togglePiece(rows, col);
    }
    
  } 

  searchSolutions(n , board)
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
//  