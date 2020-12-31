import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import {
    getAccounts,
    changeAccountType,
    changeAccountActive
} from "../../actions/accountActions";

import DataAdmins from "./admins/DataAdmins.jsx";
import DataCandidates from "./candidates/DataCandidates.jsx";
import DataRecruiter from "./recruiters/DataRecruiter.jsx";

class AccountsControl extends React.Component {
    async changeType(name) {
        this.props.dispatch(changeAccountActive(name));
        this.props.dispatch(changeAccountType(name));
        await this.props.dispatch(getAccounts(name));
    }

    render() {
        let active = this.props.account.active;
        return (
            <Fragment>
                <div className="grid grid-c-2-2-2">
                    <Link
                        name="admin"
                        className={
                            "btn-handle btn-act pos-rela " + active.admin
                        }
                        onClick={this.changeType.bind(this, "admin")}
                        to="/dashboard/accounts/admin/data"
                    >
                        <span className="type-account">ADMIN</span>
                    </Link>

                    <Link
                        name="candidate"
                        className={
                            "btn-handle btn-act pos-rela " + active.candidate
                        }
                        onClick={this.changeType.bind(this, "candidate")}
                        to="/dashboard/accounts/candidate/data"
                    >
                        <span className="type-account">CANDIDATE</span>
                    </Link>

                    <Link
                        name="recruiter"
                        className={
                            "btn-handle btn-act pos-rela " + active.recruiter
                        }
                        onClick={this.changeType.bind(this, "recruiter")}
                        to="/dashboard/accounts/recruiter/data"
                    >
                        <span className="type-account">RECRUITER</span>
                    </Link>
                </div>

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
        principal: store.auth.principal,
        account: store.account
    };
};

export default connect(mapStateToProps)(AccountsControl);
