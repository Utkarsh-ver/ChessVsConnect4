
import { useReducer } from 'react'
import './App.css'
import Board from './components/Board/Board'
import DropZone from './components/Board/DropZone'
import AppContext from './context/Context'
import { reducer } from './reducer/reducer'
import { initGameState } from './constant'
import { winner } from './'
import Control from './components/Board/control'
import TakeBack from './components/Board/TakeBack'
function App({winner}) {

  const[appState,dispatch]=useReducer(reducer,initGameState)

  const providerState={
    appState,
    dispatch
  }
  return (
    <AppContext.Provider value={ providerState}> 
    <div className="App">
      <Board/>
      {/* <Control className="takeback">
    <TakeBack/>
  </Control> */}
    </div>
    
    </AppContext.Provider>
    
  );
}

export default App;
