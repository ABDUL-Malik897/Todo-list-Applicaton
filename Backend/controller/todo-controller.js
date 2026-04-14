// const todoModels = require("../models/todo-models");
const todoServices = require("../services/todo-services")
//? get all Todos
exports.getAllTodos = async (req,res) => {
    try{
    const todos = await todoServices.getAllTodos()
    if(!todos || todos.length === 0){
        return res.status(404).json({
            success: false,
            message: "No todos found",
            data: null
        })
    }
    res.status(200).json({
        success: true,
        message: "Todos fetched successfully",
        data: todos
    })
    } catch (err){
    res.status(500).json({
        success: false,
        message: err.message || "Internal Error",
        data: null
    });
    }
};

//? get Todos by id
exports.getSingleTodoById = async (req,res) => {
    try{
    const { id } =req.params
    const todo = await todoServices.getTodoById(id)
    if(!todo){
        return res.status(404).json({
            success: false,
            message: "Todo not found",
            data: null  
        })
    }
    res.status(200).json({
        success: true,
        message: "Todo fetched successfully",
        data: todo
    })}
    catch(err){res.status(500).json({
        success: false,
        message: err.message || "Internal error",
        data: null
    });
    }
};

//? create a new Todo
exports.addNewTodo = async (req,res) => {
    try{
    const { Title , Content , Completed } = req.body
    if(!Title || !Content || Completed === undefined){
        res.status(400).json({
            success: false,
            message: "Please provide all required fields",
            data: null

        })
    }
    const saved = await todoServices.createTodo({Title,Content,Completed})
    res.status(201).json({
        success: true,
        message: "Todo created successfully",
        data: saved
    })}catch(error){
    res.status(500).json({
        success: false,
        message: error.message || "Internal error",
        data: null
    });
    }}

//? update a existing todo
exports.updateTodoById = async (req,res) => {
    try{
    const { id } = req.params
    const data  = req.body
    
    if(!data|| Object.keys(data).length === 0 ){
        return res.status(400).json({
            success: false,
            message: "Please provide data to update",
            data: null
        })
    }
    const updateTodo = await todoServices.updateTodo(id,data)
    if(!updateTodo){
        return res.status(404).json({
            success: false,
            message: `No Todo with id: ${id}`,
            data: null
        })
    }
    res.status(200).json({
            success: true,
        message: "Todo updated successfully",
        data: updateTodo
        })}
    catch(err){
        res.status(500).json({
        success: false,
        message: err.message || "Internal error",
        data: null
    });
    }
};

//? delete a todo
exports.deleteTodoById = async (req, res) => {
    try {
    const { id } = req.params;

    const deletedTodo = await todoServices.deleteTodo(id);

    if (!deletedTodo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found",
            data: null
        });
    }

    res.status(200).json({
        success: true,
        message: `Todo with id ${id} deleted successfully`,
        data: deletedTodo
    });

    } catch (err) {
    res.status(500).json({
        success: false,
        message: err.message || "Internal error",
        data: null
    });
    }
};

exports.searchTodos = async (req, res) => {
    try {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            success: false,
            message: "Search query is required",
            data: null
        });
    }

    const results = await todoServices.searchTodos(q);

    res.status(200).json({
        success: true,
        message: "Search results fetched",
        data: results
    });

    } catch (err) {
    res.status(500).json({
        success: false,
        message: err.message || "Internal error",
        data: null
    });
    }
};