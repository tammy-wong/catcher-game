# APIs Description
## GET `api/leaderboard`
- Purpose: Get top 100 players for Leaderboard page
- Response:
  ```
  [
    {
      "id": number,
      "name": string,
      "score": number,
      "createdAt": Date,
      "rank": number
    },
    {
    ...
    },
    ...
  ]
  ```

## POST `api/game/end`
- Purpose: Submit the username and score after game
- Request:
  ```
  {
    "name": string,
    "score": number
  }
  ```
