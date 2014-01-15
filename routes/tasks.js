var mongo = require('mongodb');

var Server = mongo.Server,
	DB = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect : true});
var db = new DB('taskdb', server);

db.open(function(err, db)
{
	if(!err)
	{
		console.log("Connected to 'taskdb' database");
		db.collection('tasks', {strict:true}, function(err,collection)
		{
			if(err)
			{
				console.log("The 'tasks' collection doesn't exist! Creating it ...");
				populateDB();
			}
		});
	}
});

exports.findAll = function(request, response)
{
	db.collection('tasks', function(err, collection)
	{
		collection.find().toArray(function(err, items)
		{
			response.send(items);
		});
	});
};

var populateDB = function()
{
	var tasks = [
	{
		date: new Date(),
		completed: false,
		content: "Cook dinner."
	},
	{
		date: new Date(),
		completed: false,
		content: "Clean room."
	},
	{
		date: new Date(),
		completed: false,
		content: "Learn backbone.js!"
	}];

	db.collection('tasks', function(err, collection)
	{
		collection.insert(tasks, {safe:true}, function(err, result){});
	});
};