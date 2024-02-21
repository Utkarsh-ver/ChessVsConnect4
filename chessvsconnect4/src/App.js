import React, { useReducer } from 'react';
import './App.css'; // Import your main CSS file
import Board from './components/Board/Board';
import {AppContext,SocketContext} from './context/Context';
import { reducer } from './reducer/reducer';
import { initGameState } from './constant';
import { useEffect, useState,useContext } from 'react';
import { NewGame } from './reducer/actions/move';
// import UserTurn from './userTurn';
// import { messageContainer } from "https://cdn.socket.io/socket.io-3.0.1.min.js";  

///////////////////End of Socket.io/////////////////////////
function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);
  const [userT,setUserT]=useState(null);
  const socket = useContext(SocketContext);
  const providerState = {
    appState,
    dispatch,
  };
  const roll = localStorage.roll;
  const room = localStorage.roomNo;
  // console.log(localStorage.roll)
  
  // console.log(userplay);
  useEffect(()=>{
    console.log(`user joined ${roll}`);
    socket.emit("app-loaded",room);
    socket.on('user-joined',async ()=>{
      console.log("User Joined");
      dispatch(NewGame());
    });
  return ()=>{
    // socket.off('user-joined');
  }
  },[]);
  
  
  // const {turn}=appState;
  // // console.log(appState.position[appState.position.length-1]);
  // const board = appState.position[appState.position.length-1];
  
  // console.log(board);

  // socket.emit("board",localStorage.board);x

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <Board userT={userT} setUserT={setUserT}/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
