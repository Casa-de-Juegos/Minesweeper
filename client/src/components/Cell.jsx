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
      isOpen: this.props.open,
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

    this.openCell = this.openCell.bind(this);
    this.setNumColor = this.setNumColor.bind(this);
    this.setBackground = this.setBackground.bind(this)
  }

  setNumColor() {
    if (this.props.open) {
      if (this.state.bombsNearby === null) {
        return 'black';
      } else if (this.state.bombsNearby === 0) {
        return 'lightgrey';
      } else if (this.state.bombsNearby === 1) {
        return 'royalblue';
      } else if (this.state.bombsNearby === 2) {
        return 'seagreen';
      } else if (this.state.bombsNearby === 3) {
        return 'orangered';
      } else {
        return 'darkred';
      }
    }
  }

  // openCell() {
  //   this.setState({
  //     isOpen: true
  //   });
  // }

  setBackground() {
  
    if (this.state.isBomb) {
      return 'tomato';
    } else {
      return 'lightgrey';
    }
  }

  handleCellClick(e) {
    if (this.props.gameOver === false) {

      //this.props.changeStatusBoard(this.state.row, this.state.column, true)
      this.props.openCell(this.state.row, this.state.column)
      this.setNumColor();
      this.setBackground();

      if (this.state.isBomb) {
        this.props.endGame();
      } else if (this.state.bombsNearby === 0){
        // open
        // increase score
      }
    }
  }

  // this.toggleOpen();
  // this.props.checkArea({ row: this.state.row, column: this.state.column });

  render() {
    return (
      <div
        className="cell"
        onClick={(e) => this.handleCellClick(e)}
        style={
          this.props.open
            ? {
                backgroundColor: this.setBackground(),
                color: this.setNumColor()
              }
            : { backgroundColor: 'grey', color: 'grey', opacity: '100%' }
        }
      >
        {this.state.isBomb ? 'X' : this.state.bombsNearby}
      </div>
    );
  }
}

export default Cell;





