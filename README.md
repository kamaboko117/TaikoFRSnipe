<p align="center">
  <img height="200" src="https://github.com/kamaboko117/TaikoFRSnipe/assets/48692472/3d86b18a-2896-4a9f-ad9d-613ec85877ec">
</p> 
<p align="center">
The ultimate place to let your malevolence get the best of you
</p>
<p align="center">
Website can be found at <a href="https://malveillance.kmbk.fr">https://malveillance.kmbk.fr</a>
</p>

***
![Screenshot_1](https://github.com/kamaboko117/TaikoFRSnipe/assets/48692472/5d644ffe-5367-4515-b616-136893ae0045)
***

About
================================
malveillance.kmbk.fr is a website to track top #1 French scores in osu!taiko leaderboards. the aim is to give an incentive for french players for going for French #1 scores and to give some more insights, such as a player Hall of Fame and random stats.

Project Structure
================================
- FRONTEND: React with Typescript
- BACKEND: Nestjs with Typescript using TypeORM
- DATABASE: postgres
- SERVER REVERSE PROXY: NGINX (local only. website is hosted on heroku and uses their server)

Everything is bundled using docker with docker-commpose.

RUN
```
docker-compose up --build
```
in the root of the project to run a local version of the website. Of course, you will need docker and docker-compose to do that.

you will also need to setup a .env with the required variables. You can rename the `example.env` file to `.env` but you will still need to change some values:

Key | Value 
:---: | :---: 
`COOKIE=` | This is the session cookie from the account that will be used to scrap the data
`SECRET=` | This is your osu api secret
`ID=` | This is your osu api client id

you can run 
```
cd requirement/backend/src
npm run load-dump
```
to hydrate your local database

The app should start running on http://localhost:3000

⚠️ ATTENTION WINDOWS USERS ⚠️
===============================
Make sure you configure git with 
```
git config --global core.autocrlf false
``` 
if it isn't already done, else the dockerfile scripts cannot work correctly. We recommend using WSL to avoid such issues !

Contact
===============================
just use Discord => i have disabled friend request because of the bots but you can just join my [server](https://discord.gg/Fu9PTJ4), or any other osu!taiko related server really, and ping me there
