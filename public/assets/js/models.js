var Todo = Backbone.Model.extend(
{

	defaults: 
	{
		date: new Date(),
		completed: false,
		content: 'Nothing to do...'
	},
	initialize: function(input)
	{
		//constructor
		this.set({'content': input}, {validate: true});
		console.info("CREATION: TODO");

		this.on("change:content", function()
		{
			console.log("Content change to: " + this.get("content"))
		});
	},
	validate: function(attrs)
	{
		if(!attrs.content)
		{
			console.error("ERROR: CANNOT SET CONTENT OF TODO TO AN EMPTY TASK");
			return "ERROR: EMPTY INPUT";
		}
	},
	print: function()
	{
		if(this.get('content'))
		{
			console.log(this.get('content') + " on " + this.get('date').toString())
			console.log("Completed: " + this.get('completed'));
		}
	}

});