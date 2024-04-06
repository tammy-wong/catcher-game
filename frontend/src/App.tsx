import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartMenu from './views/StartMenu/StartMenu';
import Game from './views/Game/Game';
import LeaderBoard from './views/LeaderBoard/LeaderBoard';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartMenu />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/leaderboard" element={<LeaderBoard />}></Route>
        <Route path="*" element={<div>404 Page Not Found</div>}></Route>
      </Routes>
    </>
  );
};

export default App;