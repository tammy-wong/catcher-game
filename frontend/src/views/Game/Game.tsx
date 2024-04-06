import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game.css'; // Make sure to create a Game.css file for styling

type ItemType = 'p1' | 'p2' | 'p3' | 'p4' | 'e1' | 'e2';

interface Item {
    type: ItemType;
    position: {
        x: number;
        y: number;
    };
}

const Game = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState<number>(0);
    const [playerPosition, setPlayerPosition] = useState<number>(50);
    const [items, setItems] = useState<Item[]>([]);
    const gameDuration = 60000; // 60 seconds
    const itemTypes: ItemType[] = ['p1', 'p2', 'p3', 'p4', 'e1', 'e2'];

    const movePlayer = useCallback((event: { key: string; }) => {
        if (event.key === 'ArrowLeft') {
            setPlayerPosition((prev) => Math.max(prev - 10, 0));
        } else if (event.key === 'ArrowRight') {
            setPlayerPosition((prev) => Math.min(prev + 10, 100 - 10)); // Adjusted to prevent the player from going off screen
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', movePlayer);

        return () => window.removeEventListener('keydown', movePlayer);
    }, [movePlayer]);

    useEffect(() => {
        // Function to generate a random item at a random position
        const generateItem = () => {
            const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            const position = { x: Math.random() * 100, y: 0 }; // Random x position, start from y = 0
            return { type, position };
        };

        // Start generating items
        const itemGenerationInterval = setInterval(() => {
            setItems((prevItems) => [...prevItems, generateItem()]);
        }, 2000); // Adjust interval to control the rate of item generation

        // Start the game timer
        const timerId = setTimeout(() => {
            clearInterval(itemGenerationInterval);
            navigate('/leaderboard', { state: { score } });
        }, gameDuration);

        return () => {
            clearInterval(itemGenerationInterval);
            clearTimeout(timerId);
        };
    }, [navigate, score]);

    // Function to check for catches and update the score
    useEffect(() => {
        const dropInterval = setInterval(() => {
            setItems((prevItems: any) => {
                return prevItems.map((item: any) => {
                    // Move item down
                    const newY = item.position.y + 5;
                    let newScore = score;

                    // Check if the item is at the catcher level
                    if (newY >= 90) { // Assuming 90 is the y position of the catcher
                        // Check if the item is within the horizontal range of the catcher
                        if (item.position.x >= playerPosition && item.position.x <= playerPosition + 10) {
                            // Update score based on item type
                            if (item.type.startsWith('p')) {
                                newScore += 50;
                            } else if (item.type.startsWith('e')) {
                                newScore -= 100;
                            }
                            setScore(newScore);
                            return null; // Remove caught item
                        }
                    }

                    // Return item with updated position if not caught, or null if caught/out of bounds
                    return newY > 100 ? null : { ...item, position: { ...item.position, y: newY } };
                }).filter(Boolean); // Remove nulls (caught or out of bounds items)
            });
        }, 100); // Adjust interval for drop speed

        return () => clearInterval(dropInterval);
    }, [score, playerPosition]);

    // Render the game UI
    return (
        <div className="game-container">
            <h1>Catch the items!</h1>
            <p>Score: {score}</p>
            <div className="player" style={{ left: `${playerPosition}%` }}>
                {/* Player character image */}
            </div>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`item ${item.type}`}
                    style={{ left: `${item.position.x}%`, top: `${item.position.y}%` }}
                >
                    {/* Item image based on type */}
                </div>
            ))}
        </div>
    );
};

export default Game;