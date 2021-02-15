const express = require('express')
const app = express()

app.use(express.json())

const todos = [
    {
        id: 1,
        name: "Clean utensils"
    },
    {
        id: 2,
        name: "Go to Market"
    },
    {
        id: 3,
        name: "Fetch Water"
    }
]
app.get('/todos', function (req, res) {
    return res.send(todos)
})

app.get('/todos/:id', function (req, res) {
    const id = req.params.id
    const todo = todos.find(function (todo) {
        return todo.id === parseInt(id)
    })
    console.log("todo item", todo);
    if (!todo) {
        return res.status(404).send({message: "todo not found"})
    }
    return res.send(todo)
})
app.post('/todos', function (req, res) {
    const body = req.body
    todos.push(body)
    return res.status(201).send(body)
})
app.put('/todos/:id', function (req, res) {
    const id = req.params.id;
    console.log("id", id);
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === parseInt(id);
    });
    if (todoIndex < 0) {
        return res.status(404).send("item not found")
    }
    let name = req.body.name;
    console.log("name", name);
    todos[todoIndex].name = name;

    console.log("index", name);
    return res.send("okay");
});
app.delete('/todos/:id', function (req, res) {
    let id = req.params.id;
    let todoIndex = todos.findIndex(function (todo) {
        return todo.id === parseInt(id);
    });
    todos.splice(todoIndex, 1)
    return res.send("okay");
});

app.listen(8000, function () {
    console.log("application running")
})
