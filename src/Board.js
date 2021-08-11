import React from "react"

function Square(props) {
  const buttonStyle = (props.winnerIndex.indexOf(props.index) >= 0) ? { border: '2px solid red' } : {}
  return (
    <button className="square" onClick={props.onClick} style={buttonStyle}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        index={i}
        winnerIndex={this.props.winnerIndex}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = this.props.squares;
    const renderSquare = squares.map((item, index) => {
      return (
        this.renderSquare(index)
      )
    })

    return (
      <div>
        <div className="board-row">
          { renderSquare }
        </div>
      </div>
    );
  }
}

export default Board;