import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './LeaderBoard.css';
import MUIDataTable from "mui-datatables";

interface PlayerScore {
    name: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    const [scores, setScores] = useState<PlayerScore[]>([]);
    const location = useLocation();
    const { score } = location.state || { score: null };

    const columns = [
        {
            name: "rank",
            label: "Rank",
            options: {
                filter: false,
                sort: true,
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
            name: "company",
            label: "Company",
            options: {
                filter: false,
                sort: false,
            }
        },
    ];

    const data = [
        { name: "Joe James", company: "Test Corp" },
        { name: "John Walsh", company: "Test Corp" },
        { name: "Bob Herm", company: "Test Corp" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
        { name: "James Houston", company: "Test Co" },
    ];

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
        <div className='leaderboard'>
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