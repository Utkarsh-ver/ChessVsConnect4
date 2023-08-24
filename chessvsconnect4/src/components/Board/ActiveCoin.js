import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from "../../reducer/actionTypes"

const ActiveMarble = ({ turn, dropped, setDropped, setTurn }) => {
  const [column, setColumn] = useState();
  const [row, setRow] = useState();
  const dispatch=useDispatch

  const handleKeyDown = (e) => {

    if (e.keyCode === 37 && column > 0) {
      setColumn(column - 1);
    } else if (e.keyCode === 39) {
      if (column === undefined) setColumn(1);
      else if (column < 8) setColumn(column + 1);
    } else if (e.keyCode === 32 || e.keyCode === 13) {
      if (dropped.find((drop) => drop.x === 0 && drop.y === (column || 0))) {
        return;
      } else {
        const len = 7 - dropped.filter((drop) => drop.y === (column || 0)).length;
        setRow(len);
        // setTimeout(() => {
        //   setDropped([
        //     ...dropped,
        //     { x: len || 0, y: column || 0, player: turn },
        //   ]);
        //   setTurn(turn ==='w'?'w':'b')
        // }, 500);
        let newTurn = turn === 'b' ? 'w' : 'b';
        setTurn(newTurn);

        let newPosition = [
          ...dropped,
          { x: len || 0, y: column || 0, player: turn }
        ];

        setDropped(newPosition);

        // Dispatch the NEW_MOVE action with updated values
        

    // Dispatch the NEW_MOVE action with updated values
     dispatch({
      type: actionTypes.NEW_MOVE,
      payload: {
        newPosition,
        turn: newTurn,
      },
    });
        
      }
    }
  };

  useEffect(() => {
    setColumn();
    setRow();
  }, [turn]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyDown, false);
    return () => document.removeEventListener("keyup", handleKeyDown);
  });

  return (
    <div
      className={`active p${turn} column-${column || "-"} row-${
        row === undefined ? "-" : row
      }`}
    />
  );
};

export default ActiveMarble;
