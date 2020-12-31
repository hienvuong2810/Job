var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    sender:String,
    receiver:String,
    text : String,
    createAt : Date,
});

MessageSchema.statics = {
    createNew(send_name, rec_name, text, createAt){
        return this.create({
            sender: send_name,
            receiver: rec_name,
            text: text,
            createAt: createAt,
        })
    },
    getMess(){
        return this.find().distinct("receiver",(error, result) => {
            console.log(result)
        })
    }
}
module.exports = mongoose.model("message",MessageSchema);