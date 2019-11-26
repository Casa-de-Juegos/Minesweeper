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
      <div className="table">
        {this.state.table.map((cell) => {
          return <Cell cell={cell} />
        })}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));