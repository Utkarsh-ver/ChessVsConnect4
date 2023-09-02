import {useState,useEffect} from 'react'
import { useAppContext } from '../../context/Context';
import {io} from 'socket.io-client';
// import UserTurn from '../../userTurn';
// import userT from '../../userTurn'

// const socket = io('http://localhost:5050');

const ActiveMarble = ({ turn, dropped, setDropped, setTurn , userT , setUserT,socket}) => {
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState();
  const [prevColumns, setPrevColumns] = useState(null);
  const { appState } = useAppContext();

  var position = appState.position[appState.position.length - 1];
  
  socket.on("cm",async (newPosition)=>{
    
    console.log('huahuahua')
    const curr = newPosition[newPosition.length - 1];
    const len = curr.x;
    const column = curr.y;
    position[7 - len][(column || 0)] = 'c';
    setDropped(newPosition);
    setTurn('b');
  })

  const getTurn = ()=>{
    var requestData={roll:localStorage.roll};
    const response = fetch("/api/userTurn",{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json"
          //"Access-Control-Allow-Origin":"http://127.0.0.1:5000"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "manual", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(requestData), // body data

    }).catch((error) => {
        console.log(error);
    }).then((response)=>response.json()).then((data)=>{
        var round = localStorage.round;
        setUserT(data[0].userTurn[round-1]);
        console.log(userT);
        // console.log("bc chal jaa")
    });
  }
  getTurn();

  const handleKeyDown = (e) => {
    if (turn === 'b' && userT==="chess") {
      return;
    }
    else if(userT==="connect4" && turn === 'w'){
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

            socket.emit('checkermove',newPosition,localStorage.roll,localStorage.round);

            setDropped(newPosition);
          }, 100);
        }
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


  //////////////////////////////////////
// const handleClick = async(event) => {

// const requestData = {
//   dropped: dropped,
// };
  
  
//   const response = await fetch("http://127.0.0.1:5000/login",{
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "include", // include, *same-origin, omit
//     mode: "cors", // no-cors, *cors, same-origin
//     headers: {
//       "Content-Type": "application/json"
//       //"Access-Control-Allow-Origin":"http://127.0.0.1:5000"
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "manual", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(requestData), // body data
//   }).catch((error) => {
//     console.log(error);
//   });
    
//   }
  
//   handleClick();
  //////////////////////////////////////

  return (
    <div
      className={`active p${turn} column-${column || '-'} row-${
        row === undefined ? '-' : row
      }`}
    />
  );
};

export default ActiveMarble