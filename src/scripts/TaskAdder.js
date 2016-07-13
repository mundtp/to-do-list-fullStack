import React from 'react'

const TaskAdder = React.createClass({

    _handleTaskAdd: function(e) {
        if (e.keyCode === 13) {
            this.props._addTaskFromTaskView(e.target.value)
            e.target.value = ''
        }
    },

    render: function() {
        return (
            <input onKeyDown={this._handleTaskAdd} placeholder="Enter tasks..." />
            )
    }
})

export default TaskAdder