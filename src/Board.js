import React from "react";
import PropTypes from "prop-types";

const Board = ({ onClick, grid }) => {
  return (
    <div data-testid="board" className="board">
      {grid.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, i2) => (
            <div
              className="col"
              key={i2}
              onClick={() => onClick(`${i},${i2}`)}
              data-testid={`${i}${i2}`}
            >
              {cell.hit === 0 && <span>_</span>}
              {cell.ship === 0 && cell.hit === 1 && <span>0</span>}
              {cell.ship === 1 && cell.hit === 1 && <span>1</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Board.propTypes = {
  onCLick: PropTypes.func.isRequired,
  grid: PropTypes.array.isRequired
};

Board.defaultProps = {
  grid: []
};

export default Board;
