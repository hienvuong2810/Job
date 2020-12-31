import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

const URL = "http://localhost:3000"; //

class ChatPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBox: false,
            shownToggle: true,
            data: [],

            currentRec: undefined,
            messages: [],
            friend: null,
            test1: null,
            test2: null,
            userWantToChat: null
        };

        this.showBox = this.showBox.bind(this);
        this.closeBox = this.closeBox.bind(this);
        this.toggle = this.toggle.bind(this);

        if (this.props.principal == null) {
            this.props.history.push("/login");
            return;
        }
    }

    showBox = (i, pid, name) => {
        this.setState({ currentRec: i });
        console.log(`Selected record index: ${i}`);
        this.setState({ showBox: true }, () => {
            document.addEventListener("click", this.closeBox);
        });
        this.socket.emit("get_chats_user", name);
        this.setState({
            friend: name,
            test1: pid
        });
    };

    closeBox(event) {
        if (this.dropdownBox.contains(event.target)) {
            this.setState({ showBox: false }, () => {
                document.removeEventListener("click", this.closeBox);
            });
        }
    }

    toggle() {
        this.setState({
            shownToggle: !this.state.shownToggle
        });
    }

    componentDidMount() {
        if (this.props.principal == null) {
            this.props.history.push("/login");
            return;
        }

        //Connect to socket
        this.socket = io.connect(URL, {
            query: "user=" + this.props.principal.username
        });
        //Listen for new message
        this.socket.on(
            "new message",
            function(data) {
                this.setState({
                    messages: [
                        ...this.state.messages,
                        {
                            from: data.from,
                            body: data.body
                        }
                    ]
                });
            }.bind(this)
        );

        //Listen for list users already chat
        this.socket.on("list_users", data => {
            // console.log(data)
            this.setState({
                data: data
            });
        });

        //Listen for messages of user from select box
        this.socket.on("return_chats", data => {
            this.setState({
                messages: data
            });
        });

        //Listen for update list users
        this.socket.on("update_list", data => {
            this.setState({
                data: [...this.state.data, data]
            });
        });
    }

    handleKeyPress = event => {
        if (event.key === "Enter") {
            let mess = event.target.value;
            event.target.value = "";
            // console.log(this.state.currentRec)
            // let idReciver = (this.state.data[this.state.currentRec].id);
            // let nameReciver =  (this.state.data[this.state.currentRec].name);
            // this.socket.emit("send mess",mess, idReciver, nameReciver);
            this.socket.emit(
                "send mess",
                mess,
                this.state.test1,
                this.state.friend
            );
            // console.log(idReciver) //
            console.log(this.state.test1); //
            // console.log(nameReciver) //
            console.log(this.state.friend); //
            //test1 = idReciver; friend = nameReciver
        }
    };

    changeInputName(e) {
        this.setState({
            userWantToChat: e.target.value
        });
    }

    submitUser = () => {
        this.socket.emit("submit_user", this.state.userWantToChat);
    };

    render() {
        var hidden = {
            display: this.state.shownToggle ? "block" : "none"
        };
        const principal = this.props.principal;

        if (this.props.principal == null) {
            this.props.history.push("/login");
            return <h1>Redirect to login</h1>;
        }

        return (
            <>
                <div className="onlineUsersContainer">
                    <div className="userInfo">
                        Welcome <label id="myName">{principal.username}</label>{" "}
                        !!
                    </div>
                    <div>
                        <ul id="onlineUsers">
                            {this.state.data.map((person, i) => (
                                <li
                                    onClick={() =>
                                        this.showBox(i, person.id, person.name)
                                    }
                                    key={i}
                                >
                                    {person.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <input
                            placeholder="Type user want to chat"
                            onChange={this.changeInputName.bind(this)}
                        />
                        <button type="submit" onClick={this.submitUser}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="chatContainer">
                    {this.state.showBox ? (
                        <div className="msg_box">
                            <div
                                onClick={this.toggle.bind(this)}
                                className="msg_head"
                            >
                                <b style={{ color: "orange" }}>
                                    <div style={{ display: "inline-block" }}>
                                        {this.state.friend}
                                    </div>
                                </b>

                                <div
                                    className="close"
                                    ref={element => {
                                        this.dropdownBox = element;
                                    }}
                                    style={{ color: "white" }}
                                >
                                    X
                                </div>
                            </div>
                            <div style={hidden} className="msg_wrap">
                                <div>
                                    Message will appear here
                                    <ul className="messages">
                                        {this.state.messages.map((abc, i) => {
                                            return principal.username ===
                                                abc.from ? (
                                                <li className="mine" key={i}>
                                                    {abc.from}: {abc.body}
                                                </li>
                                            ) : (
                                                <li
                                                    className="chatMessageLeft"
                                                    key={i}
                                                >
                                                    {abc.from}: {abc.body}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="msg_footer">
                                <input
                                    onKeyPress={this.handleKeyPress.bind(this)}
                                    placeholder="Write A Message"
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        principal: store.auth.principal
    };
};

export default connect(mapStateToProps)(ChatPage);
