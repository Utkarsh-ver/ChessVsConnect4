
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Round = () => {
    const [round, setRound]=useState('');
    const navigate = useNavigate();

    const handleClick = async(event) => {

        const requestData = {
        round: round,
        };

    
    const response = await fetch("http://127.0.0.1:5000/login",{
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
    });
    console.log(response.status);
    if(response.status===200){
        // setResponseMessage(response.message);
        navigate('/home')
        localStorage.round = round;
        // console.log(JSON.parse(response.body));
    }
}


    
    return ( 
        <div>
            <h1>Round</h1>
        <form>
            <label>Round</label>
            <input value={round} onChange={(e)=> setRound(e.target.value)} type="text" required name="round" />

            <button type="button" onClick={handleClick}>Submit</button>
        </form>
        </div>
    );
}
 
export default Round;