import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import Sidebar from "../components/utils/Sidebar.jsx";
import Loader from "../components/utils/Loader.jsx";

import FactorsControl from "../components/factors/FactorsControl.jsx";
import AccountsControl from "../components/accounts/AccountsControl.jsx";

class AdminDashboard extends React.Component {
	constructor(props) {
		super(props);

		if (props.principal === null) {
			props.history.push("/login");
            return;
		}
    }

    render() {
        return this.props.principal === null ? (
            <Loader />
        ) : (
            <div id="dsbd-admin" className="grid grid-c-1-5">
                <div>
                    <Sidebar />
                </div>
                <div className="height-max padding-medium text-default">
                    <Route
                        path="/dashboard/factors"
                        render={props => <FactorsControl {...props} />}
                    />

                    <Route
                        path="/dashboard/accounts"
                        render={props => <AccountsControl {...props} />}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        principal: store.auth.principal
    };
};

export default connect(mapStateToProps)(AdminDashboard);
