import React from 'react'


const DoneList = React.createClass({
getInitialState: function(){
    return {
      isShowing: false

    }
  },

  _handleToggleClick: function(){

    if(this.state.isShowing === true){
      this.setState({
        isShowing: false
      })
    } else {
      this.setState({
        isShowing: true
      })
    }   
  },

  _getDoneTaskComponents: function(taskColl){
       
            return taskColl.map((task)=> <li>{task.get('done')}</li>)
        
    },


  render: function(){

    var styleObj
    var buttonLabel

    if(this.state.isShowing){
      buttonLabel = 'x'
      styleObj = {
        left: 0
      }
    } else {
      buttonLabel = '> Show Done '
      styleObj = {
        left: -250
      }

    }

    return (
      <div className="done-list" style={styleObj}>
        <div className="side-panel" >
          <h2>Done List</h2>
          <ul>
           {this._getDoneTaskComponents(this.props.taskColl)}
          </ul>

        </div>

        <button onClick={this._handleToggleClick} >{buttonLabel}</button>

      </div>
    )
  }
})

export default DoneList