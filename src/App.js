import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      player_turn: "X",
      disabled: false,
      winner: [],
      winner_messages: {
        message1: "Welcome",
      },
    };
  }
  squareClicked(index) {
    let player_turn = this.state.player_turn;
    let board = this.state.board;
    let disabled = this.state.disabled;
    let winner = this.state.winner;

    const found = board.find((element) => element === " ");

    if (disabled === false && found !== " ") {
      alert(`Draw click Reset form a new game`);
      return;
    }

    if (board[index] !== " ") {
      if (disabled === true) {
        player_turn = player_turn === "X" ? "O" : "X";
        alert(
          `player ${player_turn} has won the game , Click Reset for a new Game:)`
        );
      }
      return;
    } else {
      if (disabled === false) {
        board[index] = player_turn;

        let winning_combos = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (let i = 0; i < winning_combos.length; i++) {
          let winning_row = winning_combos[i];
          let p1 = winning_row[0];
          let p2 = winning_row[1];
          let p3 = winning_row[2];
          if (
            board[p1] !== " " &&
            board[p1] === board[p2] &&
            board[p2] === board[p3] &&
            board[p3] === board[p1]
          ) {
            disabled = true;
            winner.push(p1, p2, p3);
            alert(`player ${player_turn} has won the game`);
          }
        }
        player_turn = player_turn === "X" ? "O" : "X";
        this.setState({
          player_turn: player_turn,
          board: board,
          disabled: disabled,
          winner: winner,
        });
      } else {
        player_turn = player_turn === "X" ? "O" : "X";
        alert(
          `player ${player_turn} has won the game , Click Reset for a new Game:)`
        );
      }
    }
  }

  resetState = () => {
    let board = this.state.board;
    let disabled = this.state.disabled;
    let winner = this.state.winner;
    winner = [];
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    disabled = false;
    this.setState({
      board: board,
      disabled: disabled,
      winner: winner,
    });
  };

  render() {
    let assignedClass = "heading";
    return (
      <div className="App">
        <div className="nav"> Tic Tac Toe</div>
        <div className="top">
          <h3>Turn : {this.state.player_turn}</h3>
          <h3>{this.state.winner_messages.message1}</h3>
        </div>
        <div className="board">
          {this.state.board.map((square, index) => {
            assignedClass = "heading";
            let x = this.state.winner.find((element) => element === index);
            if (x >= 0) {
              console.log(x);
              assignedClass = "heading2";
            }

            return (
              <div
                onClick={() => {
                  this.squareClicked(index);
                }}
                className="square"
              >
                <h1 className={assignedClass}>{square}</h1>
              </div>
            );
          })}
        </div>
        <div className="btnarea">
          <button className="reset" onClick={this.resetState}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
