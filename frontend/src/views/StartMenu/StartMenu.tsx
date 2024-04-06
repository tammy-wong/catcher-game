import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartMenu.css';

const StartMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="start-menu">
      <h1 className="start-menu-title">Welcome to the Catch Game!</h1>
      <button className="start-menu-button" onClick={() => navigate('/game')}>
        Start Game
      </button>
      <button className="start-menu-button" onClick={() => navigate('/leaderboard')}>
        Leaderboard
      </button>
    </div>
  );
};

export default StartMenu;