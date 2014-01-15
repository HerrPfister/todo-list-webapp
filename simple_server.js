var express = require('express'),
	http = require('http'),
	path = require('path'),
	todo = require('./routes/tasks'); //These are requirements that need to be met by the server (it is similar to importing libraries)

var app = express(); //Express is a node module that does all the tedious work of setting up a http server

app.configure(function()
{
	app.set('port', 3000); //set the port to 3000
	app.use(express.static(path.join(__dirname, 'public'))); //set the file dir for all static files (html, etc)
})

app.get('/list/tasks', todo.findAll) //When the url here is appendedm, the findAll function is called in the tasks.js file

http.createServer(app).listen(app.get('port'), function()
{
	console.log("Server listening on port " + app.get('port') + "...")
}); //This will start up the server and (if successful) print out the above to the console