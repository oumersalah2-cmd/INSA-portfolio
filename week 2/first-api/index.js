const express = require("express");
const app = express();
const PORT = 3000;

let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id:2, task: "Build a REST API", completed:false}
];
app.use(express.json())
app.get('/', (req, res) => {
  res.send('To-Do API is running!');
 });
app.get('/todos', (req, res) => {
   res.status(200).json(todos);
});
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(t => t.id == todoId);
  if (!todo) {
    return res.status(404).json({ message: "To-do not found"});
  }
  todo.task = req.body.task || todo.task;
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }
  res.status(200).json(todo);
});

app.listen(PORT, () => {
  console.log('Server is listening on http://localhost:${PORT}');
});
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.status(204).send();
});