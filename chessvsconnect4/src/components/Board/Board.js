import Pieces from '../Pieces/Pieces'
import './Board.css'
import Files from './bits/Files'
import Rank from './bits/Rank'
import { getCharacter } from '../../helper.js'
import { useAppContext } from '../../context/Context'
import Dropzone from './DropZone'
import { useState } from 'react'

const Board=()=>{
    const ranks=Array(8).fill().map((x,i)=>8-i)
    const files=Array(8).fill().map((x,i)=>i+1)

    const [turn,setTurn]=useState('w')
    const {appState}=useAppContext()
    const position=appState.position[appState.position.length-1]

    // for(var i=0;i<position.length;i++){
    //     for(var j=0;j<position[0].length;j++){
    //         console.log(position[i][j]);
    //     }
    // }

    const getClassName=(i,j)=>{
        let c='tile '
        c+=(i+j)%2===0?'tile--dark':'tile--light ' 
        if(appState.candidateMoves?.find(m=>m[0]===i && m[1]===j)){
            if(!position[i][j])
                c+= ' highlight'
        }
        return c 
    }
    return <div>
            <Dropzone
            turn={turn}
            setTurn={setTurn}
            />
            <div className="Board">

                <Rank ranks={ranks}/>
                <div className="tiles">
                    {ranks.map((rank,i)=>
                    files.map((file,j)=>
                    <div key={file+'-'+rank} className={getClassName(7-i,j)}></div>))}
                </div>
                <Pieces
                turn={turn}
                setTurn={setTurn}
                />

                <Files files={files}/>
            </div>
        </div>
}

export default Board;