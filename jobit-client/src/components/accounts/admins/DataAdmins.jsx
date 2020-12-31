import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TableA from "../../utils/TableA.jsx";

class DataAdmins extends React.Component {
    render() {
        const accounts = this.props.account.accounts;
        return (
            <Fragment>
                <TableA
                    head={
                        <thead>
                            <tr>
                                <th></th>
                                <th>USERNAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                    }
                    body={
                        <Fragment>
                            {accounts.map((acc, key) => {
                                return (
                                    <tr
                                        key={key}
                                        style={{ textAlign: "center" }}
                                    >
                                        <td>{key + 1}</td>
                                        <td>{acc.username}</td>
                                        <td>{acc.email}</td>
                                        <td>
                                            {acc.countryPhoneCode.phoneCode +
                                                " " +
                                                acc.phone.replace(/^0+/, "")}
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    acc.active
                                                        ? "circle check"
                                                        : "circle uncheck"
                                                }
                                            ></div>
                                        </td>
                                        <td>
                                            <Link to="/dashboard/accounts/form">
                                                <i className="fas fa-edit pointer"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </Fragment>
                    }
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

export default connect(mapStateToProps)(DataAdmins);
