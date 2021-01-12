import mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  description: String,
  estimated: Number,
  time: Number,
  order: Number,
  status: {type: Number, default: 1},
  deletedAt: {type: Date, default: null}
}, {timestamps: true});

export default mongoose.model('Task', taskSchema);
