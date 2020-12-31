import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import DataAdmins from "./admins/DataAdmins.jsx";
import DataCandidates from "./candidates/DataCandidates.jsx";
import DataRecruiter from "./recruiters/DataRecruiter.jsx";

class DataAccounts extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/accounts/admin/data"
                    render={props => <DataAdmins {...props} />}
                />

                <Route
                    path="/dashboard/accounts/candidate/data"
                    render={props => <DataCandidates {...props} />}
                />

                <Route
                    path="/dashboard/accounts/recruiter/data"
                    render={props => <DataRecruiter {...props} />}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        principal: store.auth.principal
    };
};

export default connect(mapStateToProps)(DataAccounts);
