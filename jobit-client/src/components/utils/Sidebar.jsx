import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { refreshAccountActive } from "../../actions/accountActions";

class Sidebar extends React.Component {
    refreshActive() {
        this.props.dispatch(refreshAccountActive());
    }
    render() {
        return (
            <div id="sidebar">
                <div className="grid grid-c-4-2 item">
                    <div>
                        <h2>Dashboard</h2>
                    </div>
                    <div className="text-right">
                        <h2>
                            <i className="fab fa-connectdevelop margin-x-small"></i>
                        </h2>
                    </div>
                </div>
                <div className="nav custom-scrollbar">
                    <ul>
                        <li>
                            <Link to="/dashboard/factors">
                                <div>Factors</div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/accounts"
                                onClick={this.refreshActive.bind(this)}
                            >
                                <div>Accounts</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="item">
                    <h1>Footer</h1>
                </div>
            </div>
        );
    }
}

export default connect()(Sidebar);
