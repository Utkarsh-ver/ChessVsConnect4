const express = require('express');
const mongoose = require('mongoose');
// const User = require('./userData');
const { handleUserLogin } = require('./sign');
// const ReactDOMServer = require('react-dom/server');
const bodyParser = require('body-parser');
const app = express();



const cors = require('cors');

app.use(cors()); // Enable CORS for all routes

// ... Define your routes

app.post('/login', (req, res) => {
    // const requestData = req.body; // Data sent in the request body
    // console.log('Received POST data:', requestData);
  
    // const responseData = { message: 'Data received successfully!' };
    // res.json(responseData);
    handleUserLogin(req, res);
});

const drt = process.env.PORT || 3002;
app.listen(drt, () => {
  console.log(`Server is listening on port ${drt}`);
});







const dbURI = 'mongodb+srv://shubhkj275:skumarj275@nodetuts.dp8genc.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

// app.post('/login', (req, res) => {
//     // const requestData = req.body; // Data sent in the request body
//     // console.log('Received POST data:', requestData);
  
//     // const responseData = { message: 'Data received successfully!' };
//     // res.json(responseData);
//     handleUserLogin(req, res);
// });
  
//   const PORT = process.env.PORT || 3001;
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });

// app.post('/login', (req, res) => {
//     // roll = req.body.roll;
//     // pwd = req.body.pwd;
//     handleUserLogin(req, res);
// });


// app.set('view engine', 'ejs');


// app.get('/', (req,res) => {
//     res.render('home');
// });

// app.get('/', (req, res) => {
//     const home = require('../chessvsconnect4/src/index'); // Import your React component
//     const html = ReactDOMServer.renderToString(React.createElement(home));
//     res.send(html);
// });

// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// app.get('/login', (req, res) => {
//     res.render('login');
// });






// 404 page
// app.use((req, res) => {
//     res.status(404).render('404', { title: '404' });
// });
