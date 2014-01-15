var TodoRouter = Backbone.Router.extend(
{

	routes:
	{
		"*path" : "loadPage"
	},

	loadPage:function()
	{
		var cook = new Todo("Cook Dinner");
		var clean = new Todo("Clean Bedroom");
		var trash = new Todo("Take Out the Trash");

		var test = new Todo("This is a test");
		test.set('content', '', {validate: true}); //The validate option needs to be added to set; validation occurs automatically only with save
		test.print();


		var todos = new TodoCollection();
		todos.add(cook);
		todos.add(clean);
		todos.add(trash);


		var todoView = new TodoView({model: todos});
		$("#list-items").html(todoView.render().el);

		var trashView = new TrashView();
		$("#trash-items").html(trashView.render().el);

	}

});