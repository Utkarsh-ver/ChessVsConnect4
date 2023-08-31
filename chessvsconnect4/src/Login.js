import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Login = () => {
    const [responseMessage, setResponseMessage] = useState([{}]);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const requestData = {
        roll: event.target.roll.value,
        pwd: event.target.pwd.value,
        };

    try {
      const response = await axios.post('/login', requestData);
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
    };

    

//     axios.post('http://localhost:3002/login', requestData)
//   .then(response => {
//     // Handle response
//   })
//   .catch(error => {
//     console.error('Error sending POST request:', error);
//   });

useEffect(() => {
    fetch("/login", {method: "POST"})
        .then(response => response.json())
        .then(data=>{
            setResponseMessage(data)
        })
        
})

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
            <form action='/login' method= 'post'>
                <label>Roll Number</label>
                <input type="text" required name="roll" />
                <label>Password</label>
                <input type="text" required name="pwd" />

                <button type="submit">Login</button>
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