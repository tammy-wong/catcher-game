import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartMenu from './views/StartMenu/StartMenu';
import Game from './views/Game/Game';
import LeaderBoard from './views/LeaderBoard/LeaderBoard';
import './App.css'
import { socket } from './socket'

const App: React.FC = () => {
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  React.useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

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