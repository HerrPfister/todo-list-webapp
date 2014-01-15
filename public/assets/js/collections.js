var TodoCollection = Backbone.Collection.extend(
{
  model: Todo,
  url: "/list/tasks" //Supply the table/collection in the mongo database
});
