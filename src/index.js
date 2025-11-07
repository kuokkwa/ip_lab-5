import express from 'express'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { students } from './students.js'
import { API_KEY } from './auth.js'
import { login } from './users.js'

console.log(`hello world`);

const app = express()
const port = 3000

dotenv.config();
console.log(process.env.JWT_SECRET);

app.use(express.json());;

function API_Middle(req, res, next) {
  let apiKey = req.header('authorization');
  if (apiKey == API_KEY /* && req.path == '/students' */) {
    next();
  }
  else {
    res.status(401).send("wrong API key");
  }
}

app.use(API_Middle);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/students', (req, res) => {
  req.path('/students');
  res.json(students);
})

app.post('/students', (req, res) => {
  console.log(req.body);
  res.send("ok");

  students.push(
    {
      id: req.body.id,
      name: req.body.name,
      mark: req.body.mark
    }
  )
}
)

app.put('/students/id/:id', (req, res) => {
  console.log(req.params.id);

  let foundStudent = students.find(student => student.id == req.params.id);

  if (foundStudent === undefined) {
    res.status(404).send("not found");
    return;
  }

  foundStudent.mark = req.body.mark;
  res.send('updated');
}
)

app.delete('/students/id/:id', (req, res) => {
  console.log(req.params.id);

  let foundStudentIndex = students.findIndex(student => student.id == req.params.id);

  if (foundStudentIndex >= 0) {
    students.splice(foundStudentIndex);
    res.send("deleted")
  } else {
    res.status(404).send("not found");
    return;
  }
}
)

app.post('/users/login',(req,res) => {
  let jwtKey = login(req.body.username, req.body.password);

  if (jwtKey){
    res.json({jwtKey})
  }else{
    res.status(404).send('wrong auth');
  }
})

app.get('/profile',(req,res) => {
  let key = req.header('authorization');
  let data = jwt.verify(key.slice(7).process.env.JWT_SECRET);
  console.log(data);

  res.send('okaaay');

  if(data){
    let userId = data.id;
  }else{
    res.status(401).send('wrong profile auth');
  }
})

app.listen(port, () => {
  console.log(`http://localhost:3000`)
})