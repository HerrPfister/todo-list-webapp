var express = require('express'),
	http = require('http'),
	path = require('path'),
	todo = require('./routes/tasks');

var app = express();

app.configure(function()
{
	app.set('port', 3000);
	app.use(express.static(path.join(__dirname, 'public')));
})

app.get('/list/tasks', todo.findAll)

http.createServer(app).listen(app.get('port'), function()
{
	console.log("Server listening on port " + app.get('port') + "...")
});