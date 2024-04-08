# A Catch Game Web Application

## Contents
- [Background](https://github.com/tammy-wong/catcher-game/new/master?filename=README.md#background)
- [About](https://github.com/tammy-wong/catcher-game/new/master?filename=README.md#about)
- [Setup Guide](https://github.com/tammy-wong/catcher-game/new/master?filename=README.md#setup-guide)

## Background
You are required to develop a catch game and display the top players score on the leaderboard web application. You are also required to set up a mechanism to store the user data and score.
The requirement of each application is displayed in the following:
1. Catch game web application
   1. The game displays the start menu. There will be 2 options: Start Game and Leaderboard
   2. The game only lasts for 60 seconds.
   3. The user is able to move the catcher left or right to catch the items
   4. The items drop from top to bottom
   5. Catching the image (p1-p4) in the assets pack add 50 points
   6. Catching the image (e1-e2) in the assets pack minus 100 points
   7. Once the game is finished, the user can input the name and see the ranking
3. Leaderboard web application
   1. The application will display the top 100 players in real time.
   2. Each rank shows the player’s score and name.

## About
The application is using ReactJS for frontend, NestJS for backend, MariaDB as database and TypeORM for object-relational mapping.

## Setup Guide
1. Database setup
   1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   2. Search "MariaDB" in Docker Desktop
   3. Choose "latest" tag for maraidb and run
   4. Expand optional settings
      1. Input a "Host port" number or enter "0" to assign randomly generated host ports
      2. Environment variables: "Variable": "MARIADB_ROOT_PASSWORD", "Value": "YOUR_PASSWORD"
   5. Check whether your MaraiDB container is running in Containers page of Docker Desktop
   6. Use your database tool (e.g. DBeaver) to connect your MariaDB
      1. Choose MaraiDB
      2. Server Host: localhost
      3. Port: input the "Host port" number set in step(iv.a)
      4. Username: root
      5. Password: "YOUR_PASSWORD" in step(iv.b)
   7. Create database in MariaDB
      1. Database name: "catcher-game"
      2. Charset: "utf8mb4"
      3. Collation: "utf8mb4_general_ci"
2. Frontend & Backend setup
   1. `git clone https://github.com/tammy-wong/catcher-game.git`
   2. Backend environment
      1. `cd backend`
      2. `yarn install`
      3. Set .env file to
         ```
         # Server
         NODE_ENV = production
         PORT = 3001
         
         # Database
         DB_TYPE = mariadb
         DB_HOST = localhost
         DB_PORT = YOUR_DB_PORT
         DB_USER = root
         DB_PASSWORD = YOUR_PASSWORD
         DB_NAME = catcher-game
         DB_CHARSET = utf8mb4_general_ci
         ```
      4. Run backend `yarn start`
   3. Frontend environment
      1. `cd frontend`
      2. `yarn install`
      3. Set .env file to
         ```
         REACT_APP_API_URL=http://localhost:3001/api
         ```
      4. Run frontend `yarn start`
3. Enjoy your game~ http://localhost:3000
