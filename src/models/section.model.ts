import mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  name: String,
  id: Number,
  deletedAt: {type: Date, default: null},
  task_allowed: [{type: 'ObjectId', ref: 'Task'}],
}, {timestamps: true});

export default mongoose.model('Section', sectionSchema);
