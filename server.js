const express = require("express");
const config = require("config");
const back = config.backend.url;
const front = config.frontend.url;
const path = require("path");
const mongoose = require("mongoose");
const app = express();

global.rootPath = path.resolve(__dirname);

app.use(express.json());
app.set("trust proxy", true);
app.disable("x-powered-by");

const db = config.get("mongoURI");

mongoose
    .connect(db, {
        dbName: "job_it",
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoAtlas Connected..."))
    .catch(err => console.log(err));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// app.use(require("./middleware/cors.js"));
let cors = require("cors");
let corsOptions = {
    origin: [
        "http://localhost:3001",//
        "http://localhost:3000",//
        "http://localhost:8080"//
    ],
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "x-auth-token",
        "Origin",
        "Authorization"
    ],
    maxAge: 120
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000 ;

app.use("/api/auth", require("./routes/apis/auth.js").router);
app.use("/api/account", require("./routes/apis/account.js"));
app.use("/api/mailer", require("./routes/apis/mailer.js"));
app.use("/rest", require("./routes/apis/proxy.js"));

// app.listen(port, () => console.log("Started server on port " + port));

//Test mongodb with index
let City = require("./models/City.js")


//socket io start here
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

const Chat = require("./models/Chat.js")


try {
  server.listen(port);
} catch(e) {
  console.log(e);
}

let Test = require('./models/Test.js')

var users = []
io.on("connection", async function(socket){
    console.log("Connecting", socket.handshake.query.user);

    // for (i = 33000; i < 40000; i++)
    // {

    //   let myTest = new Test({"so": i})
    //   await myTest.save();
    //   console.log(i)

    // }
    // console.log("Success")

    City.findById(mongoose.Types.ObjectId("5e1ab606dc3e2799abc56dcc")).then(list => {
      console.error(list)
    });
    console.log(await City.count({}))

    socket.username = socket.handshake.query.user;
    //addUser(data);
    users.push({
        name : socket.username,
        id :   socket.id,
    });

    //disconnected
    socket.on("disconnect", function(){
       users.splice(users.indexOf(users.find(x => x.name == socket.username)), 1);

       io.emit("get user", users);
        console.log("disconnect", socket.username );
        console.log(users);
    })

    //Get list users
    let myList = await Chat.find({}, {members: 1});
    let myList2 = [];
    myList.map(ele1 => {
      if (ele1.members.includes(socket.handshake.query.user)) {
        // console.log(ele1.members)
        ele1.members.map(ele2 => {
          if (ele2 !== (socket.username)) {
            let myObject3 = {name: ele2, id: null}
            myList2.push(myObject3)
          }
        })
      }
    })
    socket.emit("list_users", myList2)

    //Create chatroom with specific user
    socket.on("submit_user", async (data) => {
      let exists = await Chat.findOne({ $or: [{members: [socket.username, data]}, {members: [data, socket.username]}]});
      if (!exists) {
        let chat = new Chat({members: [socket.username, data]});
        chat.save()
        let myObject4 = {name: data, id: null}
        socket.emit("update_list", myObject4)
        users.map(ele => {
          if (ele.name === data) {
            let myObject5 = {name: socket.username, id: null}
            io.to(ele.id).emit("update_list", myObject5)
          }
        })
      } else {
        console.log("Already exists. No need create")
      }
    })

    //Testing
    console.log("itis users socket: ", users)
    console.log("itis list users get from db: ", myList2)
    console.log("\n")

    //Get chats base on users
    socket.on("get_chats_user", async (data) => {
      let myChats = await Chat.find({});
      myChats.map(ele1 => {
        if (ele1.members.includes(data) && ele1.members.includes(socket.username)) {
          socket.emit("return_chats", ele1.messages)
        }
      })
    })

    //Send message
    socket.on("send mess", async function(mess, idReciver, nameReciver){
        io.to(socket.id).emit("new message", {body: mess, from: socket.username})

        users.map(ele => {
            if (ele.name === nameReciver) {
              io.to(ele.id).emit("new message", {body: mess, from: socket.username})
            }
        })

        let exists = await Chat.findOne({ $or: [{members: [socket.username, nameReciver]}, {members: [nameReciver, socket.username]}]});
        if (!exists) {
          let chat = new Chat();
          chat.members = [socket.username, nameReciver];
          chat.messages = [{from: socket.username, body: mess, date: Date.now()}];
          chat.save()
            .then(res => {
              console.log("response" + res)
                  }
                  , err => console.log(err));
            return;
        }

        exists.messages = [...exists.messages, {from: socket.username, body: mess, date: Date.now()}];
        exists.save();
        console.log('ok')
    })


});
