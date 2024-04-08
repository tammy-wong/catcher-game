import React, { useState, useEffect } from 'react';
import './LeaderBoard.css';
import MUIDataTable from "mui-datatables";
import API from '../../api';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';

interface PlayerData {
    rank: number;
    name: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    const [data, setData] = useState<PlayerData[]>([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const buttonSx = {
        fontSize: matchesSmallScreen ? '20px' : matchesMediumScreen ? '25px' : '30px'
    }
    const columns = [
        {
            name: "rank",
            label: "Rank",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "score",
            label: "Score",
            options: {
                filter: false,
                sort: false,
            }
        },
    ];

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await API.LeaderBoard.get_top()
                    setData(response.data);
                } catch (error) {
                    console.error('Error fetching leaderboard scores', error);
                }
            };

            fetchScores();
        }, []);

    socket.on('newPlayer', (data: PlayerData[]) => {
        setData(data)
    })

    return (
        <div className='leaderboard'>
            <Button sx={{ ...buttonSx, bgcolor: '#00A7D3', color: 'white', marginRight: 'auto', marginBottom: 'auto' }} onClick={() => navigate('/')}>Menu</Button>
            <h1 className="leaderboard-title">
                Leader Board
            </h1>
            <MUIDataTable
                title={"Top 100 Player"}
                data={data}
                columns={columns}
                options={{
                    selectableRows: "none",
                    rowsPerPage: 7,
                    rowsPerPageOptions: [10],
                    download: false,
                    print: false,
                    responsive: "standard",
                    search: false,
                    filter: false,
                    viewColumns: false
                }}
            />
        </div>
    );
};

export default Leaderboard;