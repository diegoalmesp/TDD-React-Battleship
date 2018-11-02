import React from "react";
import { fromJS } from "immutable";

import Board from "./Board";
import initialGame from "./grid.json";

const initialState = fromJS({
  turns: 20,
  hits: 0,
  grid: [...initialGame]
});

class BoardContainer extends React.Component {
  state = initialState.toJS();

  componentDidMount() {
    this.initialState = this.state;
  }

  onClick = coordinates => {
    const { turns, hits } = this.state;
    const [x, y] = coordinates.split(",").map(el => parseInt(el));
    let grid = [...this.state.grid];
    grid[x][y].hit = 1;

    if (grid[x][y].ship === 1) this.setState({ hits: hits + 1 });

    this.setState({ grid: grid, turns: turns - 1 });
  };

  restart = () => {
    this.setState(initialState.toJS());
  };

  render() {
    const { grid, turns, hits } = this.state;

    return (
      <div className="game-container">
        <h2>
          Stats [ turns: <span data-testid="turns">{turns}</span> | hits:{" "}
          <span data-testid="hits">{hits}</span> ]
        </h2>
        {hits < 17 &&
          turns === 0 && (
            <React.Fragment>
              <h3>You lose =(</h3>
              <button onClick={this.restart}>restart</button>
            </React.Fragment>
          )}
        {hits === 17 &&
          turns === 3 && (
            <React.Fragment>
              <h3>You win =)</h3>
              <button onClick={this.restart}>restart</button>
            </React.Fragment>
          )}
        {hits < 17 && turns > 0 && <Board onClick={this.onClick} grid={grid} />}
      </div>
    );
  }
}

export default BoardContainer;
