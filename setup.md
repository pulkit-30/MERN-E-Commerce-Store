## To setup this Project on your local System follow these Steps:-

- Clone the Git repository

A. Setting up the Client Folder (React)

- open terminal
- cd client/
- run `npm i`to install node modules
- run `npm start` to start the dev server

B. Setting up the Server Folder(Api)

- open terminal
- cd server/
- run `npm i` to install node Modules
- create a `.env` file
- Add these keys to env file
  - DB*SERVER=/\_Your Mongoose Server connection URl*/
  - ACCESS*TOKEN_KEY=/\_Unique Token Key*/
  - REFRESH*TOKEN_KEY=/\_Unique Token Key*/
  - SaltRounds=10
  - UserEmail= /\_Your Gamil Id\*/
  - UserPassword= /\_Your Gmail Account Password\*/
  - Host=smtp.gmail.com
  - Service=gmail

* run `npx nodemon` to start the backend server //server will listen at port _80_
