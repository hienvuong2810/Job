import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import './chat.css';
import io from 'socket.io-client';
import { getCookie } from "./actions/authActions";
const URL = "http://localhost:3000"

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      showBox: false,
      shownToggle: true,
      data: [],
      username: getCookie('username'),
      currentRec: undefined,
      messages: []
    };

    this.showBox = this.showBox.bind(this);
    this.closeBox = this.closeBox.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  showBox = (i, pid, name) => {
    this.setState({ currentRec: i });
    console.log(`Selected record index: ${i}`);
    this.setState({ showBox: true }, () => {
      document.addEventListener('click', this.closeBox);
    });
  }

  closeBox(event) {
    if (this.dropdownBox.contains(event.target)) {
      this.setState({ showBox: false }, () => {
        document.removeEventListener('click', this.closeBox);
      });
    }
  }

  toggle() {
    this.setState({
      shownToggle: !this.state.shownToggle
    });
  }
   updateData(data){
      this.setState({
        data: data
      });
    console.log("dât",this.state.data)
  }
  componentDidMount(){
    this.socket = io.connect(URL,{query:"user="+ getCookie('username')});
    this.socket.on("get user", (data) =>{
      console.log("dissssss");
      data.splice(data.indexOf(getCookie('username')), 1);
      this.updateData(data);
    });
    this.socket.on("new message", function(data){
      this.setState({
        messages: [
          ...this.state.messages,
          {
            user: data.user,
            msg: data.msg
          }
        ]
      });
  }.bind(this));
  }
  handleKeyPress = (event) =>{
    if(event.key == "Enter"){
      let mess = (event.target.value);
      event.target.value = "";
      let idReciver = (this.state.data[this.state.currentRec].id);
      let nameReciver =  (this.state.data[this.state.currentRec].name);
      this.socket.emit("send mess",mess, idReciver, nameReciver);
    }
  }
  render() {
    var hidden = {
      display: this.state.shownToggle ? "block" : "none"
    }
    console.log(this.state.data);
    console.log('adadsa');
    // console.log(this.state.currentRec)
    return (

      <>
        <div className="onlineUsersContainer">
           <div className="userInfo">Welcome <label id="myName">Guest</label> !!</div>
           <div>
              <ul id="onlineUsers">
                {this.state.data.map((person, i) => (
                  <li onClick={() => this.showBox(i, person.id, person.name)} key={i}>{person.name}</li>
                ))}
              </ul>
            </div>
        </div>
        <div className="chatContainer">
          {this.state.showBox ? (
            <div className="msg_box">
              <div onClick={this.toggle.bind(this)} className="msg_head">
                <b style={{ color: 'orange' }}>
                  {this.state.currentRec !== undefined &&
                    <div style={{display: "inline-block"}}>
                      {this.state.data[this.state.currentRec].name}
                    </div>
                  }
                </b>

                <div className="close" ref={(element) => { this.dropdownBox = element; }} style={{ color: 'white' }}>X</div>
              </div>
              <div style={hidden} className="msg_wrap">
                <div>Message will appear here
            
                   <ul className="messages">
                     {this.state.messages.map((abc, i) => {

                      
                       // if sender add  className="mine"
                       // else not add
                       
                       
                     })}
                   </ul>
                </div>
              </div>
              <div className="msg_footer"><input onKeyPress={this.handleKeyPress.bind(this)} placeholder="Write A Message"/></div>
            </div>
          ) : null }
        </div>


      </>
    );
  }
}
// <ul id="messages"></ul>
// <span id="notifyTyping"></span>
// <form id="form" action="" onSubmit={this.submitfunction} >
//   <input type="hidden" id="user" value="" /><input id="m" autoComplete="off" onKeyUp={this.notifyTyping} placeholder="Type yor message here.." /><input type="submit" id="button" value="Send"/>
// </form>
//
// <div className="">
//   <ul style={{ float: "left" }}>
//     {this.state.data.map((person, i) => (
//       <div className="chat-sidebar" key={i}>
//         <div  onClick={() => this.showBox(i, person.id, person.name)}> {person.name}</div>
//         {this.state.showBox ? (
//           <div className="msg_box" style={{ right: '270px' }}>
//             <div onClick={this.toggle.bind(this)} className="msg_head">
//               <b style={{ color: 'orange' }}>
//                 {this.state.currentRec !== undefined &&
//                   <div style={{display: "inline-block"}}>
//                     {this.state.data[this.state.currentRec].name}
//                   </div>
//                 }
//               </b>
//
//               <div className="close" ref={(element) => { this.dropdownBox = element; }} style={{ color: 'white' }}>X</div>
//             </div>
//             <div style={hidden} className="msg_wrap">
//               <div>Message will appear here
//                  <ul className="msg_body">
//                  </ul>
//               </div>
//               <div className="msg_footer"><input onKeyPress={this.handleKeyPress.bind(this)} placeholder="Write A Message"/></div>
//             </div>
//
//
//         </div>) : (null)}
//       </div>
//     ))}
//   </ul>
// </div>

export default Chat
