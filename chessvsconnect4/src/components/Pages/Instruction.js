import React from 'react';
import './FusionGridGame.css';
import { useNavigate } from 'react-router-dom';

const FusionGridGame = ()=> {
const navigate = useNavigate();
  const startGame = () => {
    
    navigate('/home');

    };

  return (
    <div className="container">
      <h1 id="top">Fusion Grid Game Instructions</h1>

      <p className="normal">Welcome to the exciting world of Fusion Grid! In this unique game, the classic games of Chess and Connect 4 collide. The challenge is set: Can Connect 4 achieve victory by connecting four pieces vertically, horizontally, or diagonally within 15 moves, or will Chess foil their plans?</p>

      <h2>Objective</h2>
      <p className="normal">Your mission, Connect 4, is to strategically place your pieces on the grid in such a way that you can connect four of them in a row, column, or diagonal. Chess, on the other hand, must prevent Connect 4 from achieving this goal by strategically placing their pieces to block potential connections.</p>

      <h2>Fusion Grid Rules</h2>
      <h3>Connect 4 Constraints</h3>
      <ul className="normal">
        <li>You have 15 moves to connect four of your pieces.</li>
        <li>You cannot drop a piece in the same column as your previous move.</li>
      </ul>

      <h3>Chess Constraints</h3>
      <ul className="normal">
        <li>Chess must play defensively to prevent Connect 4 from winning.</li>
        <li>Follow the normal rules of Chess for piece movement.</li>
        <li>There's no checkmate or stalemate; the goal is to stop Connect 4.</li>
      </ul>

      <div className="start-button">
        <button id="startBtn" onClick={startGame}>Begin Battle</button>
      </div>
    </div>
  );
}

export default FusionGridGame;
