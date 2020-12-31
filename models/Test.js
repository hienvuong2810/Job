const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    so: Number

},
    {
        collection: "testes"
    }
);


module.exports = mongoose.model("Test", chatSchema);
