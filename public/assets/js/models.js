var Todo = Backbone.Model.extend(
{
	idAttribute: '_id',

	defaults: 
	{
		date: new Date(),
		completed: false,
		content: 'Nothing to do...'
	},
	initialize: function(input)
	{
		console.info("CREATION: TODO");

		console.log(JSON.stringify(this));

		this.set('url', '../tasks/' + this.get('_id'));

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
	}
});
