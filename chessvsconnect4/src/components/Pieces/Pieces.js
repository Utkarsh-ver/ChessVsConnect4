import './Pieces.css'
import Piece from './Piece'
import {useState,useRef} from 'react'
import { createPosition,copyPosition}  from '../../helper.js'
import { clearCandidates, makeNewMove } from '../../reducer/actions/move'
import { useAppContext } from '../../context/Context'
const  Pieces=({turn,setTurn,dropped,setDropped})=>{
    
    const ref=useRef()
    const {appState,dispatch}=useAppContext()
    const currentPosition=appState.position[appState.position.length-1]
    const calculateCoords=e=>{
        const{width,left,top}=ref.current.getBoundingClientRect()
        const size=width/8 
        const y=Math.floor((e.clientX-left)/size)
        const x=7-Math.floor((e.clientY-top)/size)
        return{x,y}

    }
    


    

    const onDrop=e=>{
        if(turn === 'w')return;
        const newPosition=copyPosition(currentPosition)
        const{x,y}=calculateCoords(e)
        const[p,rank,file]=e.dataTransfer.getData('text').split(',')
        
        if(appState.candidateMoves?.find(m=>m[0]===x && m[1]===y)){
            
            newPosition[rank][file]=''
            newPosition[x][y]=p
        
            // console.log(rank + " " + file)

            var col = file;
            var row = parseInt(rank)+1;
            var drop = row-1;
            while(drop>=0 && newPosition[drop][col] === ''){
                drop--
            }
            drop++
            while(row <= 7 && newPosition[row][col] === 'c'){
                // console.log(row + " " +  col + '\n')
                newPosition[drop][col] = 'c'
                drop++
                newPosition[row][col] = ''
                row = row+1;
            }


            dispatch(makeNewMove({newPosition}))
          

            setTurn('w')
            console.log(turn)
        }

        dispatch(clearCandidates())
        var temp_dropped = []
        for(var i=0;i<newPosition.length;i++){
          for(var j = 0;j<newPosition[0].length;j++){
            if(newPosition[i][j] === 'c'){
              temp_dropped = [
                ...temp_dropped,
                { x: 7-i || 0, y: j, player: 'w' }
              ]
            }
          }
        }
        setDropped(temp_dropped);
    }
  

    const onDragOver =e=>e.preventDefault()
    

return <div 
ref={ref}
onDrop={onDrop}
onDragOver={onDragOver}
className='pieces'>
    {currentPosition.map((r,rank)=> 
    r.map((f,file)=>
    currentPosition[rank][file]
    ? <Piece
    key={rank+'-'+file}
    rank={rank}
    file={file}
    piece={currentPosition[rank][file]
    }/>
    : null
    ))}
</div>
}


export default Pieces