Backbone.actionSub = _.extend({}, Backbone.Events); //Adds custom namespace to Backbone events class


var TodoItemView = Backbone.View.extend(
{

  tagName: 'li',

  className: "list-group-item",

  my_template: _.template($("#tmpl-list").html()), //Used to set the template for the view (created in HTML doc)

  events: //Event listeners for this particular view { "event" : "function to call" }
  {
    "dblclick" : "completeTask",
    "mouseenter" : "toggleEdit",
    "mouseleave" : "toggleEdit"
  },

  initialize:function()
  {
    this.model.on("change", this.render, this);
  },

  render: function()
  {
    if(!this.model.validationError)
      this.$el.html(this.my_template(this.model.toJSON())); //Passing in the JSON form of the model, so backbone can figure out what is needed for template variables
    return this; //This makes the view reusable (sub-view)
  },

  toggleEdit: function()
  {
    var label = this.$('label');
    var input = this.$('input');

    if(!label.attr('class').contains("hidden"))
      label.fadeToggle('fast').addClass('hidden').siblings('input').fadeToggle('fast').removeClass('hidden');
    else
    {
      var contentUpdate = input.val();

      input.fadeToggle('fast').addClass('hidden').siblings('label').fadeToggle('fast').removeClass('hidden');

      this.model.set('content', contentUpdate, {validate:true});
      this.model.save(null,{
        success:function()
        {
          console.log("SUCCESS: UPDATE");
        },
        error:function(){
          console.error("ERROR: UPDATE");
        }
      });

      input.val('');
    }
  },

  completeTask:function()
  {
    this.$el.slideToggle(1000);
    this.model.destroy(
    {
      success: function()
      {
        console.info("SUCCESS: DELETE");
      },
      error:function()
      {
        console.error("ERROR: DELETE");
      }
    });
  }
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
  },

  render:function()
  {
    this.$el.append(this.todo_template({titleName: "Todo"}));

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
      textFieldHint: "What do you need to do?",
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
