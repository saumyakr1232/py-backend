import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

const {ipcRenderer} = window.require('electron')




function App() {

  const [temp, setTemp] = useState(0)

  ipcRenderer.on("py-console-error", (event, msg) => {
    console.log("error", msg)
  })

  ipcRenderer.on("std-out", (event, msg) => {
    console.log("stdout", msg)
  })


  const handleClick = event => {

    console.log(ipcRenderer.sendSync("temp", "some arg"))
    
    console.log(temp); 
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click me</button>
        <img onClick={handleClick} src={logo} className="App-logo" alt="logo" />
        <p onClick={handleClick}>
          Edit <code>src/App.js</code> and save t reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
