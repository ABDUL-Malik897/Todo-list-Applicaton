// const todoModels = require("../models/todo-models");
const todoServices = require("../services/todo-services")
const { body , validationResult } = require("express-validator")

//? get all Todos
exports.getAllTodos = async (req,res) => {
    try{
    const todos = await todoServices.getAllTodos()    //todo -- fetching the todos using the service created  else it was to separate API logic from UI code.
    if(!todos || todos.length === 0){
        return res.status(404).json({
            success: false,
            message: "No todos found"
        })
    }                                                   
    res.status(200).json({
        success: true,
        message: "Todos fetched successfully",
        data: todos
    })} catch (err){
    res.status(500).json({
        success: false,
        message: err.message || "Some Internal Error"
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
            message: "Todo not found"  
        })
    }
    res.status(200).json({
        success: true,
        message: "Todo fetched successfully",
        data: todo
    })}
    catch(err){res.status(500).json({
        success: false,
        message: err.message || "Internal error something"
    });
    }
};

//? create a new Todo
exports.addNewTodo = [
    body("Title")                            //?   Validation rules
    .notEmpty()
    // .optional()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

    body("Content")
    .notEmpty()
    .withMessage("Content is required"),

    async (req, res) => {                   //*  Main function
    try {
        const errors = validationResult(req);   // Check validation errors
        // console.log("VALIDATION:", errors.array());
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
        }
        const todo = await todoServices.createTodo(req.body);

        res.status(201).json({
        success: true,
        data: todo
        });
    } catch (error) {
        console.error("Error creating todo:", error.message);
        res.status(500).json({
        success: false,
        message: "Server error while creating todo"
        });
    }
    }
]

//? update a existing todo
exports.updateTodoById = [

  //  Validation rules
    body("Title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

    body("Content")
    .optional()
    .notEmpty()
    .withMessage("Content cannot be empty"),

    //  Main function
    async (req, res) => {
    try {
        const errors = validationResult(req);

        //  ADD THIS
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
        }
        const { id } = req.params;
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide data to update"
        });
        }

        const updateTodo = await todoServices.updateTodo(id, data);

        if (!updateTodo) {
        return res.status(404).json({
            success: false,
            message: `No Todo with id: ${id}`
        });
        }

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: updateTodo
        });

    } catch (err) {
        res.status(500).json({
        success: false,
        message: err.message || "Internal error"
        });
    }
    }
];

//? delete a todo
exports.deleteTodoById = async (req, res) => {
    try {
    const { id } = req.params;

    const deletedTodo = await todoServices.deleteTodo(id);

    if (!deletedTodo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found"
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
        message: err.message || "Internal error something"
    });
    }
};

exports.searchTodos = async (req, res) => {
    try {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            success: false,
            message: "Search query is required"
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
        message: err.message || "Internal error"
    });
    }
};