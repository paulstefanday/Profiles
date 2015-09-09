# Profiles
<img src="https://circleci.com/gh/paulstefanday/Profiles/tree/master.svg?style=svg" />


### What will profiles do?
Receives profile information and creates a new user or adds information to an existing one, then returns a unique ID to be attached to other services database records.

Allows you to do advanced demographic querying outputting unique id's which can then be used to search other services that have those id's assosiated.

### Setup
1. Rethinkdb with homebrew: brew update && brew install rethinkdb</li>
2. Nodejs: <a href="https://nodejs.org/download/">https://nodejs.org/download/</a>

### Run
1. sudo npm install
2. rethinkdb
3. npm start
4. npm test
5. npm run docs
6. RethinkDB admin panel: <a href="http://localhost:8080/">http://localhost:8080/</a> 

### Tech
1. Koa
2. Rethinkdb
3. <a href="https://github.com/apidoc/apidoc">apiDoc</a>
4. Mandrill

### TODO:
- get client loading within same repo
- get save user details route working under a few circumstances
- copy basic open source starter and make sure all the proper checks are setup
- get another node app saving data serverside via npm package
- manage services via api keys
- get a frontend that lets you monitor activity
- add in tests and docs
- get a cluster of rethinkdb going using docker in AWS
