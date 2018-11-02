import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "react-testing-library";

import Board from "../Board";
// import mockedGrid from "../grid.json";

afterEach(cleanup);

let mockGrid = [
  [
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ],
  [
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ],
  [
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ],
  [
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ],
  [
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ],
  [
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 1, hit: 0 }
  ],
  [
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ],
  [
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ],
  [
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ],
  [
    { ship: 1, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 },
    { ship: 0, hit: 0 }
  ]
];

test("should render a board with click attributes and a 10x10 grid", () => {
  const mockClick = jest.fn();
  const { getByTestId, queryAllByText, queryByText, rerender } = render(
    <Board onClick={mockClick} grid={mockGrid} />
  );

  expect(getByTestId("board")).toBeInTheDocument();

  expect(queryAllByText("_")).toHaveLength(100);

  // click on empty cell
  fireEvent.click(getByTestId("00"));

  expect(mockClick).toHaveBeenCalled();

  mockGrid[0][0].hit = 1;

  rerender(<Board onClick={mockClick} grid={mockGrid} />);

  expect(queryByText("0")).toBeInTheDocument();

  // click on cell with ship
  fireEvent.click(getByTestId("03"));

  expect(mockClick).toHaveBeenCalled();

  mockGrid[0][3].hit = 1;

  rerender(<Board onClick={mockClick} grid={mockGrid} />);

  expect(queryByText("1")).toBeInTheDocument();
});
