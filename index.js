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
  console.log("connection Access")
}).catch(()=>{
  console.log("connection Decined")
});

const studentSchema = new mongoose.Schema({
  name: String,
  marks:Number
});
const student = mongoose.model('Student', studentSchema);
app.post('/api/v1/create', async(req, res) => {
  let students = await student.create(req.body)
  res.json({
    success:true,
    students
  })
})
app.get('/api/v1/students', async(req, res) => {
  let students = await student.find()
  res.json({
    success:true,
    students
  })
})
app.put('/api/v1/students/:id', async(req, res) => {
  let students = await student.findByIdAndUpdate(req.params.id,req.body)
  res.json({
    success:true,
    students
  })
})
app.delete('/api/v1/students/:id', async(req, res) => {
  let students = await student.findByIdAndDelete(req.params.id,req.body)
  res.json({
    success:true,
    students
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})