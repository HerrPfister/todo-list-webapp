var TodoRouter = Backbone.Router.extend(
{

	routes:
	{
		"" : "home"
	},

	home:function()
	{
		var todos = new TodoCollection();

		todos.fetch({success:function(){
			var todoView = new TodoView({model: todos});
			$("#list-items").html(todoView.render().el);
		}});

		var trashView = new TrashView();
		$("#trash-items").html(trashView.render().el);

		var addFormView = new AddFormView({model: todos}); //Pass in collection so that it can be referanced when the button in the view is clicked
		$("#add-field").html(addFormView.render().el);
	}
});