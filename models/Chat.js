const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    members: {
      type: Array
    },
    messages: {
      type: Array
    },

});


let Chat = mongoose.model("Chat", chatSchema, 'chats');
module.exports = Chat;
