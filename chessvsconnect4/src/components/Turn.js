import React, { useReducer, useState } from "react";
import Board from  './Board/Board'// Chess component
import DropZone from "./Board/DropZone";//connect4 component
import reducer from "../reducer/reducer";// Your Chess reducer
import ActiveCoin from "./Board/ActiveCoin";// Your Connect 4 reducer

const Turn= () => {
  const [chessState, dispatchChess] = useReducer(reducer, 'b');
  const [connect4State, dispatchConnect4] = useReducer(ActiveCoin, 1);
  const [game, setGame] = useState("connect4"); // Initial game

  const handleGameSwitch = () => {
    setGame(game === "connect4" ? "chess" : "connect4");
  };

  const handleConnect4Move = (dropped) => {
    // Dispatch action to update Connect 4 state
    dispatchConnect4({ type: "NEW_MOVE", payload: { newPosition: dropped } });

    // Switch to the next game (Chess)
    handleGameSwitch();
  };

  const handleChessMove = (chessMove) => {
    // Dispatch action to update Chess state
    dispatchChess({ type: "MAKE_MOVE", payload: { move: chessMove } });

    // Switch to the next game (Connect 4)
    handleGameSwitch();
  };

  return (
    <div> 
      {game === "connect4" ? (
        <DropZone
          turn={connect4State.turn}
          dropped={connect4State.position}
          setDropped={handleConnect4Move}
          setTurn={dispatchConnect4}
        />
      ) : (
        <Board
          turn={chessState.turn}
          // Other Chess props
          makeMove={handleChessMove}
        />
      )}
    </div>
  );
};

export default Turn;
