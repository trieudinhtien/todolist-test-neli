const mongoose = require('mongoose')

const TashSchema = new mongoose.Schema({
    todo: String,
    isComplete: Boolean
})

const Task = mongoose.model('task', TashSchema);

module.exports = Task