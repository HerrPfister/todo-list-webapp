var mongo = require('mongodb');
	Server = mongo.Server,
	DB = mongo.Db; //rename mongo objects for ease-of-access
	server = new Server('localhost', 27017, {auto_reconnect : true}); //setup a mongo server through port 27017, at 127.0.0.1
	db = new DB('taskdb', server); //set database name to 'taskdb', and use the above server object for any further connections to it


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
}); //try connecting to the database 'taskdb' through the server. If it fails, do nothing, else grab the collection 'tasks' in the database. If not created, create it.


exports.findAll = function(request, response)
{
	db.collection('tasks', function(err, collection)
	{
		collection.find().toArray(function(err, items)
		{
			response.send(items);
		});
	});
}; //Grab all items in 'tasks' collection located in the database. Then send them back as an array of items.


exports.addNew = function(request, response)
{
	var task = request.body;
	db.collection('tasks', function(err, collection)
	{
		collection.insert(task, {safe:true}, function(err,result){
			if(err)
			{
				response.send({'error':'An error has occured while trying to add new task.'});
			}
			else
			{
				console.log("ADD SUCCESS");
				response.send(result[0]);
			}
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
	}]; //JSON Objects

	db.collection('tasks', function(err, collection)
	{
		collection.insert(tasks, {safe:true}, function(err, result){});
	}); //Add the list of JSON objects to the collection
};