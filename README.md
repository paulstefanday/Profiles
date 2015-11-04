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

### TODO
- admin checks for organisation routes
- manage profile route via api keys https://github.com/thomseddon/koa-oauth-server
- get save user details route working under a few circumstances
- copy basic open source starter and make sure all the proper checks are setup
- get another node app saving data serverside via npm package
- get a frontend that lets you monitor activity
- add in tests and docs
- deploy app using elastic beanstalk
- get a cluster of rethinkdb going using docker in AWS
- get es6 features working using new node verion 4
- add activity routes
- add activity client


### Client
1. login
2. create organisation
3. create service keys for each platform

### Server
1. recieves valid user record from service
2. finds existing user by email
3. if new creates record
4. adds record to user history
5. returns condenced record with all data with profiles id


### SDK
1. add key
2. send data

### Checks
- Email
- First name, Last Name, IP
- First name, Last Name, Postcode

### What we do with incomplete records?
1. Store them in a bulk dump of records for querying in the future
2. 

### How do we condense profiles?
1. Merge records from the oldest to the newest so the last data is from the newest record
2. Allow for manual checking of records history with a visual comparison and selectable overides

### Questions
- Is it worth trying to validate profiles to use when confirming legal identity to add further validation to whatever action they were involved with?
