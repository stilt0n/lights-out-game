import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <h1> Lights Out </h1>
      <p> Turn all the lights out to win </p>
      <Board />
    </div>
  );
}

export default App;
