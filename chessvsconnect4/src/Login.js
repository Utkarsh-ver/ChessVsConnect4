import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [roll,setRoll]=useState('');
    const [pwd,setPwd]=useState('');
    const [round, setRound]=useState('');
    // const [responseMessage, setResponseMessage]=useState('');
    const navigate = useNavigate();

    const handleClick = async(event) => {

        const requestData = {
        roll: roll,
        pwd: pwd,
        round: round,
        };

    // try {
    //     const response = await axios.post('http://localhost:5000/login', requestData);
    //     setResponseMessage(response.data.message);
    // } catch (error) {
    //     console.error('Error sending POST request:', error);
    //     console.log(requestData);
    // }
    
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
        localStorage.roll = roll;
        localStorage.pwd = pwd;
        localStorage.round =round;
        // console.log(JSON.parse(response.body));
    }
    if(response.status === 204){
        alert("Wrong Password");
    }
}
//     axios.post('http://localhost:3002/login', requestData)
//   .then(response => {
//     // Handle response
//   })
//   .catch(error => {
//     console.error('Error sending POST request:', error);
//   });

// useEffect(() => {
//     fetch("/login", {method: "POST"})
//         .then(response => response.json())
//         .then(data=>{
//             setResponseMessage(data)
//         })
        
// })

    // const requestData = { roll: 'roll', pwd: 'pwd',}; // Replace with your data
    //     axios.post('/login', requestData)
    //     .then(response => {
    //         setResponseMessage(response.data.message);
    //     })
    //     .catch(error => {
    //         console.error('Error sending POST request:', error);
    //     });


    return ( 
            <div>
                <h1>Login</h1>
            <form>
                <label>Roll Number</label>
                <input value={roll} onChange={(e)=> setRoll(e.target.value)} type="text" required name="roll" />
                <label>Password</label>
                <input value={pwd} onChange={(e)=> setPwd(e.target.value)} type="text" required name="pwd" />
                <label>Round</label>
                <input value={round} onChange={(e)=> setRound(e.target.value)} type="text" required name="round" />

                <button type="button" onClick={handleClick}>Login</button>
            </form>
            </div>
    );
}

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [responseMessage, setResponseMessage] = useState('');

//   const handlePostRequest = () => {
//     const requestData = { key: 'value' }; // Replace with your data
//     axios.post('/api/postData', requestData)
//       .then(response => {
//         setResponseMessage(response.data.message);
//       })
//       .catch(error => {
//         console.error('Error sending POST request:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>React App</h1>
//       <button onClick={handlePostRequest}>Send POST Request</button>
//       {responseMessage && <p>Server Response: {responseMessage}</p>}
//     </div>
//   );
// }

// export default App;

 
export default Login;