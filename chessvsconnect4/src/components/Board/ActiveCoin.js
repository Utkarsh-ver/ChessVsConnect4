import {useState,useEffect} from 'react'
import { useAppContext } from '../../context/Context';

const ActiveMarble = ({ turn, dropped, setDropped, setTurn }) => {
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState();
  const [prevColumns, setPrevColumns] = useState(null);
  const { appState } = useAppContext();

  var position = appState.position[appState.position.length - 1];
  const handleKeyDown = (e) => {
    if (turn === 'b') {
      return;
    }
    if(column === undefined){
      setColumn(0);return;}
    if (e.keyCode === 37 && column > 0) {
      setColumn(column - 1);
    } else if (e.keyCode === 39) {
      if (column === undefined) setColumn(column || 0);
      else if (column < 8) {
        setColumn(column + 1);
      }
    } else if (e.keyCode === 32) {
      if (dropped.find((drop) => drop.x === 0 && drop.y === (column || 0))) {
        return;
      } else {
        if ( column === prevColumns) {
          return; 
        }

        var len = 0;
        while (len < 8 && position[7 - len][(column || 0)] === '') {
          len = len + 1;
        }
        len = len - 1;
        if (len === -1) return;

        setTurn('b');
        setPrevColumns(column||0); 
        setRow(len);
        setTimeout(() => {
          position[7 - len][(column || 0)] = 'c';
          let newPosition = [
            ...dropped,
            { x: len || 0, y: column || 0, player: turn },
          ];

          setDropped(newPosition);
        }, 100);
      }
    }
  };

  useEffect(() => {
    setColumn();
    setRow();
  }, [turn]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyDown, false);
    return () => document.removeEventListener('keyup', handleKeyDown);
  });

  return (

    <div
      className={`active p${turn} column-${column || '-'} row-${
        row === undefined ? '-' : row
      }`}
    />
    
  );
};

export default ActiveMarble