import Pieces from '../Pieces/Pieces'
import './Board.css'
import Files from './bits/Files'
import Rank from './bits/Rank'
import { useAppContext } from '../../context/Context'
import Dropzone from './DropZone'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Board=()=>{
    const ranks=Array(8).fill().map((x,i)=>8-i)
    const files=Array(8).fill().map((x,i)=>i+1)
    const navigate = useNavigate();
    const [winner,setWinner] = useState()
    const [turn,setTurn]=useState('w')
    const {appState}=useAppContext()
    const [dropped, setDropped] = useState([]);
    const [userT,setUserT]=useState(null);


    const position=appState.position[appState.position.length-1]


const handleClick = async(event) => {

    const requestData = {
        board: position,
    };

    const requestDataDummy = {
        board: 10
    }
    
    // const repo = await fetch("http://127.0.0.1:5000/testing",{
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
    //     // body: JSON.stringify(requestData), // body data
    //     body: JSON.stringify({x:[[10,0,0,0,0],[0,0,0,0,10]]})
    // }).catch((er)=>console.log(er))

    const response = await fetch("http://127.0.0.1:5000/testing",{
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
            // body: JSON.stringify(requestData), // body data
            body: JSON.stringify({
                ...requestData,
                roll: localStorage.roll
            })
    }).catch((error) => {
        console.log(error);
    });
    console.log(response.status);
    if(response.status === 200){
        // alert("200 hogaya");
    }
    if(response.status === 204){
        // alert("Result not submitted");
        // alert("kuch haga");
    }
    // navigate('/home')
}

    handleClick();



    const board = position;
    console.log(board);
    


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

    return  <div style={{height :'100vh'}}>

          <div className='moveleft'>Connect4 Moves Left : {15-dropped.length}</div>
    <div className={`connect4 ${turn === 'b' ? '' : 'active'}`}></div>

            <Dropzone
            turn={turn}
            setTurn={setTurn}
            dropped = {dropped}
            setDropped={setDropped}
            winner = {winner}
            setWinner = {setWinner}
            userT ={userT}
            setUserT = {setUserT}
            setBoard = {handleClick}
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
                userT ={userT}
                setUserT = {setUserT}
                />

                <Files files={files}/>

            </div>
            <div className={`chess ${turn === 'b' ? 'active' : ''}`}></div>

        </div>
}

export default Board;
