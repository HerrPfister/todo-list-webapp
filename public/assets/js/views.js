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
    this.remove(this.$('label'));
    if(this.$(".task-title").attr('class').contains("completed"))
    {
      Backbone.actionSub.trigger("unfinished", this.model);
    }
    else
    {
      Backbone.actionSub.trigger("finished", this.model); //Throw custom event
    }
  },
});


var TrashView = Backbone.View.extend(
{
  tagName: 'ul',

  className: "list-group",

  trash_template: _.template($("#tmpl-list-body").html()),

  initialize:function()
  {
    Backbone.actionSub.on("finished", this.addItem, this); //Tie a custom listener to view, and listen for custom event "throw-away"
  },

  render:function()
  {
    console.info("CREATION: TRASH-VIEW");
    this.$el.append(this.trash_template({titleName: "Completed"}));
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
    Backbone.actionSub.on("unfinished", this.addItem, this); //Tie a custom listener to view, and listen for custom event "throw-away"
  },

  render:function()
  {
    this.$el.append(this.todo_template({titleName: "Todo List"}));

    _.each(this.model.models, 
      function(todo)
      {
        this.$el.append(new TodoItemView({model:todo}).render().el);
      }, 
      this); //Goes through each model in the collection that was passed in, and creates a TodoItem view for them.

    return this;
  },

  addItem:function(item)
  {
    this.$el.append(new TodoItemView({model: item}).render().el);
    console.log("RESTORED");
  }
});
