import React from 'react'


const UndoneList = React.createClass({

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

    _getUndoneTaskComponents: function(taskColl){
        return taskColl.map((task) => <li>{task.get('undone')}</li>)
    },

  render: function(){
    var styleObj
    var buttonLabel

    if(this.state.isShowing){
      buttonLabel = 'x'
      styleObj = {
        right: 0
      }
    } else {
      buttonLabel = '< Show Undone'
      styleObj = {
        right: -250
      }

    }

    return (
      <div className="undone-list" style={styleObj}>
        <div className="side-panel" >
          <h2>Undone List</h2>
          <ul>
             {this._getUndoneTaskComponents(this.props.taskColl)}
          </ul>

        </div>

        <button onClick={this._handleToggleClick} >{buttonLabel}</button>

      </div>
    )
  }
})
export default UndoneList