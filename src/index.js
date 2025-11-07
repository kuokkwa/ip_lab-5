console.log(`hello world`);

const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const students = [
    {
        id: 1,
        name: 'Олена',
        mark: 77,
    }, {
        id: 2,
        name: 'Сергій',
        mark: 60,
    }, {
        id: 3,
        name: 'Марія',
        mark: 89,
    }, {
        id: 4,
        name: 'Влад',
        mark: 80,
    }, {
        id: 5,
        name: 'Катерина',
        mark: 65,
    }, {
        id: 6,
        name: 'Олексій',
        mark: 90,
    }
]

app.get('/students',(req, res) => {
  res.json(students)
})

app.post('/students',(req, res) => {
  console.log(req.body);
  res.send("ok");

  students.push(
    {
      id: req.body.id,
      name: req.body.name,
      mark: req.body.mark
    }
  )
})

app.put('/students/id/:id',(req,res) => {

  console.log(req.params.id);

  let foundStudent = students.find(student => student.id == req.params.id);

  if(foundStudent === undefined){
    res.status(404).send("not found");
    return;
  }

  foundStudent.mark = req.body.mark;
  res.send('updated');
})

app.delete('/students/id/:id',(req,res) => {

  console.log(req.params.id);

  let foundStudentIndex = students.findIndex(student => student.id == req.params.id);
  
  if(foundStudentIndex >= 0){
    students.splice(foundStudentIndex);
    res.send("deleted")
  }else{
    res.status(404).send("not found");
    return;
  }

})

app.listen(port, () => {
  console.log(`http://localhost:3000`)
})