import Pieces from '../Pieces/Pieces'
import './Board.css'
import Files from './bits/Files'
import Rank from './bits/Rank'
import { useAppContext } from '../../context/Context'
import Dropzone from './DropZone'
import { useState } from 'react'


const Board=()=>{
    const ranks=Array(8).fill().map((x,i)=>8-i)
    const files=Array(8).fill().map((x,i)=>i+1)

    const [winner,setWinner] = useState()
    const [turn,setTurn]=useState('w')
    const {appState}=useAppContext()
    const [dropped, setDropped] = useState([]);

    const position=appState.position[appState.position.length-1]

    const getClassName=(i,j)=>{
        let c='tile '
        c+=(i+j)%2===0?'tile--dark':'tile--light ' 
        if(appState.candidateMoves?.find(m=>m[0]===i && m[1]===j)){
            if(!position[i][j])
                c+= ' highlight'
        }
        return c 
    }
    
    if(winner=='b'){
        return <div id='winner'>Congratulations! Chess has WON</div>
    }
    if(winner == 'w'){
        return <div id='winner'>Congratulations! Connect4 has WON</div>
    }

    return <div style={{height :'100vh'}}>
    <div className='moveleft'>Connect4 Moves Left : {15-dropped.length}</div>
    <div className={`connect4 ${turn === 'b' ? '' : 'active'}`}></div>
            <Dropzone
            turn={turn}
            setTurn={setTurn}
            dropped = {dropped}
            setDropped={setDropped}
            winner = {winner}
            setWinner = {setWinner}
            />
            
            <div className="Board">
            
                <Rank ranks={ranks}/>
                <div className="tiles">
                    {ranks.map((rank,i)=>
                    files.map((file,j)=>
                    <div key={file+'-'+rank} className={getClassName(7-i,j)}></div>))}
                </div>
                <div className="text">FUSIONGRID</div>
                <Pieces
                turn={turn}
                setTurn={setTurn}
                dropped={dropped}
                setDropped={setDropped}
                />

                <Files files={files}/>

            </div>
            <div className={`chess ${turn === 'b' ? 'active' : ''}`}></div>
        </div>
}

export default Board;