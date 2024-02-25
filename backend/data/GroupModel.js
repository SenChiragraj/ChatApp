import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name : { type: String, required: true },
  description : { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  icon : { type: String},
  admin : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
})

const Group = mongoose.model('group', groupSchema);
export default Group;