import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../components/utils/Navbar.jsx';
import Loader from '../components/utils/Loader.jsx';
import { fetchUser, evictUser, VISITOR, OWNER } from '../actions/accountActions.js';
import About from '../components/accounts/About.jsx';

class UserPage extends React.Component {
	constructor(props) {
		super(props);
		const principal = props.principal;
		// check the login state, if null redirect to login page
		// otherwise, fetch the user data
		if (principal && principal.username && principal.token) {
			let { username } = props.match.params;

			username = username ? username : props.principal.username;
			props.dispatch(fetchUser(username, (props.match.params.username !== undefined ? VISITOR : OWNER)));
			return;
		}

		props.history.push("/login");
	}

	componentWillUnmount() {
		this.props.dispatch(evictUser());
		delete this.views;
	}

	render() {
		const { user } = this.props;

		return (
			<div id="user-pg">
				<Navbar id="main-nav"/>
				{
					!user ? <Loader /> : 
					!user.exist ? (
						<div className="pos-center">
							<h1 className="text-bold">404</h1>
							<h2>The username <span className="text-primary">
							{ this.props.match.params.username }</span> is not found.</h2>
						</div>
					) : user.private ? (
						<div className="pos-center">
							<h1 className="text-bold">401</h1>
							<h2>This is a <span className="text-error">private</span> resource. Access denied.</h2>
						</div>
					) : (
						<div className="content">
							<div className="padding-medium">
								<Route path="/u/:username?/about" render={(props) => <About />}/>
							</div>
							<div className="box-shadow">
								<ul className="list">
									<li><Link to={ "/u/" + user.username + "/about" }>About</Link></li>
								</ul>
							</div>
						</div>
					)
				}
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		principal: store.auth.principal,
		user: store.account.user
	}
}

export default connect(mapStateToProps)(UserPage);