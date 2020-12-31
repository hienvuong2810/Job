import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import FormControl2 from "../components/utils/FormControl2.jsx";
import ErrorMessage from "../components/utils/ErrorMessage.jsx";
import { connect } from "react-redux";
import { updateLogin, authorize } from "../actions/authActions.js";
// eslint-disable-next-line
import { initState } from "../reducers/authReducer.js";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        if (props.principal) {
            props.history.push("/");
            return;
        }
    }

    onKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }

    onInputChange(e) {
        this.props.dispatch(
            updateLogin({
                ...this.props.login,
                form: {
                    ...this.props.login.form,
                    [e.target.name]: e.target.value
                }
            })
        );
    }

    componentWillUnmount() {
        this.props.dispatch(updateLogin(initState.login));
    }

    validateForm() {
        const { form } = this.props.login;
        let flag = false;

        if (!form) return false;

        let msg = { ...this.props.login.msg };

        if (form.id) {
            if (form.id.length < 8 || form.id.length > 32) {
                flag = false;
                msg.id = "Invalid Username.";
            } else {
                flag = true;
                msg.id = "";
            }
        } else {
            flag = false;
            msg.id = "Invalid Username.";
        }

        if (form.password) {
            if (form.password.length < 10) {
                flag = false;
                msg.password = "Invalid Password.";
            } else {
                flag = true;
                msg.password = "";
            }
        } else {
            flag = false;
            msg.password = "Invalid Password";
        }

        this.props.dispatch(
            updateLogin({
                ...this.props.login,
                msg
            })
        );

        return flag;
    }

    async onSubmit() {
        if (this.validateForm()) {
            const props = this.props;
            let msg = { ...props.msg };

            const res = await props.dispatch(authorize({
                ...props.login.form
            }));

            if (!res)
                return;

            switch(res) {
                case 200: {
                    props.history.push("/");
                    break;
                }
                case 401: {
                    msg = { ...msg, id: "Username not found.", password: "" }
                    break;
                }
                case 400: {
                    msg = { ...msg, id: "", password: "Invalid password." }   
                    break;
                }
                case 409: {
                    props.history.push("/verify/" + props.login.form.id);
                    return;
                }
                default: return;
            }

            props.dispatch(updateLogin({
                ...props.login,
                msg
            }));
        }
    }

    render() {
        const form = this.props.login.form;
        const msg = this.props.login.msg;

        return (
            <div id="lgfm-page pos-rela">
                <div className="pos-center" style={{ fontSize: "700px", zIndex: -1 }}>
                    <i className="fab fa-connectdevelop pos-center text-default"></i>
                </div>
                <div className="pos-center box-shadow padding-medium width-xlarge bg-white">
                    <div className="header text-center text-primary">
                        <h1 className="margin-none">
                            <span className="text-primary">talent</span>hub
                        </h1>
                        <h2>Login</h2>
                    </div>
                    <div>
                        <FormControl2
                            content={
                                <Fragment>
                                    <div className="field">
                                        <label forhtml="lgfm-id">
                                            Username
                                        </label>
                                        <ErrorMessage content={msg.id} />
                                        <input
                                            name="id"
                                            id="lgfm-id"
                                            required="required"
                                            onKeyUp={ this.onKeyUp.bind(this) }
                                            onChange={this.onInputChange.bind(
                                                this
                                            )}
                                            value={form.id}
                                        />
                                    </div>
                                    <div className="field">
                                        <label forhtml="lgfm-psw">
                                            Password
                                        </label>
                                        <ErrorMessage content={msg.password} />
                                        <input
                                            name="password"
                                            id="lgfm-psw"
                                            required="required"
                                            type="password"
                                            onKeyUp={ this.onKeyUp.bind(this) }
                                            onChange={this.onInputChange.bind(
                                                this
                                            )}
                                            value={form.password}
                                        />
                                    </div>
                                </Fragment>
                            }
                        />
                    </div>
                    <div className="grid grid-c-3-3">
                        <div>
                            <p className="margin-none margin-bottom">
                                <Link to="/signup">Sign up</Link>
                            </p>
                            <p>
                                <Link to="/">Forgot password</Link>
                            </p>
                        </div>
                        <div className="text-right">
                            <button
                                className="btn btn-primary"
                                onClick={this.onSubmit.bind(this)}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        login: store.auth.login,
        principal: store.auth.principal
    };
};

export default connect(mapStateToProps)(LoginPage);
