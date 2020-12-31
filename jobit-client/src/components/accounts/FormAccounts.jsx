import React, { Fragment } from "react";
import { connect } from "react-redux";

class FormAccounts extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>EDIT ACCOUNT</h1>
                <div className="contact100-form">
                    <div className="wrap-input100 bg1">
                        <span className="label-input100">USERNAME</span>
                        <input
                            className="input100"
                            type="text"
                            name="username"
                            placeholder="Enter Your Name"
                        />
                    </div>

                    <div className="wrap-input100 bg1">
                        <span className="label-input100">EMAIL</span>
                        <input
                            className="input100"
                            type="text"
                            name="email"
                            placeholder="Enter Your Email"
                        />
                    </div>

                    <div className="wrap-input100 bg1">
                        <span className="label-input100">FULLNAME</span>
                        <input
                            className="input100"
                            type="text"
                            name="fullname"
                            placeholder="Enter Your Fullname"
                        />
                    </div>

                    <div className="wrap-input100 bg1 rs1-wrap-input100">
                        <span className="label-input100">PASSWORD</span>
                        <input
                            className="input100"
                            type="password"
                            name="name"
                            placeholder="Enter Your New Password"
                        />
                    </div>

                    <div className="wrap-input100 bg1 rs1-wrap-input100">
                        <span className="label-input100">CONFIRM PASSWORD</span>
                        <input
                            className="input100"
                            type="password"
                            name="name"
                            placeholder="Enter Your Confirm Password"
                        />
                    </div>

                    <div className="wrap-input100 input100-select bg1">
                        <span className="label-input100">STATUS</span>
                        <div>
                            <div className="margin-y-small">
                                <input
                                    id="radio1"
                                    type="radio"
                                    name="isExists"
                                    // value={true}
                                    // onChange={this.onChange.bind(this)}
                                    // checked={product.isExists ? true : false}
                                />
                                <label className="color-font" htmlFor="radio1">
                                    <span>
                                        <span></span>
                                    </span>
                                    Exist
                                </label>
                            </div>

                            <div className="margin-y-small">
                                <input
                                    id="radio1"
                                    type="radio"
                                    name="isExists"
                                    // value={true}
                                    // onChange={this.onChange.bind(this)}
                                    // checked={product.isExists ? true : false}
                                />
                                <label className="color-font" htmlFor="radio1">
                                    <span>
                                        <span></span>
                                    </span>
                                    Not Exist
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="wrap-input100 bg1 rs1-wrap-input100">
                        <span className="label-input100">GENDER</span>
                        <div id="app-cover">
                            <div id="select-box">
                                <input
                                    type="checkbox"
                                    id="options-view-button"
                                />
                                <div id="select-button" className="brd">
                                    <div id="selected-value">
                                        <span>Select a Gender</span>
                                    </div>
                                    <div id="chevrons">
                                        <i className="fas fa-chevron-up"></i>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div id="options">
                                    {/* {roles.map((role, key) => { */}
                                    {/* return ( */}
                                    <div className="option">
                                        <input
                                            className="s-c top"
                                            type="radio"
                                            name="code"
                                            // value={role.code}
                                            // defaultChecked={
                                            //     role.name ===
                                            //     user.role.name
                                            //         ? true
                                            //         : false
                                            // }
                                            // onChange={this.onChange.bind(
                                            //     this
                                            // )}
                                        />
                                        <input
                                            className="s-c bottom"
                                            type="radio"
                                            name="code"
                                            // value={role.code}
                                            // defaultChecked={
                                            //     role.name ===
                                            //     user.role.name
                                            //         ? true
                                            //         : false
                                            // }
                                            // onChange={this.onChange.bind(
                                            //     this
                                            // )}
                                        />
                                        <span className="label">
                                            {/* {role.name} */}
                                            Test
                                        </span>
                                        <span className="opt-val">
                                            {/* {role.name} */}
                                            <span style={{}}>Test</span>
                                        </span>
                                    </div>
                                    <div id="option-bg"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wrap-input100 bg1 rs1-wrap-input100">
                        <span className="label-input100">Role</span>
                        <div id="app-cover">
                            <div id="select-box">
                                <input
                                    type="checkbox"
                                    id="options-view-button"
                                />
                                <div id="select-button" className="brd">
                                    <div id="selected-value">
                                        <span>Select a Role</span>
                                    </div>
                                    <div id="chevrons">
                                        <i className="fas fa-chevron-up"></i>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div id="options">
                                    {/* {roles.map((role, key) => { */}
                                    {/* return ( */}
                                    <div className="option">
                                        <input
                                            className="s-c top"
                                            type="radio"
                                            name="code"
                                            // value={role.code}
                                            // defaultChecked={
                                            //     role.name ===
                                            //     user.role.name
                                            //         ? true
                                            //         : false
                                            // }
                                            // onChange={this.onChange.bind(
                                            //     this
                                            // )}
                                        />
                                        <input
                                            className="s-c bottom"
                                            type="radio"
                                            name="code"
                                            // value={role.code}
                                            // defaultChecked={
                                            //     role.name ===
                                            //     user.role.name
                                            //         ? true
                                            //         : false
                                            // }
                                            // onChange={this.onChange.bind(
                                            //     this
                                            // )}
                                        />
                                        <span className="label">
                                            {/* {role.name} */}
                                            Test
                                        </span>
                                        <span className="opt-val">
                                            {/* {role.name} */}
                                            <span style={{}}>Test</span>
                                        </span>
                                    </div>
                                    <div id="option-bg"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wrap-input100 bg1">
                        <span className="label-input100 block">PHONE</span>
                        <div id="app-cover" className="inline-block">
                            <div id="select-box">
                                <input
                                    type="checkbox"
                                    id="options-view-button"
                                    style={{ width: "25%" }}
                                />
                                <div id="select-button" className="brd">
                                    <div id="selected-value">
                                        <span>Select a Country Phone Code</span>
                                    </div>
                                    <div id="chevrons">
                                        <i className="fas fa-chevron-up"></i>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div id="options">
                                    {/* {roles.map((role, key) => { */}
                                    {/* return ( */}
                                    <div className="option">
                                        <input
                                            className="s-c top"
                                            type="radio"
                                            name="code"
                                            // value={role.code}
                                            // defaultChecked={
                                            //     role.name ===
                                            //     user.role.name
                                            //         ? true
                                            //         : false
                                            // }
                                            // onChange={this.onChange.bind(
                                            //     this
                                            // )}
                                        />
                                        <input
                                            className="s-c bottom"
                                            type="radio"
                                            name="code"
                                            // value={role.code}
                                            // defaultChecked={
                                            //     role.name ===
                                            //     user.role.name
                                            //         ? true
                                            //         : false
                                            // }
                                            // onChange={this.onChange.bind(
                                            //     this
                                            // )}
                                        />
                                        <span className="label">
                                            {/* {role.name} */}
                                            Test
                                        </span>
                                        <span className="opt-val">
                                            {/* {role.name} */}
                                            <span>Test</span>
                                        </span>
                                    </div>
                                    <div id="option-bg"></div>
                                </div>
                            </div>
                        </div>
                        <input
                            className="input65 inline-block margin-left"
                            type="tel"
                            name="phone"
                            placeholder="Enter Your Phone"
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        principal: store.auth.principal,
        account: store.account
    };
};

export default connect(mapStateToProps)(FormAccounts);
