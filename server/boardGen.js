/*
Board Structure:
[
 [{},{},{}],
 [{},{},{}],
 [{},{},{}]
]

Cell structure:
{loc:{x: num,
      y: num},
 bomb: 'false',
 flag: 'false',
 edge: 'false',
 bombsNearby: 0
}
*/

const generateBoard = (options) => {
  const bombLevel = 0.7;
  const num = 20;
  let board = [];

  for (let r = 0; r < num; r++) {
    board.push([]);

    for (let c = 0; c < num; c++) {
      //   rows[r].push({ row: r, col: c });
      board[r].push(generateCell(r, c, bombLevel));
    }
  }

  assignBombsNum(board);

  return board;
};

const generateCell = (r, c, bombLevel) => {
  let bombCheck = false;

  if (Math.random() > bombLevel) {
    bombCheck = true;
  }

  const newCell = {
    R: r,
    C: c,
    bomb: bombCheck,
    flag: false,
    isOpen: false,
    edge: false,
    open: false,
    bombsNearby: 0
  };

  return newCell;
};

const countBombs = (cell, board) => {
  if (cell.bomb === true) {
    return null;
  }

  let row = cell.R;
  let column = cell.C;
  let bombs = 0;

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = column - 1; j <= column + 1; j++) {
      if (board[i] !== undefined && board[j] !== undefined) {
        if (board[i][j].bomb) {
          bombs += 1;
        }
      }
    }
  }

  return bombs;
};

const assignBombsNum = (board) => {
  for (let row of board) {
    for (let cell of row) {
      cell.bombsNearby = countBombs(cell, board);
    }
  }
};

const generateOpenBoard = (options) => {
  const num = 20;
  let board = [];

  for (let r = 0; r < num; r++) {
    board.push([]);

    for (let c = 0; c < num; c++) {
      //   rows[r].push({ row: r, col: c });
      board[r].push(false);
    }
  }

  return board;
};

console.log(generateOpenBoard());

module.exports.generateBoard = generateBoard;
module.exports.generateOpenBoard = generateOpenBoard;
