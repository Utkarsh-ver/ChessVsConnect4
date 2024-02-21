import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { SocketContext } from './context/Context';
import { useContext,useCallback } from 'react';
// import './login.css'

const Waitingroom = ({winner="No one"}) => {
    const socket = useContext(SocketContext);
    const [Opponent,setOpponent] = useState('no one');
    const [chessitems,setchessitems] = useState();
    // var opponent;
    const [checkeritems,setcheckeritems] = useState();
    // const [waiting,setwaiting] = useState();
    const [oppfound,setoppfound] = useState();
    // var chesswaiting = [];
    // var checkerwaiting = [];
    // var chessitems,checkeritems;
    const roll = localStorage.roll;
    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        socket.emit("check-pair",roll);
        // await socket.emit("get-opp",roll);
    },[roll,socket]);
    useEffect(()=>{
        socket.emit("waitload");
        socket.on("update-waiting",async(chess,checker)=>{
            // chesswaiting=chess;
            // checkerwaiting = checker;
            console.log("update-waiting")
            if(chess!==null){
                setchessitems(chess.map(person => <li>{person}</li>));
            }else{
                setchessitems();
            }
            if(checker!==null){
                setcheckeritems(checker.map(e => <li>{e}</li>));
            }else{
                setcheckeritems();
            }
        });
        socket.on("get-opp",async(roll)=>{
            socket.emit("get-opp",roll);
        })
        socket.on("matched-opp",async (opp,room,userplay)=>{
            if(opp==="nomatch"){
                setoppfound(false);
                setOpponent("no one");
            }else{
                setoppfound(true);
                localStorage.roomNo=room;
                localStorage.userplay=userplay;
                setOpponent(opp);
                socket.emit("joinroom",localStorage.roll,room);
            }
            console.log("matched-opp");
        });
        socket.on("navigate-game",async()=>{
            console.log("hua");
            navigate("/home");
        });
        socket.on("move-login",async()=>{
            navigate("/");
        })
        socket.on("leaveroom",async(room)=>{
            socket.emit("leaverooom",localStorage.roll,room);
        })
        return ()=>{
            socket.off("update-waiting");
            socket.off("get-opp");
            socket.off("leaveroom")
            socket.off("move-login");
            socket.off("matched-opp");
            socket.off("navigate-game");
        }
    },[])
    
    const handleClick2 = useCallback(()=>{
        console.log(oppfound);
        if(oppfound){
            socket.emit('new-user-joined',localStorage.roll,localStorage.roomNo);
            // socket.emit("starting-match",localStorage.roomNo);
        }

    },[socket,oppfound]);
    const handleClick3 = useCallback(()=>{
            socket.emit("logout",localStorage.roll);
        },[socket]);
    return (
            <div className='Winlose-waiting'>
                <div className='circle'></div>
                <div className="name"><h2>This is waiting room for next game</h2></div>
                <h1>{winner} won last game!</h1>
                <p>chess waiting list</p>
                <ul>{chessitems}</ul>
                <p>connect4 waiting list</p>
                <ul>{checkeritems}</ul>
                <h2>You are matched with {Opponent}</h2>
                <form>
                    <button className='button' type="button" onClick={handleClick}>find Match</button>
                </form>
                <button className='button' type='button' onClick={handleClick2}>start match</button>
                <button className='button' type='button' onClick={handleClick3}>logout</button>
                <div className="connect"></div>
                <div className="conn"></div>
                <div className="piece"></div>
                
            </div>
    );
}
 
export default Waitingroom;