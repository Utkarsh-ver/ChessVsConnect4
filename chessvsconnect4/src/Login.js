import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './login.css'
import { SocketContext } from './context/Context';
import { useContext,useCallback } from 'react';

const Login = () => {
    const socket = useContext(SocketContext);
    const [roll,setRoll]=useState('');
    const [pwd,setPwd]=useState('');
    
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        socket.emit("login-check",roll,pwd);
    },[roll,pwd,socket]);
    useEffect(()=>{
        socket.on("correct-login",async(roll,pwd)=>{
            localStorage.roll=roll;
            localStorage.pwd=pwd;
            console.log("abc");
            navigate('/waitingroom');
        });
        socket.on("wrong-password",async ()=>{
            alert("Wrong Password");
        })
        return ()=>{
            socket.off("correct-login");
            socket.off("wrong-password");
        }
    },[]);
    
    return (
        <>
            <div className='login'>
            <div className='circlee'></div>
            <div className="name"><h2>FUSIONGRID</h2></div>
            <form >
                <label ></label>
                <input className='rollno' placeholder='Roll No.' value={roll} onChange={(e)=> setRoll(e.target.value)} type="text" required name="roll" />
                <label></label>
                <input className='password' placeholder='Password' value={pwd} onChange={(e)=> setPwd(e.target.value)} type="text" required name="pwd" />
                <label ></label>
                {/* <input className='round' placeholder='Round No.' value={round} onChange={(e)=> setRound(e.target.value)} type="text" required name="round" /> */}

                <button className='button' type="button" onClick={handleClick}>Login</button>
            </form>
            </div>
            <div className="connecte"></div>
            <div className="conne"></div>
            <div className="piecee"></div>
        </>
        );
}
 
export default Login;