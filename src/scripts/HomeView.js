import React from 'react'
import ReactDOM from 'react-dom'
import TaskAdder from './TaskAdder'
import DoneList from './DoneList'
import UndoneList from './UndoneList'
import {TaskModel} from './models.js'
import $ from 'jquery'

const HomeView = React.createClass({
    getInitialState: function(){
        return{
            taskColl: this.props.taskColl
        }
    },
    componentWillMount: function(){
        this.props.taskColl.on('update', () => {
            this.setState({
                taskColl: this.state.taskColl
               
            })
        })
    },
    _addTask: function(taskName) {
        var taskModel = new TaskModel({
            name: taskName,
            undone: taskName
        })
        taskModel.save()
        this.props.taskColl.add(taskModel)
    },

    _addUndone: function(taskModel) {
        taskModel.attributes.undone = taskModel.attributes.name
        this.props.taskColl.add({
            ghost: ' '
        })
        var length = this.props.taskColl.models.length
       this.props.taskColl.models[length-1].destroy()
    },

    _removeUndone: function(taskModel){
        taskModel.attributes.undone = ''
        this.props.taskColl.add({
            ghost: ' '
        })
        var length = this.props.taskColl.models.length
       this.props.taskColl.models[length-1].destroy()
    },

    _addDone: function(taskModel) {
        taskModel.attributes.done = taskModel.attributes.name
        this.props.taskColl.add({
            ghost: ' '
        })
        var length = this.props.taskColl.models.length
       this.props.taskColl.models[length-1].destroy()
    },

    _removeDone: function(taskModel){
        taskModel.attributes.done = ''
        this.props.taskColl.add({
            ghost: ' '
        })
        var length = this.props.taskColl.models.length
       this.props.taskColl.models[length-1].destroy()
    },
    
    render: function() {
        return (
            <div id="taskViewContainer">
                <Header />
               <UndoneList taskColl={this.state.taskColl}/>
               <DoneList taskColl={this.state.taskColl}/>
                <TaskAdder _addTaskFromTaskView={this._addTask} />
                <TaskList taskColl={this.state.taskColl} _addDone={this._addDone} _removeDone={this._removeDone} _addUndone={this._addUndone} _removeUndone={this._removeUndone}/>
            </div>
            )
    }
})

const TaskList = React.createClass({

    _getTaskComponents: function(taskColl) {
        return taskColl.map((mod) => {
            return <Task taskModel={mod} key={mod.cid} _addDone={this.props._addDone} _removeDone={this.props._removeDone} _addUndone={this.props._addUndone} _removeUndone={this.props._removeUndone}/>
        })
    },

    render: function() {
        return (
            <ul id="taskList">
                {this._getTaskComponents(this.props.taskColl)}
            </ul>
            )
    }
})

const Task = React.createClass({
    _killTask: function() { 
        this.props.taskModel.destroy({
            url: `/api/tasks/${this.props.taskModel.id}`        
        })    
    },

    _addDescription: function(e){
        if (e.keyCode === 13) {
            this.props.taskModel.attributes.name += ' Description: ' + e.target.value
            e.target.value = ' '  
           
        }
    },

     _addDueDate: function(e){
        if (e.keyCode === 13) {
            this.props.taskModel.attributes.name += ' Due Date: ' + e.target.value
            e.target.value = ' ' 
            
        }
    },

    _doFunc: function(e){
       if(e.target.checked){
        this.props._addDone(this.props.taskModel)
        this.props._removeUndone(this.props.taskModel)
       }
       else{
        this.props._removeDone(this.props.taskModel)
        this.props._addUndone(this.props.taskModel)
        }
    },

    render: function() {
        return (
            <div className="task">
                <span className="name">{this.props.taskModel.get('name')}
                    <input className='inputDescription' placeholder="enter description" onKeyDown={this._addDescription} onChange={this._changeRSVP}/>
                    <input className='inputDueDate' placeholder="enter due date" onKeyDown={this._addDueDate}/>
                    <input type='checkbox' onChange={this._doFunc}/>
                <a id='checkbox'>Done?</a>
                <button onClick={this._killTask}>X</button></span>
            </div>
            )
    }
})

const Header = React.createClass({
    render: () => {
        return (
            <div id="headingContainer">
                <h1>To Do List</h1>
                
            </div>

            )
    }
})

export default HomeView