import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "react-testing-library";

import Battleship from "../Battleship";

afterEach(cleanup);

test("should render the count and hits above the `Board`", () => {
  const { getByTestId, getByText } = render(<Battleship />);

  expect(getByText(/turns/)).toBeInTheDocument();
  expect(getByText(/hits/)).toBeInTheDocument();
  expect(getByTestId("turns")).toHaveTextContent("20");
  expect(getByTestId("hits")).toHaveTextContent("0");

  // miss
  fireEvent.click(getByTestId("99"));

  expect(getByTestId("turns")).toHaveTextContent("19");
  expect(getByTestId("hits")).toHaveTextContent("0");

  // hit
  fireEvent.click(getByTestId("90"));

  expect(getByTestId("turns")).toHaveTextContent("18");
  expect(getByTestId("hits")).toHaveTextContent("1");
});

test("should display a message and a restart button if the player lost", () => {
  const { getByTestId, getByText, getAllByText, queryByTestId } = render(
    <Battleship />
  );

  // turns = 0 && hits < 17 => display a `You lose =(` message
  for (let i = 20; i > 0; i--) {
    fireEvent.click(getByTestId(`${i.toString().length === 1 ? "0" + i : i}`));
  }
  expect(getByTestId("turns")).toHaveTextContent("0");
  expect(getByText("You lose =(")).toBeInTheDocument();
  expect(queryByTestId("board")).not.toBeInTheDocument();
  expect(getByText(/restart/)).toBeInTheDocument();

  fireEvent.click(getByText(/restart/));

  expect(getByTestId("board")).toBeInTheDocument();
  expect(getByTestId("turns")).toHaveTextContent("20");
  expect(getByTestId("hits")).toHaveTextContent("0");
  expect(getAllByText(/_/)).toHaveLength(100);
});

test("should display a message if the player won", () => {
  // hits === 17 => display `You win =)` message
  let winnerMoves = [
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    // 1
    // 2
    [3, 6],
    //
    [4, 6],
    //
    [5, 0],
    [5, 6],
    [5, 7],
    [5, 8],
    [5, 9],
    //
    [6, 0],
    //
    [7, 0],
    [7, 3],
    //
    [8, 0],
    [8, 3],
    //
    [9, 0]
  ];

  const { getByTestId, getByText, getAllByText, queryByTestId } = render(
    <Battleship />
  );

  winnerMoves.forEach((move, i) => {
    const [x, y] = move;
    fireEvent.click(getByTestId(`${x}${y}`));
  });

  expect(getByTestId("turns")).toHaveTextContent("3");
  expect(getByTestId("hits")).toHaveTextContent("17");
  expect(getByText("You win =)")).toBeInTheDocument();
  expect(queryByTestId("board")).not.toBeInTheDocument();
  expect(getByText(/restart/)).toBeInTheDocument();

  fireEvent.click(getByText(/restart/));

  expect(getByTestId("board")).toBeInTheDocument();
  expect(getByTestId("turns")).toHaveTextContent("20");
  expect(getByTestId("hits")).toHaveTextContent("0");
  expect(getAllByText(/_/)).toHaveLength(100);
});
