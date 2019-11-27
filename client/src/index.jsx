import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Cell from './components/Cell.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [],
      gameOver: false
    };
    this.checkArea = this.checkArea.bind(this);
  }

  componentDidMount() {
    this.getTable();
  }

  checkArea({ row, column }) {}

  endGame() {
    this.setState({
      gameOver: true
    });
    this.resetTable();
  }

  resetTable() {}

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

  render() {
    return (
      <div className="table" className="container">
        <h1>Minesweeper</h1>
        <table>
          {this.state.table.map((row) => {
            return (
              <tr>
                {row.map((cell) => {
                  return (
                    <td>
                      <Cell cell={cell} checkArea={this.checkArea.bind(this)} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
