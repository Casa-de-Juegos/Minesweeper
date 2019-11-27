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
    
    this.endGame = this.endGame.bind(this);
    this.changeStatusBoard = this.changeStatusBoard.bind(this);
    this.openCell = this.openCell.bind(this);
  }

  componentDidMount() {
    this.getTable();
    this.getStatusTable();
  }

  changeStatusBoard(row, column, status) {
    let newBoard = this.state.statusTable;
    newBoard[row][column] = status;
    this.setState({
      statusTable: newBoard
    })
  }

  openCell (row, column) {
    let table = this.state.table;
    let statusTable = this.state.statusTable;

    if (!table[row]|| !table[column] || statusTable[row][column] === true) {
      return;
    }
    
    if (table[row][column].bombsNearby !== 0) {
      let newStatusTable = statusTable.slice();
      newStatusTable[row][column] = true;
      this.setState({
        statusTable: newStatusTable
      })
    } else if (table[row][column].bombsNearby === 0) {
      let newStatusTable = statusTable.slice();
      newStatusTable[row][column] = true;
      this.setState({
        statusTable: newStatusTable
      })

      this.openCell(row - 1, column);
      this.openCell(row + 1, column);
      this.openCell(row, column - 1);
      this.openCell(row, column + 1);
    }

    return
  }

  endGame(repeat) {
    let newTable = this.state.statusTable.slice();
    newTable.forEach((row, i) => {
      row.forEach((cell, j) => {
        newTable[i][j] = true;
      })
    })
    this.setState({
      statusTable: newTable
    })
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
    axios.get('/openBoard')
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
                          endGame={this.endGame}
                          changeAll={this.changeAll}
                          changeStatusBoard={this.changeStatusBoard}
                          open={this.state.statusTable[i][j]}
                          openCell={this.openCell}
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
