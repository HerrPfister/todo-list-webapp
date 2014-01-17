Backbone.actionSub = _.extend({}, Backbone.Events); //Adds custom namespace to Backbone events class


var TodoItemView = Backbone.View.extend(
{

  tagName: 'li',

  className: "list-group-item",

  my_template: _.template($("#tmpl-list").html()), //Used to set the template for the view (created in HTML doc)

  events: //Event listeners for this particular view { "event" : "function to call" }
  {
    "click" : "toggleComplete"
  },

  render: function()
  {
    this.$el.html(this.my_template(this.model.toJSON())); //Passing in the JSON form of the model, so backbone can figure out what is needed for template variables
    return this; //This makes the view reusable (sub-view)
  },

  toggleComplete:function()
  {

    this.model.set('completed', !this.model.get('completed'));
    this.model.save(null, {wait:true}, {
      success: function(updatedModel){
        console.info(JSON.stringify(updatedModel));
      }
    });

    this.remove(this.$('label'));

    (this.$(".task-title").attr('class').contains("completed")) ? Backbone.actionSub.trigger("unfinished", this.model) : Backbone.actionSub.trigger("finished", this.model);

  },
});


var TrashView = Backbone.View.extend(
{
  tagName: 'ul',

  className: "list-group",

  trash_template: _.template($("#tmpl-list-body").html()),

  initialize:function()
  {
    console.info("CREATION: TRASH-VIEW");
    Backbone.actionSub.on("finished", this.addItem, this); //Tie a custom listener to view, and listen for custom event "throw-away"
  },

  render:function()
  {
    this.$el.append(this.trash_template({titleName: "Completed"}));
    _.each(this.model.models, 
      function(todo)
      {

        if(todo.get('completed'))
        {
          console.log(todo.get('completed'));
          this.$el.append(new TodoItemView({model:todo}).render().el);
        }
      }, 
      this); //Goes through each model in the collection that was passed in, and creates a TodoItem view for them.

    return this;
  },

  addItem:function(item)
  {
    this.$el.append(new TodoItemView({model: item}).render().el);
    this.$(".task-title").addClass("completed");
    console.log("TRASHED");
  },
});


var TodoView = Backbone.View.extend(
{
  tagName: 'ul',

  className: "list-group",

  todo_template: _.template($("#tmpl-list-body").html()),

  initialize:function()
  {
    console.info("CREATION: TODO-VIEW");
    Backbone.actionSub.on('task_added', this.addItem, this);
    Backbone.actionSub.on("unfinished", this.addItem, this); //Tie a custom listener to view, and listen for custom event "throw-away"
  },

  render:function()
  {
    this.$el.append(this.todo_template({titleName: "Todo List"}));

    _.each(this.model.models, 
      function(todo)
      {
        if(!todo.get('completed'))
          this.$el.append(new TodoItemView({model:todo}).render().el);
      }, 
      this); //Goes through each model in the collection that was passed in, and creates a TodoItem view for them.

    return this;
  },

  addItem:function(item)
  {
    this.$el.append(new TodoItemView({model: item}).render().el);
  }
});


var AddFormView = Backbone.View.extend({
  add_template: _.template($("#tmpl-form").html()),

  className: "list-group",

  events:
  {
    "click #addButton" : "addNewTask"
  },

  render:function()
  {
    this.$el.append(this.add_template(
    {
      textFieldID: "addTextField",
      textFieldName: "task[content]",
      textFieldHint: "Add new task here!",
      buttonID: "addButton",
      buttonURL: "#",
      buttonText: "Add Task"
    }));

    return this;
  },

  addNewTask:function()
  {
    var task = this.model.create({
      date: new Date(),
      completed: false,
      content: $("#addTextField").val()
    }, {wait:true}); //Create will create a new model, connect to the database, try adding it to the database and then either add to the client side collection or not.

    $("#addTextField").val("");

    Backbone.actionSub.trigger("task_added", task);

    return task;
  }
});
