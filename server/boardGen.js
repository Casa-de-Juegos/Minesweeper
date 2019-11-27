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
  const num = 10;
  let rows = [];

  for (let r = 0; r < num; r++) {
    rows.push([]);

    for (let c = 0; c < num; c++) {
      //   rows[r].push({ row: r, col: c });
      rows[r].push(generateCell(r, c, bombLevel));
    }
  }

  return rows;
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
    edge: false,
    bombsNearby: 0
  };

  return newCell;
};

module.exports.generateBoard = generateBoard;
