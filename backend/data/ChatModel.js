import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  message : { type: String, required: true },
  isGroupChat : { type: Boolean, default : false },
  date: { type: Date, default: Date.now },
  type: {type: Boolean}, // false -> sent, true -> received
  // sender : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Chat = mongoose.model('chats', chatSchema);
export default Chat;


