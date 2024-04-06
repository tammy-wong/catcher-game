import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface PlayerScore {
    name: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    const [scores, setScores] = useState<PlayerScore[]>([]);
    const location = useLocation();
    const { score } = location.state || { score: null };

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('URL_TO_YOUR_BACKEND/leaderboard');
                setScores(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard scores', error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div>
            <h1>Leaderboard</h1>
            {score !== null && <p>Your score: {score}</p>}
            <ol>
                {scores.map((player, index) => (
                    <li key={index}>{player.name} - {player.score}</li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;