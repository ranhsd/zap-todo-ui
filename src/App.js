import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useRoutes } from "hookrouter";
import router from './router';

function App() {

  const routeResult = useRoutes(router);

  return (
    <div className="App">
      {routeResult}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload zap.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
