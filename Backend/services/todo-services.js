const todoModels = require("../models/todo-models");

//? get all todos
exports.getAllTodos = async () => {
    return await todoModels.find().sort({ createdAt: -1 });
};

//? get single todo
exports.getTodoById = async (id) => {
    return await todoModels.findById(id);
};

//? create todo
exports.createTodo = async (data) => {
    return await todoModels.create(data);
};

//? update todo
exports.updateTodo = async (id, data) => {
    return await todoModels.findByIdAndUpdate(id, data, { new: true });
};

//? delete todo
exports.deleteTodo = async (id) => {
    return await todoModels.findByIdAndDelete(id);
};

//? searcg todo
exports.searchTodos = async (query) => {
    return await todoModels.find({
        Title: { $regex: query, $options: "i" } 
    }).sort({ createdAt: -1 });
}; 