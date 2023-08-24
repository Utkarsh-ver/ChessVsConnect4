import React, { useState, useEffect } from 'react';
import './DropZone.css';
import '../../constants.css';
import ActiveCoin from './ActiveCoin';
import Winner from './Winner';
import { turn } from '../../reducer/reducer'

const DropZone = ({turn,setTurn}) => {
  const [winner,setWinner]=useState();
  const [dropped, setDropped] = useState([]);
  

  const root = document.documentElement;
  const size = getComputedStyle(root).getPropertyValue('--size').trim(); // Get the size value

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
     findWinner()
  },[dropped.length])

  return (
    <div className='drop-zone'>
      {dropped.map((m, i) => (
        <div
          key={i}
          className={`p${m.player}`}
          style={{
            transform: `translate(${m.y * parseFloat(size)}px, ${m.x * parseFloat(size)+150}px)`,
          }}
        />
      ))}
      { (winner==='w' ||winner==='b')
      ?<Winner winner={winner} />
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
