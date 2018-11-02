import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Battleship from "./Battleship";

function App() {
  return (
    <div className="App">
      <h1>Battleship with Reactjs and TDD</h1>
      {/*<Battleship />*/}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
