# ChessVsConnect4
Game is played using chess and connect4 pieces. One player moves chess pieces and the other drops connect4 coins to make 4 in row, column or diagonal. The chess is modified to have knights in place of rooks and rooks in 7th rank in the middle

![image](https://github.com/Utkarsh-ver/ChessVsConnect4/assets/69287543/7f75774e-fd63-4741-a8fe-f54c4caee8a1)


## How does it work
### Frontend
Frontend is coded in React and communication between two players is done through Socket.IO through its server.

### Backend
Backend is coded in Node.js and all win history and side history is stored in MongoDB server using mongoose.

## Getting Started
### Installation
Clone the repo and the submodules

```
git clone --recurse-submodules https://github.com/Utkarsh-ver/ChessVsConnect4.git
```

Install the requirements
in chessvsconnect4 and server folder run
```
npm install
```
change the mongodb server by changing dbURI value in server.js file

### Usage
To start the game:
in server folder run
```
node server.js
```
in new terminal open chessvsconnect4 directory and run
```
npm start
```
