import axios from 'axios';

const base = process.env.REACT_APP_API_URL;

const Game = {
    end_game: async (body: any) => axios.post(base+`/game/end`,body)
}

const LeaderBoard = {
    get_top: async () => axios.get(base+`/leaderboard`)
}

export default {
    Game,
    LeaderBoard
}