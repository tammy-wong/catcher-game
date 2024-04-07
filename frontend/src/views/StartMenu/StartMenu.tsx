import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import './StartMenu.css';

const StartMenu: React.FC = () => {
    const navigate = useNavigate();
    const matchesSmallScreen = useMediaQuery('(max-width:480px)');
    const matchesMediumScreen = useMediaQuery('(max-width:768px)');

    const buttonSx = {
        fontSize: matchesSmallScreen ? '1.2rem' : matchesMediumScreen ? '1.5rem' : '2rem',
        padding: matchesSmallScreen ? '12px 24px' : matchesMediumScreen ? '14px 28px' : '16px 32px',
        margin: '10px 0',
        borderRadius: '20px', // More rounded buttons
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            backgroundColor: '#e0e0e0',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
        },
    };

    return (
        <div className="start-menu">
            <h1 className="start-menu-title">
                Welcome to the Catch Game!
            </h1>
            <Button
                variant="contained"
                sx={{ ...buttonSx, bgcolor: '#FE366F', color: 'white' }}
                onClick={() => navigate('/game')}
            >
                Play Game
            </Button>
            <Button
                variant="contained"
                sx={{ ...buttonSx, bgcolor: '#00A7D3', color: 'white' }}
                onClick={() => navigate('/leaderboard')}
            >
                Leaderboard
            </Button>
        </div>
    );
};

export default StartMenu;