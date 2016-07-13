let Router = require('express').Router;
const apiRouter = Router()

let User = require('../db/schema.js').User
let Task = require('../db/schema.js').Task


apiRouter.get('/tasks',function(request,response) {
  //first argument gives the criteria (WHICH msgs do i want)
  Task.find({},function(err,records) {
    response.json(records)
  })
})  

apiRouter.post('/tasks',function(request,response) {
  let newRecord = new Task(request.body)
  newRecord.save(function(err) {
    if (err) {
      console.log(err)
      response.send(err)
    }
    else {
      response.json(newRecord)
    }
  })
})

module.exports = apiRouter