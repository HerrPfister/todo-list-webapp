var Todo = Backbone.Model.extend(
{
	idAttribute: '_id',

	defaults: 
	{
		date: new Date(),
		content: 'Nothing to do...'
	},
	initialize: function(input)
	{
		this.set('url', '../tasks/' + this.get('_id'));
	},
	validate: function(attrs)
	{
		if(!attrs.content)
		{
			return true;
		}
		return false;
	}
});
