import React, { useState, useEffect } from 'react';
import '../../constants.css';
import ActiveCoin from './ActiveCoin';
import './DropZone.css';
import Winner from './Winner';
import { turn } from '../../reducer/reducer'
import Buffer from './Buffer';


const DropZone = ({turn,setTurn,dropped,setDropped}) => {
  const [winner,setWinner]=useState();

  

  const root = document.documentElement;
  const size = getComputedStyle(root).getPropertyValue('--size').trim();

  const findWinner=()=> {
    const p1 = dropped.filter(d => d.player === 'w')
        p1.forEach(({x,y}) => {
            if (p1.find(m => x === m.x + 1 && y === m.y) &&
                p1.find(m => x === m.x + 2 && y === m.y) &&
                p1.find(m => x === m.x + 3 && y === m.y)
            )
            setWinner('w')
            else if (p1.find(m => x === m.x && y === m.y + 1) &&
                p1.find(m => x === m.x && y === m.y + 2) &&
                p1.find(m => x === m.x && y === m.y + 3)
            )
            setWinner('w')
            else if (p1.find(m => x === m.x + 1 && y === m.y + 1) &&
                p1.find(m => x === m.x + 2 && y === m.y + 2) &&
                p1.find(m => x === m.x + 3 && y === m.y + 3)
            )
            setWinner('w')
            else if (p1.find(m => x === m.x + 1 && y === m.y - 1) &&
                p1.find(m => x === m.x + 2 && y === m.y - 2) &&
                p1.find(m => x === m.x + 3 && y === m.y - 3)
            )
            setWinner('w')
          
        })
   }

  useEffect(()=>{
    // if(dropped.length===9)
    //    setWinner('b')
     findWinner()
  },[dropped])

  return (
    <div className='drop-zone'>
      {dropped.map((m, i) => (
        <div
          key={i}
          className={`p${m.player}`}
          style={{
            transform: `translate(${m.y * parseFloat(size)}vh, ${m.x * parseFloat(size)+15}vh)`,
          }}
        />
      ))}
      { (winner==='w' ||winner==='b')
      ?<Winner winner={winner}
      won={true}/>
      :<ActiveCoin
      turn={turn}
      dropped={dropped}
      setDropped={setDropped}
      setTurn={setTurn}
      />}

    </div>
  );
};

export default DropZone;
