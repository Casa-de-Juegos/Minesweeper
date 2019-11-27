import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Cell from './components/Cell.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [],
      gameOver: false
    }
  }

  componentDidMount() {
    this.getTable();
  }

  endGame() {
    this.setState({
      gameOver: true
    })
    this.resetTable()
  }

  resetTable() {

  }

  getTable() {
    axios.get('/board')
    .then(({data}) => {
      this.setState({
        table: data
      });
    })
    .catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <div className="table" className="container">
        <h1>Minesweeper</h1>
        <table>
        {this.state.table.map((row) => {
          return <tr>{row.map((cell) => {
           return <td><Cell cell={cell} /></td>
          })
        }</tr>})}
        </table>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));