import ReactDOM from 'react-dom'
import React from 'react'
import Backbone from 'backbone'
import HomeView from './HomeView'
import {TaskCollection} from './models.js'



const app = function() {


    var TaskRouter = Backbone.Router.extend({
		routes: {	
			"*catchall": "showHomeView"
		},

		showHomeView: function(searchTerm) {
			var coll = new TaskCollection()
			coll.fetch()
			ReactDOM.render(<HomeView taskColl={coll} />,document.querySelector('.container'))
		},
		initialize: function() {
			Backbone.history.start()
		}
	})

	new TaskRouter()
}

app()