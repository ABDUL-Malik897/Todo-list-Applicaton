const express = require('express');
const todoModels = require('../models/todo-models');
const { getAllTodos, getSingleTodoById, addNewTodo, updateTodoById, deleteTodoById, searchTodos } = require('../controller/todo-controller');
const router  = express.Router()

//? GET (all)

router.get('/',getAllTodos)


//? GET (by id)

router.get('/:id',getSingleTodoById)


//? POST

router.post('/',addNewTodo)


//? PUT 

router.put('/:id',updateTodoById)


//? DELETE 

router.delete('/:id',deleteTodoById)

//? SEARCH 

router.get("/search", searchTodos);


module.exports = router;