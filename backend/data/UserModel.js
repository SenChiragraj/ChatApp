import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: false
  },
  friends: [{
    friendID: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    chat: [{
      message: {
        type: String,
      }, type: {
        type: Boolean,
      }, date: {
        type : Date,
        default : Date.now
      }
    }]
  }],
  groups: [{
    type: [Schema.Types.ObjectId],
    ref: 'Group'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);
export default User;
