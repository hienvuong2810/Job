import React, { Fragment } from "react";
import { node } from "../config.json";
import ErrorMessage from "../components/utils/ErrorMessage.jsx";
import { Link } from "react-router-dom";

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);

        const username = props.match.params.id;

        this.state = {
            ok: false,
            username: username,
            id: username ? username : "",
            code: "",
            msg: ""
        };
    }

    onInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit() {
        const res = await fetch(
            node +
                "/api/account/verify?code=" +
                this.state.code +
                "&id=" +
                this.state.id,
            {
                mode: "cors",
                method: "PUT"
            }
        );

        if (res.ok) {
            this.setState({
                ok: true
            });

            return;
        }

        this.setState({
            msg: await res.text()
        });
    }

    render() {
        return (
            <div id="veri-page">
                <img alt="verify-img" src="/img/verify.jpg" />
                <div className="overlay">
                    <div className="modal">
                        <div className="header text-default grid grid-c-3-3">
                            <div>
                                <h2 className="margin-y-medium">
                                    <i className="fab fa-connectdevelop margin-x-small"></i>
                                    <span className="text-primary">talent</span>
                                    hub
                                </h2>
                            </div>
                            <div>
                                <h2 className="margin-y-medium">
                                    Verify your talenthub account
                                </h2>
                            </div>
                        </div>
                        <div className="content">
                            {!this.state.ok ? (
                                <Fragment>
                                    <h3 className="text-center text-default margin-y-medium">
                                        Check your email and enter the
                                        verification code below.
                                    </h3>
                                    <div className="form-control form-control-1 margin-y-medium">
                                        {!this.state.username ? (
                                            <div className="field">
                                                <input
                                                    name="id"
                                                    id="id"
                                                    required="required"
                                                    value={this.state.id}
                                                    onChange={this.onInputChange.bind(
                                                        this
                                                    )}
                                                />
                                                <label forhtml="Username">
                                                    Username
                                                </label>
                                            </div>
                                        ) : (
                                            <h3 className="text-center text-bold">
                                                {this.state.username}
                                            </h3>
                                        )}
                                        <div className="field">
                                            <input
                                                name="code"
                                                id="code"
                                                required="required"
                                                value={this.state.code}
                                                onChange={this.onInputChange.bind(
                                                    this
                                                )}
                                            />
                                            <label forhtml="code">
                                                Verification code
                                            </label>
                                            <ErrorMessage
                                                content={this.state.msg}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.onSubmit.bind(this)}
                                        >
                                            Verify
                                        </button>
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <h3 className="text-center">
                                        Your account is activated!
                                    </h3>
                                    <div className="text-center margin-y-medium">
                                        <button className="btn btn-primary width-medium">
                                            <Link to="/login">Login here</Link>
                                        </button>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerificationPage;
