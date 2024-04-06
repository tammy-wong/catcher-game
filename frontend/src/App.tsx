import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import StartMenu from './views/StartMenu/StartMenu';
import LeaderBoard from './views/LeaderBoard/LeaderBoard';
import Game from './views/Game/Game';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartMenu />}></Route>
        <Route path="/leaderboard" element={<LeaderBoard />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="*" element={<div>404 Page Not Found</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
