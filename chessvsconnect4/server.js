const express = require('express');
const mongoose = require('mongoose');
// const User = require('./userData');
const { handleUserLogin,handleUserget} = require('./sign');
// const ReactDOMServer = require('react-dom/server');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const por = process.env.PORT || 5050;
const server = app.listen(por, console.log("server started at port: " + por));
const io = require("socket.io")(server, { cors: { origin: "*" } });
const User = require('./userData');

const corsOpts = {
    origin: true,
    credentials: true,
    preflightContinue: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};

// Middleware
app.use(cors(corsOpts));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Route to handle the login POST request
app.post('/api/login', (req, res) => {
    // const { roll, pwd } = req.body;
    handleUserLogin(req,res);
    // Here you can implement your login logic
    // Check credentials, authenticate, etc.
    
    // For demonstration purposes, send a simple response
    // res.json({ message: 'Login successful' });
});
  

app.post('/api/userTurn', (req,res)=>{
    handleUserget(req,res);
}
);

// app.post('/testing',(req,res)=>{
// 	(function(){
// 		const user = new User();
// 		user.roll = "siddhant"
// 		user.pwd = "siddhant"
// 		user.round1_room = "toto"
// 		user.score = 0
// 		user.count_moves = 0
// 		user.save();
// 	}())
// })



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const cors = require('cors');

// app.use(cors()); // Enable CORS for all routes

// // ... Define your routes

// app.post('/login', (req, res) => {
//     // const requestData = req.body; // Data sent in the request body
//     // console.log('Received POST data:', requestData);
  
//     // const responseData = { message: 'Data received successfully!' };
//     // res.json(responseData);
//     handleUserLogin(req, res);
// });

// const drt = process.env.PORT || 3002;
// app.listen(drt, () => {
//   console.log(`Server is listening on port ${drt}`);
// });







const dbURI = 'mongodb+srv://shubhkj275:skumarj275@nodetuts.dp8genc.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => 
	app.listen(5000))
    .catch((err) => 
	console.log(err));

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








//******************Database connection***************//
// let users = {};


io.on("connection", (socket) => {
	let run = false
    socket.on('checkermove',async (newPosition,roll,round)=>{
        
		// console.log(room)
		const room = await findOneListingByRound(roll,round);
		// console.log(room)
		console.log('checker')
        console.log(newPosition)
        io.to(room).emit("cm",newPosition,(er)=>{
			console.log(er)
		})
    });
    socket.on('chessmove',async (newPosition,roll,round)=>{
		
		// console.log(room)
		const room = await findOneListingByRound(roll,round);
		// console.log(room)
        console.log('chess')
        console.log(newPosition)
        io.to(room).emit("chessmove",newPosition,(er)=>{
			console.log(er)
		})
    })
	socket.on('finalCount',async (count,roll,winner)=>{
		// console.log(count)
		if(run)return;
		run = true;
		var win;
		if(winner === 'b'){
			win = 'chess'
		}else{
			win = 'connect4'
		}
		try{
		const result =await User.updateOne({roll:roll},{$push:{moves:count , winner:win}})
		// console.log(result);
		}catch(err){
			console.log(err);
		}
		console.log('Loading ....');
	})
	socket.on("new-user-joined", async (roll,round) => {
		console.log("New user: ", roll);
		// console.log("User Connected: "+ socket.id);
		// const room = await findOneListingByRoll(roll);
		const room = await findOneListingByRound(roll,round);
		// users[socket.id] = room;
		// console.log("Room: ", room);
		// console.log(room)
		// localStorage.room = room;
		await socket.join(room);
		// console.log(await io.sockets.adapter.rooms)
		const roomSize = await io.sockets.adapter.rooms.get(room).size;
		console.log(room + ":" + roomSize);
		io.to(room).emit("user-joined");
	});
});

const findOneListingByRound = async (roll,round) => {
	console.log('here')
	const result = await User.findOne({ roll: roll });
    let response="";
    console.log("Round: ",round)
	if(round === null)return;
	if(round === "1"){
		response = result.round1_room;
	}else if(round === "2"){
		response = result.round2_room;
	}else if(round === "3"){
		response = result.round3_room;
	}else{
		response = result.round4_room;
	}
	console.log(response)
    // if(round === "1"){
    //     // console.log("mc")
    //     response = result.round1_room; 
    // }
	// console.log(response);
	if (result) {
		console.log(`Found a listing in the collection with the roll '${roll}':`);
		// console.log(result.room);
	} else {
		console.log(`No listings found with the roll '${roll}'`);
	}
	return response;
};