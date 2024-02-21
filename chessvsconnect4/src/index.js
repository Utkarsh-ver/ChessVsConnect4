import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './home';
import Login from './Login';
import Round from './round';
import Waitingroom from './waitingroom';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {io} from "socket.io-client"
import { SocketContext,socket } from './context/Context';

// const socket= io();
// socket.on('connection');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
    <Router>
      <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/round" element={<Round/>}></Route>
          <Route exact path="/home" element={<App />}></Route>
          <Route exact path="/waitingroom" element={<Waitingroom/>}></Route>
      </Routes>
    </Router>
    </SocketContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

