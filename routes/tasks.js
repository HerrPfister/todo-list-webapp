var mongo = require('mongodb');
	Server = mongo.Server,
	DB = mongo.Db, //rename mongo objects for ease-of-access
	BSON = mongo.BSONPure;
	server = new Server('localhost', 27017, {auto_reconnect : true}), //setup a mongo server through port 27017, at 127.0.0.1
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


exports.addNewTask = function(request, response)
{
	var task = request.body;

	console.log("ADDING: " + JSON.stringify(task));

	db.collection('tasks', function(err, collection)
	{
		collection.insert(task, {safe:true}, function(err,result){
			if(err)
			{
				console.error("ERROR: CREATE");
				response.send({'ERROR':'PROBLEM CREATING'});
			}
			else
			{
				response.send(result[0]);
			}
		});
	});	
};

exports.updateTask = function(request, response)
{
	var id = request.params.id;
	var task = request.body;
	delete task._id;

	console.log("UPDATING: " + JSON.stringify(task));

	db.collection('tasks', function(err,collection)
	{
		collection.update({'_id' : new BSON.ObjectID(id)}, task, {safe:true}, function(err, result)
		{
			if(err)
			{
				console.error("ERROR: UPDATE");
				response.send({'ERROR' : 'PROBLEM UPDATING'});
			}
			else
			{
				response.send(task);
			}
		});
	});
};

exports.removeTask = function(request, response)
{
	var id = request.params.id;

	db.collection('tasks', function(err, collection){
		collection.remove({'_id' : new BSON.ObjectID(id)}, {safe : true}, function(err, result){
			if(err)
			{
				console.error("ERROR: DELETE");
				response.send({'ERROR' : 'PROBLEM DELETING'});
			}
			else
			{
				response.send(request.body);
			}
		});
	});
};

var populateDB = function()
{
	var tasks = [
	{
		date: new Date(),
		content: "Cook dinner."
	},
	{
		date: new Date(),
		content: "Clean room."
	},
	{
		date: new Date(),
		content: "Learn backbone.js!"
	}]; //JSON Objects

	db.collection('tasks', function(err, collection)
	{
		collection.insert(tasks, {safe:true}, function(err, result){});
	}); //Add the list of JSON objects to the collection
};