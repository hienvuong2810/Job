import React, { Component } from "react";

class Authority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: {
                visible: false
            }
        };
    }

    toggle() {
        this.setState({
            showMenu: {
                ...this.state.showMenu,
                visible: !this.state.showMenu.visible
            }
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle.bind(this)}>Authority</button>
                <Menu visible={this.state.showMenu.visible} />
            </div>
        );
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formInsert: {
                visible: false
            },
            formUpdate: {
                visible: false
            }
        };
    }

    toggleInsert() {
        this.setState({
            formInsert: {
                ...this.state.formInsert,
                visible: !this.state.formInsert.visible
            }
        });
    }

    toggleUpdate() {
        this.setState({
            formUpdate: {
                ...this.state.formUpdate,
                visible: !this.state.formUpdate.visible
            }
        });
    }

    render() {
        let visible = this.props.visible;
        let btnUpdate_class = this.state.formUpdate.visible ? "cancel" : "";
        let btnInsert_class = this.state.formInsert.visible ? "cancel" : "";
        return (
            <div>
                {visible ? (
                    <div>
                        <button
                            className={btnInsert_class}
                            onClick={this.toggleInsert.bind(this)}
                        >
                            {this.state.formInsert.visible ? "Close" : "Insert"}
                        </button>
                        <button
                            className={btnUpdate_class}
                            onClick={this.toggleUpdate.bind(this)}
                        >
                            {this.state.formUpdate.visible ? "Close" : "Update"}
                        </button>
                        <AuthorityInsert
                            visible={this.state.formInsert.visible}
                        />
                        <AuthorityUpdate
                            visible={this.state.formUpdate.visible}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

class AuthorityUpdate extends Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getToken() {
        let formData = new FormData();
        formData.append("username", "hongloc");
        formData.append("password", "123");
        formData.append("grant_type", "password");
        let client = Buffer.from("jobit-client:pdlwUv6NpwFZL4gx").toString(
            "base64"
        );

        let token = await fetch("http://localhost:8080/oauth/token", {
            mode: "cors",
            method: "POST",
            headers: {
                Authorization: "Basic " + client,
                Accept: "application/json"
            },
            body: formData
        }).then(res => res);

        if (token.ok) {
            return token.json();
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let token = await this.getToken();

        let res = await fetch("http://localhost:8080/api/update/authority", {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token.access_token,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: data.get("id").toString(),
                name: data.get("name").toString()
            })
        });

        if (res.ok) {
            res = await res.json();
        }
    }

    render() {
        let visible = this.props.visible;
        return (
            <div>
                {visible ? (
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="id">
                                Enter id Authority need to update:{" "}
                            </label>
                            <input type="text" name="id" id="id" />
                            <label htmlFor="name">Authority name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoFocus
                            />
                        </div>
                        <div className="button">
                            <button type="submit" name="button">
                                Send data!
                            </button>
                        </div>
                    </form>
                ) : null}
            </div>
        );
    }
}

class AuthorityInsert extends Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getToken() {
        let formData = new FormData();
        formData.append("username", "hongloc");
        formData.append("password", "123");
        formData.append("grant_type", "password");
        let client = Buffer.from("jobit-client:pdlwUv6NpwFZL4gx").toString(
            "base64"
        );

        let token = await fetch("http://localhost:8080/oauth/token", {
            mode: "cors",
            method: "POST",
            headers: {
                Authorization: "Basic " + client,
                Accept: "application/json"
            },
            body: formData
        }).then(res => res);

        if (token.ok) {
            return token.json();
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let token = await this.getToken();

        let res = await fetch("http://localhost:8080/api/create/authority", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token.access_token,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.get("name").toString()
            })
        });

        if (res.ok) {
            res = await res.json();
        }
    }

    render() {
        let visible = this.props.visible;
        return (
            <div>
                {visible ? (
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Authority name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoFocus
                            />
                        </div>
                        <div className="button">
                            <button type="submit" name="button">
                                Send data!
                            </button>
                        </div>
                    </form>
                ) : null}
            </div>
        );
    }
}

export default Authority;
