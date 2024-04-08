import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Game.css';
import API from '../../api';
import image_p1 from '../../assets/images/add/p1.png'
import image_p2 from '../../assets/images/add/p2.png'
import image_p3 from '../../assets/images/add/p3.png'
import image_p4 from '../../assets/images/add/p4.png'
import image_e1 from '../../assets/images/minus/e1.png'
import image_e2 from '../../assets/images/minus/e2.png'
import image_boat from '../../assets/images/boat.png'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const GameDuration = 60000;
const PlayerMovementAmount = 20;
const PlayerWidth = 50;
const PlayerHeight = 50; // Assuming a height for the player for collision detection
const ItemWidth = 30; // Assuming a width for the items
const ItemHeight = 30; // Assuming a height for the items
const ItemMovementAmount = 5;

// Define the types for your items
type ItemType = 'p1' | 'p2' | 'p3' | 'p4' | 'e1' | 'e2';

interface Item {
    type: ItemType;
    id: number;
    top: number;
    left: number; // Horizontal position
}

interface Player {
    left: number; // Horizontal position
}

const Game: React.FC = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const [timer, setTimer] = useState(GameDuration);
    const [score, setScore] = useState(0);
    const [items, setItems] = useState<Item[]>([]);
    const [player, setPlayer] = useState<Player>({ left: window.innerWidth / 2 - PlayerWidth / 2 });
    const [openDialog, setOpenDialog] = useState(true); // Dialog open state
    const [playerName, setPlayerName] = useState(''); // Player name input state
    const [showInput, setShowInput] = useState(false); // Show input field at the end of the game
    const navigate = useNavigate();

    let interval: NodeJS.Timeout;
    let itemInterval: NodeJS.Timeout;

    // Function to start the game
    const startGame = () => {
        setOpenDialog(false);
        setHasStarted(true);
        interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1000) {
                    clearInterval(interval);
                    clearInterval(itemInterval);
                    endGame();
                    return 0;
                }
                return prevTimer - 1000;
            });
        }, 1000);

        // Start dropping items
        itemInterval = setInterval(() => {
            const newItem: Item = {
                type: Math.random() < 0.7 ? `p${Math.ceil(Math.random() * 4)}` as ItemType : `e${Math.ceil(Math.random() * 2)}` as ItemType,
                id: Math.random(),
                top: -30,
                left: Math.random() * (window.innerWidth - 30), // Random horizontal position
            };
            setItems(prevItems => [...prevItems, newItem]);
        }, 1000);
    };

    // Function to handle player movement
    const movePlayer = (direction: 'left' | 'right') => {
        setPlayer(prevPlayer => {
            const newLeft = prevPlayer.left + (direction === 'left' ? -PlayerMovementAmount : PlayerMovementAmount);
            return {
                ...prevPlayer,
                left: Math.max(0, Math.min(window.innerWidth - PlayerWidth, newLeft)),
            };
        });
    };

    const moveItems = () => {
        setItems((prevItems) => {
            // Filter out items that have collided or moved off screen
            return prevItems
                .map((item) => {
                    // Move the item down
                    return { ...item, top: item.top + ItemMovementAmount };
                })
                .filter((item) => {
                    // Check for collision, keep the item if no collision and it's still on screen
                    return !checkCollision(item) && item.top < window.innerHeight;
                });
        });
    };

    // Function to end the game
    const endGame = () => {
        setHasStarted(false);
        setShowInput(true);
    };

    // Function to submit score
    const submitScore = async () => {
        try {
            await API.Game.end_game({ name: playerName, score: score })
            navigate('/leaderboard')
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    };

    const checkCollision = (item: any) => {
        // Check if the item is at the same height as the player
        if (item.top + ItemHeight >= window.innerHeight - PlayerHeight) {
            // Check if the item is within the horizontal range of the player
            if (item.left < player.left + PlayerWidth && item.left + ItemWidth > player.left) {
                // Collision detected, update the score
                if (item.type.startsWith('p')) {
                    setScore((prevScore) => prevScore + 50);
                } else {
                    setScore((prevScore) => prevScore - 100);
                }
                return true;
            }
        }
        return false;
    };

    const theme = useTheme();
    const matchesMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const dialogButtonSx = {
        fontSize: matchesSmallScreen ? '75px' : matchesMediumScreen ? '110px' : '150px'
    }

    const iconButtonSx = {
        fontSize: matchesSmallScreen ? '110px' : matchesMediumScreen ? '150px' : '200px',
        color: 'black'
    }

    const buttonSx = {
        fontSize: matchesSmallScreen ? '20px' : matchesMediumScreen ? '25px' : '30px'
    }

    useEffect(() => {
        if (hasStarted) {
            // Start an interval to move the items down the screen
            const moveItemsInterval = setInterval(moveItems, 50);
            return () => clearInterval(moveItemsInterval);
        }
    }, [hasStarted, player]);

    useEffect(() => {
        // When the component is unmounted, clear the intervals
        return () => {
            clearInterval(interval);
            clearInterval(itemInterval);
        };
    }, []);

    return (
        <div className="game-container">
            <Dialog
                maxWidth='md'
                fullWidth={true}
                fullScreen={matchesMediumScreen}
                open={openDialog}
            >
                <DialogTitle fontSize={36}>How to Play</DialogTitle>
                <DialogContent className='dialog-size'>
                    <DialogContentText>
                        <p className='p'>1. Control the boat to move left or right
                            <div className='guideline-image-container'>
                                <ArrowLeftIcon sx={{ ...dialogButtonSx }} />
                                <img className='guideline-boat' src={image_boat} alt='Boat' />
                                <ArrowRightIcon sx={{ ...dialogButtonSx }} />
                            </div>
                        </p>
                        <p className='p'>2. Catch below items
                            <span className='add'> + 50 points</span>
                        </p>
                        <div className='guideline-image-container'>
                            <img className='guideline-image' src={image_p1} alt='Add 1' />
                            <img className='guideline-image' src={image_p2} alt='Add 2' />
                            <img className='guideline-image' src={image_p3} alt='Add 3' />
                            <img className='guideline-image' src={image_p4} alt='Add 4' />
                        </div>
                        <br />
                        <p className='p'>3. Catch below items
                            <span className='minus'> - 100 points</span>
                        </p>
                        <div className='guideline-image-container'>
                            <img className='guideline-image' src={image_e1} alt='Minus 5' />
                            <img className='guideline-image' src={image_e2} alt='Minus 6' />
                        </div>
                        <p className='p'>4. You have
                            <span className='minus'> 60 seconds</span>.
                            Enjoy Your Game!
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ ...buttonSx, bgcolor: '#00A7D3', color: 'white' }} onClick={() => navigate('/')}>Menu</Button>
                    <Button sx={{ ...buttonSx, bgcolor: '#FE366F', color: 'white' }} onClick={startGame}>Start Game</Button>
                </DialogActions>
            </Dialog>
            <>
                <Button sx={{ ...buttonSx, bgcolor: '#00A7D3', color: 'white', marginRight: 'auto', marginBottom: 'auto' }} onClick={() => navigate('/')}>Menu</Button>
                <div className="timer">Time: {timer / 1000}</div>
                <div className="score">Score: {score}</div>
                <div className="controls">
                    <IconButton onClick={() => movePlayer('left')}>
                        <ArrowLeftIcon sx={{ ...iconButtonSx }} />
                    </IconButton>
                    <IconButton onClick={() => movePlayer('right')}>
                        <ArrowRightIcon sx={{ ...iconButtonSx }} />
                    </IconButton>
                </div>
            </>

            <div className="player" style={{ left: `${player.left}px` }} />

            {items.map((item) => (
                <div key={item.id} className={`item ${item.type}`} style={{ top: `${item.top}px`, left: `${item.left}px` }} />
            ))}

            {showInput && (
                <Dialog
                    maxWidth='md'
                    fullScreen={matchesMediumScreen}
                    open={showInput}
                >
                    <DialogTitle fontSize={36}>Game Over</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ fontSize: 'larger' }}>Your score: {score}</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter Your Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ ...buttonSx, color: 'white', bgcolor: '#00A7D3' }} onClick={submitScore}>Submit</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default Game;