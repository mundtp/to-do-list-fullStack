import Backbone from 'backbone'

export const TaskModel = Backbone.Model.extend({
	url: "/api/tasks",
	idAttribute: "_id"
})

export const TaskCollection = Backbone.Collection.extend({
	model: TaskModel,
	url: "/api/tasks"
})