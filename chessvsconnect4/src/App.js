import React, { useReducer } from 'react';
import './App.css'; // Import your main CSS file
import Board from './components/Board/Board';
import AppContext from './context/Context';
import { reducer } from './reducer/reducer';
import { initGameState } from './constant';
import { io } from "socket.io-client";
// import UserTurn from './userTurn';
// import { messageContainer } from "https://cdn.socket.io/socket.io-3.0.1.min.js";   

/////////////////////////////Socket.io///////////////////////
const socket= io("http://localhost:5050");
        socket.on('connection')
        // const roll= prompt('Enter Your Roll no. to join');
        const roll = localStorage.roll
        const round = localStorage.round
        console.log(localStorage.roll)
        console.log(`user joined ${roll}`);
        socket.emit('new-user-joined',roll,round);
        // socket.on('message',(data)=>{
        //     document.querySelector('h2').innerHTML=data
        // })
        // socket.on('move',(data)=>{
        //     document.querySelector('h3').innerHTML=data
        // })
        // socket.on('user-joined',roll=>{
        // append(`${roll}`)
        // })
        const sendMessage=()=>{
            const messageInput=document.querySelector('.message')
            const message=messageInput.value
            socket.emit('message',message)
            messageInput.value=''
        }
        const sendScore=()=>{
            const messageInput=document.querySelector('.score')
            const score=messageInput.value
            socket.emit('score',score)
            messageInput.value=''
        }
        const sendBoard=()=>{
            const messageInput=document.querySelector('.board')
            const board=messageInput.value
            socket.emit('board',board)
            messageInput.value=''
        }
        const sendMove=()=>{
            const messageInput=document.querySelector('.move')
            const move=messageInput.value
            socket.emit('move',move)
            messageInput.value=''
        }
        const sendWinner=()=>{
            const messageInput=document.querySelector('.winner')
            const winner=messageInput.value
            socket.emit('winner',winner)
            messageInput.value=''
        }
///////////////////End of Socket.io/////////////////////////
function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch,
  };
  const {turn}=appState;

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <div className={`connect4 ${turn === 'b' ? 'active' : ''}`}></div>
        <div className={`chess ${turn === 'c' ? 'active' : ''}`}></div>
        <Board />
        
      </div>
    </AppContext.Provider>
  );
}

export default App;
