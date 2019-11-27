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
      isOpen: cell.isOpen,
      bombsNearby: cell.bombsNearby
    };
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleFlag() {
    this.setState({ isFlag: !isFlag });
  }

  cellGraphic() {
    //return this.state.isBomb ? 'bomb' : 'clean';
    let graphic = '';

    if (this.state.isOpen === false) {
      graphic = '[====]';
    } else if (this.state.isBomb === true) {
      graphic = 'bomb';
    } else if (this.state.isFlag === true) {
      graphic = 'flagged';
    } else {
      graphic = 'safe';
    }

    return graphic;
  }

  handleCellClick(e) {
    if (this.state.isBomb) {
      console.log('test');
      this.toggleOpen();
    } else {
      // console.log('Open fields');
      // console.log(e);
      this.toggleOpen();
      this.props.checkArea({ row: this.state.row, column: this.state.column });
    }
  }

  render() {
    return (
      <span
        className="cell"
        className="item"
        onClick={(e) => this.handleCellClick(e)}
      >
        {this.cellGraphic()}
      </span>
    );
  }
}

export default Cell;
