const express = require('express');
const mongoose = require('mongoose');
const handleUserLogin  = require('./controller/logincontroller');
const usercontroller  = require('./controller/usercontroller');

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const User = require('./models/user');
const waitingroom = require('./models/waitingroom');
// const { default: Waitingroom } = require('../chessvsconnect4/src/waitingroom');
const por = process.env.PORT || 5050;
const server = app.listen(por, console.log("server started at port: " + por));
const io = require("socket.io")(server, { cors: { origin: "*" } });

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

const dbURI = 'mongodb+srv://ok347869:TZ8CnP1CceSQSlgH@cluster0.xgyhyhv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Route to handle the login POST request
app.post('/login', (req, res) => {
    handleUserLogin(req,res);
});

app.get("/users/:roll", usercontroller.getUsers);
app.get("/waitingroom",usercontroller.getWaitingroom);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


io.on("connection", (socket) => {
	let run = false;
    let run2 = false;
    socket.on('checkermove',async (newPosition,roll,room)=>{
        
		// console.log(room)
		console.log('checker')
        console.log(newPosition)
        io.to(room).emit("cm",newPosition,(er)=>{
			console.log(er)
		})
    });
    socket.on('chessmove',async (newPosition,roll,room)=>{
		
		// console.log(room)
		// const room = await findOneListingByRound(roll,round);
		// console.log(room)
        console.log('chess')
        console.log(newPosition)
        io.to(room).emit("chssmove",newPosition,(er)=>{
			console.log(er)
		})
    });
    socket.on('finalCount',async (count,room,roll,userplay,winner)=>{
		// if(run)return;
        // const user = await User.findOne({ roll: roll });
        var winhis;
		// run = true;
        run2=false;
        run11=false;
        run10=false;
        run3=false;
		if((winner==='b' && userplay==='chess') || (winner==='w' && userplay==='connect4')){
            winhis = "W";
        }else{
            winhis = "L";
        }
		// const wat = waitingroom.findOne();
        // let checkerwaiting = waitingroom.checker;
        // let chesswaiting = waitingroom.chess;
        if(userplay==='chess'){
            // checkerwaiting.push(roll);
            await waitingroom.updateOne({},{$push:{checker:roll}});
        }else{
            // chesswaiting.push(roll);
            await waitingroom.updateOne({},{$push:{chess:roll}});
        }
		try{
		    await User.updateOne({roll:roll},{$set:{inwaiting:true},$push:{movecount:count , winhistory:winhis}})
            // await User.updateOne({roll:roll},{});
            await socket.leave(room);

            
        }catch(err){
			console.log(err);
		}
		console.log('Loading ....');
        // const waiting = await waitingroom.findOne({});
        // io.emit("update-waiting",waiting);
        io.to(socket.id).emit("done");
	});
    // socket.on("starting-match",async(room)=>{
    //     io.to(room).emit("navigate-game");
    // });
    
    socket.on("login-check",async (roll,pwd)=>{
        // run = true;
        // run2=false;
        // run11=false;
        // run10=false;
        // run3=false;
        const user = await User.findOne({roll:roll,pwd:pwd});
        if(user!=null){
            await User.updateOne({roll:roll},{$set:{online:true,inwaiting:true,sockid:socket.id}});
            if(user.playhistory[user.playhistory.length-1]==="chess"){
                await waitingroom.updateOne({},{$push:{checker:roll}});
            }else{
                await waitingroom.updateOne({},{$push:{chess:roll}});
            }
            console.log("login")
            socket.emit("correct-login",roll,pwd);
            // const waiting = waitingroom.findOne({});
            // io.emit("update-waiting",waiting.chess,waiting.checker);
        }else{
            socket.emit("wrong-password");
        }
    })
    socket.on("new-user-joined", async (roll,room) => {
        // if(run2) return;
        // run2=true;
        // run=false;
        // run3=false;
		console.log("New user: ", roll);
		// await socket.join(room);
		const roomSize = await io.sockets.adapter.rooms.get(room).size;
		console.log(room + ":" + roomSize);
        io.to(room).emit("navigate-game");
	});
    let run11=false;
    socket.on("app-loaded",async(room)=>{
        // if(run11)return;
        // run11=true;
        io.to(room).emit("user-joined");
    })
    let run3=false;
    socket.on("get-opp",async (roll)=>{
        // if(run3) return;
        // run3=true;
        // jon=false;
        // console.log("getopp")
        const user = await User.findOne({ roll: roll });
        console.log("finding opponent");
        if(!user.inwaiting){
            const opp = await User.findOne({roll:user.opponenthistory[user.opponenthistory.length-1]});
            console.log("opponent found");
            await io.to(opp.sockid).emit("matched-opp",opp.opponenthistory[opp.opponenthistory.length-1],opp.roomNo,opp.playhistory[opp.playhistory.length-1])
            await socket.emit("matched-opp",user.opponenthistory[user.opponenthistory.length-1],user.roomNo,user.playhistory[user.playhistory.length-1]);
        }else{
            // run3=false;
            await socket.emit("matched-opp","nomatch","null","null");
        }
        const waiting = await waitingroom.findOne({});
        await io.emit("update-waiting",waiting.chess,waiting.checker);
    });
    // let run10=false;
    socket.on("waitload",async()=>{
        // if(run10)return;
        // run10=true;
        console.log("wait");
        const waiting = await waitingroom.findOne({});
        io.emit("update-waiting",waiting.chess,waiting.checker);
    })
    socket.on("leaverooom",async(roll,room)=>{
        console.log("user "+roll+" leaving room "+room);
        // console.log("leavingroom");
        await socket.leave(room);
    })
    // var jon = false;
    socket.on("joinroom",async (roll,room)=>{
        // if(jon) return;
        // jon=true;
        console.log("user "+roll+" joining room "+room);
        await socket.join(room);
    })
    socket.on("logout",async(roll)=>{
        // run3=false;
        console.log("logout");
        const user = await User.findOne({ roll: roll });
        if(!user.inwaiting){
            const opp = await User.findOne({ roll: user.opponenthistory[user.opponenthistory.length-1]});
            if(opp.playhistory[opp.playhistory.length-1]==="chess"){
                await waitingroom.updateOne({},{$push:{chess:opp.roll}});
            }else{
                await waitingroom.updateOne({},{$push:{checker:opp.roll}});
            }
            
            // await io.to(opp.sockid).emit("leaveroom")
            // await socket.leave(user.roomNo);
            
            await User.updateOne({roll:roll},{$pop:{opponenthistory:1,playhistory:1},$set:{inwaiting:false,online:false}});
            await User.updateOne({roll: opp.roll},{$pop:{opponenthistory:1,playhistory:1},$set:{inwaiting:true}});
            await io.to(user.roomNo).emit("leaveroom",user.roomNo);
            await io.to(opp.sockid).emit("get-opp",opp.roll);
            // await io.to(user.roomNo).emit("matched-opp","inwaiting",null,null);
        }else{
            await waitingroom.updateOne({},{$pull:{chess:roll,checker:roll}});
            await User.updateOne({roll:roll},{$set:{inwaiting:false,online:false}});
        }
        
        const waiting = await waitingroom.findOne({});
        await io.emit("update-waiting",waiting.chess,waiting.checker);
        await socket.emit("move-login");
    })
    socket.on("check-pair",async (roll) => {
        // if(run3) return;
        // run3=false;
        console.log("cp");
        const user = await User.findOne({ roll: roll });
        let lastplay = user.playhistory[user.playhistory.length-1];
        const waitroom = await waitingroom.findOne();
        let checkerwaiting = waitroom.checker;
        let chesswaiting = waitroom.chess;
        if(!user.inwaiting){
            io.emit("update-waiting",waitroom.chess,waitroom.checker);
            // io.emit("get-op",roll);
            return;
        }
        if(lastplay==="chess"){
            let size = chesswaiting.length;
            if(size===0){
                // run3=false;
                return;
            }
            let index = Math.floor(Math.random()*size);
            let opp = chesswaiting[index];
            await updateuser(roll,"connect4",opp,false,roll+opp);
            await updateuser(opp,"chess",roll,false,roll+opp);
            // checkerwaiting.splice(index,1);
            await waitingroom.updateOne({},{$pull:{chess:opp,checker:roll}});
        }else{
            let size = checkerwaiting.length;
            if(size===0){
                // run3=false;
                return;
            }
            let index = Math.floor(Math.random()*size);
            let opp = checkerwaiting[index];
            await updateuser(roll,"chess",opp,false,opp+roll);
            await updateuser(opp,"connect4",roll,false,opp+roll);
            // checkerwaiting.splice(index,1);
            await waitingroom.updateOne({},{$pull:{chess:roll,checker:opp}});
        }
        await socket.emit("get-opp",roll);
        // io.emit("update-waiting",waitroom.chess,waitroom.checker);
        // await io.emit("get-opp");
        // await io.emit("get-op",roll);
        // socket.emit("get-opp",roll);
        // if(!user.inwaiting){
        //     await io.to(socket.id).emit("room-final",user.roomNo,user.playhistory[user.playhistory.length-1]);
        // }
    });
});

const updateuser = async (roll,newplay,newopp,inwtng,roomno)=>{
    await User.updateOne({roll:roll},{$set:{inwaiting:inwtng,roomNo:roomno},$push:{playhistory:newplay,opponenthistory:newopp}})
}