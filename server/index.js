const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { generateBoard } = require('../server/boardGen.js');

const app = express();
const PORT = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

//routes
app.get('/board', function(req, res) {
  const board = generateBoard();
  res.status('200').send(board);
});

app.get('/openBoard', function(req, res) {
  const openBoard = generateOpenBoard();
  res.status('200').send(openBoard);
});

app.listen(PORT, () => {
  console.log(`listening on port ${4000}`);
});
