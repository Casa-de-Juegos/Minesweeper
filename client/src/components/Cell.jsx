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

  render() {
    return (
      <div className="cell" >
      </div>
    )
  }
}

export default Cell;