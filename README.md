<h1>Profiles</h1>
[![Circle CI](https://circleci.com/gh/paulstefanday/Profiles.svg?style=svg)](https://circleci.com/gh/paulstefanday/Profiles)

<h3>What will profiles do?</h3>
<p>Receives profile information and creates a new user or adds information to an existing one, then returns a unique ID to be attached to other services database records.</p>

<p>Allows you to do advanced demographic querying outputting unique id's which can then be used to search other services that have those id's assosiated.</p>

<h3>Setup:</h3>
<ol>
	<li>Rethinkdb with homebrew: brew update && brew install rethinkdb</li>
	<li>Nodejs: <a href="https://nodejs.org/download/">https://nodejs.org/download/</a></li>
</ol>

<h3>Run:</h3>
<ul>
	<li>1. sudo npm install</li>
	<li>2. rethinkdb</li>
	<li>npm start</li>
	<li>npm test</li>
	<li>npm run docs</li>
	<li>RethinkDB admin panel: <a href="http://localhost:8080/">http://localhost:8080/</a> </a>
</ul>

<h3>Tech:</h3>
<ul>
	<li>Koa</li>
	<li>Rethinkdb</li>
	<li><a href="https://github.com/apidoc/apidoc">apiDoc</a></li>
	<li>Mandrill</li>
</ul>

<h3>Docs:</h3>
