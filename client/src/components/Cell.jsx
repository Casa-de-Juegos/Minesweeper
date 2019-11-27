import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);

    let cell = this.props.cell;
    this.state = {
      row: cell.R,
      column: cell.C,
      isBomb: cell.bomb,
      isFlag: cell.flag,
      isEdge: cell.edge,
      bombsNearby: cell.bombsNearby
    }
  }

  handleCellClick() {
    if (this.state.isBomb) {
      console.log('LOST');
    } else {
      console.log('Open fields')
    }
  }

  render() {
    return (
      <span className="cell" className="item"  onClick={(e) => this.handleCellClick(e)}>{this.state.isBomb ? "bomb" : "clean" }</span>
    )
  }
}

export default Cell;