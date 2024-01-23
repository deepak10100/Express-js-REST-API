const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydata').then(()=>{
  console.log("connection successfully")
}).catch(()=>{
  console.log("Connection decined", )
})
const Students = new mongoose.Schema({
  name: String,
  age:Number
});
const Person = mongoose.model('Person', Students);

app.post('/api/v1/create', async(req, res) => {
  let student = await Person.create(req.body)
  res.json({
    success:true,
    student
  })
})

app.get('/api/v1/allstudent', async(req, res) => {
  let student = await Person.find()
  res.json({
    success:true,
    student
  })
})

app.put('/api/v1/student/:id', async(req, res) => {
   let student = await Person.findByIdAndUpdate(req.params.id,req.body)
  res.json({
    success:true,
    student
  })
})
app.delete('/api/v1/student/:id', async(req, res) => {
   let student = await Person.findByIdAndDelete(req.params.id,req.body)
  res.json({
    success:true,
    student:"delete student details"
  
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})