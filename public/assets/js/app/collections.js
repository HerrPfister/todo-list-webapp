var TodoCollection = Backbone.Collection.extend(
{
  model: Todo,
  url: "/tasks" //Supply the table/collection in the mongo database
});
