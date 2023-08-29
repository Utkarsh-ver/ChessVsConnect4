import React, { useReducer } from 'react';
import './App.css'; // Import your main CSS file
import Board from './components/Board/Board';
import AppContext from './context/Context';
import { reducer } from './reducer/reducer';
import { initGameState } from './constant';   

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
