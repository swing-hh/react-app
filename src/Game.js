import React from "react"
import Board from "./Board"
import { calculateWinner } from "./utils"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ // 历史记录
        squares: Array(9).fill(null),
        row: null,
        column: null
      }],
      stepNumber: 0, // 当前第几个历史记录
      xIsNext: true, // 下一个是否是X
      isAscendingOrder: true, // 是否是升序
      winnerIndex: [null, null, null], // 获胜的3子
      isWinner: false
    };
  }

  handleClick(i) {
    if (this.state.isWinner) return;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const { winner, winnerIndex } = calculateWinner(squares);
    
    if (winnerIndex && this.state.winnerIndex.indexOf(null) >= 0) {
      this.setState({
        winnerIndex: winnerIndex
      });
    }
    this.setState({
      history: history.concat([{
        squares: squares,
        row: Math.floor(i / 3) + 1,
        column: i % 3 + 1
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });

    if (winner) {
      this.setState({
        isWinner: true
      })
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  sort() {
    this.setState({
      isAscendingOrder: !this.state.isAscendingOrder,
      stepNumber: this.state.history.length - this.state.stepNumber - 1
    })
    this.state.history.reverse();
  }

  replay() {
    window.location.href = window.location.href;
  }

  // 渲染页面
  render() {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner } = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = step.row ?
        'Go to move #' + move + '@行' + step.row + '@列' + step.column :
        'Go to game start';
      const buttonStyle = move === this.state.stepNumber ? { fontWeight: 600 } : {}
      return (
        <li key={move} style={buttonStyle}>
          <button style={buttonStyle} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const orderText = this.state.isAscendingOrder ? "升序" : "降序";
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      if (current.squares.indexOf(null) < 0) {
        status = "dogfall!";
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerIndex={this.state.winnerIndex}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sort()} >{orderText}</button>
          <button onClick={() => this.replay()} >重新开始</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
