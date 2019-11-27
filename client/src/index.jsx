import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Cell from './components/Cell.jsx';

import EndPrompt from './components/EndPrompt.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [],
      statusTable: [],
      gameOver: false
    };
    this.checkArea = this.checkArea.bind(this);
    this.endGame = this.endGame.bind(this);
    this.changeAll = this.changeAll.bind(this);
    this.changeStatusBoard = this.changeStatusBoard.bind(this);
  }

  componentDidMount() {
    this.getTable();
    this.getStatusTable();
  }

  changeAll(cb, cb2, cb3) {
    console.log('here');
    cb();
    cb2();
    cb3()
  }

  changeStatusBoard(row, column, status) {
    let newBoard = this.state.statusTable;
    newBoard[row][column] = status;
    this.setState({
      statusTable: newBoard
    })
  }

  checkArea({ row, column }) {}

  endGame(repeat) {
    this.setState({
      gameOver: true
    });
    if (repeat) {
      // this.getTable()
      window.location.reload(true);
    }
  }

  getTable() {
    axios
      .get('/board')
      .then(({ data }) => {
        this.setState({
          table: data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getStatusTable() {
    axios
      .get('/openBoard')
      .then(({ data }) => {
        this.setState({
          statusTable: data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="table" className="container">
        <h1>Minesweeper</h1>
        <table>
          <tbody>
            {this.state.table.map((row, i) => {
              return (
                <tr>
                  {row.map((cell, j) => {
                    return (
                      <td>
                        <Cell
                          cell={cell}
                          gameOver={this.state.gameOver}
                          checkArea={this.checkArea.bind(this)}
                          endGame={this.endGame}
                          changeAll={this.changeAll}
                          changeStatusBoard={this.changeStatusBoard}
                          open={this.state.statusTable[i][j]}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <EndPrompt gameOver={this.state.gameOver} endGame={this.endGame} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
