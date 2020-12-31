import React from 'react';
import { Route } from 'react-router-dom';
import CandidateSignupForm from '../components/accounts/candidates/CandidateSignupForm.jsx';
import RecruiterSignupForm from '../components/accounts/recruiters/RecruiterSignupForm.jsx';
import { connect } from 'react-redux';
import { updateUI } from '../actions/UIActions';
import { fetchFactors, init } from '../actions/factorsActions';
import { initState } from '../reducers/factorsReducer.js';

const CANDIDATE = "candidate", RECRUITER = "recruiter";
const PATH = "/signup"
const CHILD_PATHS = "/signup/candidate";
const RECRUITER_PATH = "/signup/recruiter";
const headerStyle = {
	[CHILD_PATHS]: {
		backgroundColor: "var(--primary)",
		color: "white"
	},
	[RECRUITER_PATH]: {
		backgroundColor: "var(--black)",
		color: "white"
	}
}
const headerText = {
	[PATH] : "",
	[CHILD_PATHS] : "Create your Job seeker account",
	[RECRUITER_PATH] : "Create a Recruiter account"
}

class SignupPage extends React.Component {
	constructor(props) {
		super(props);

		if (props.principal) {
			props.history.push("/");
			return;
		}

		props.dispatch(fetchFactors());
	}

	componentWillUnmount() {
		this.props.dispatch(init(initState));
	}

	onTypeSelect(type) {
		const props = this.props;

		props.dispatch(updateUI("signUpPage", {
			...props.UI,
			navOn: false
		}));

		setTimeout(() => {
			props.history.push("/signup/" + type);
			props.dispatch(updateUI("signUpPage", {
				...props.UI,
				navOn: true
			}));
		}, 200);
	}

	render() {
		const UI = this.props.UI;
		const { pathname } = this.props.location;

		return (
			<div id="sufm-page">
				<div className="header text-default"
				style={ headerStyle[pathname] }>
					<h2 className="margin-y-medium">
					<i className="fab fa-connectdevelop margin-x-small spin"></i>talenthub</h2>
				</div>
				<h3 className="text-center text-default margin-none margin-top">
				{ headerText[pathname] }</h3>
				<Route path="/signup" exact render={(props) => {
					return (
						<div id="sufm-typenav" className={ "divider" + (UI.navOn ? "" : " fadeOut") }>
							<div className="item" id="sufm-typenav-cand"
							onClick={ this.onTypeSelect.bind(this, CANDIDATE)}>
								<div>
									<p><i className="fas fa-user-graduate">
									</i></p>
									<p>Join as a Job Seeker</p>
								</div>
							</div>
							<div className="item" id="sufm-typenav-rec"
							onClick={ this.onTypeSelect.bind(this, RECRUITER)}>
								<div>
									<p><i className="fas fa-user-tie">
									</i></p>
									<p>Join as a Recruiter</p>
								</div>
							</div>
						</div>
					);
				}}/>
				<Route path="/signup/candidate" render={(props) => <CandidateSignupForm {...props} />}/>
				<Route path="/signup/recruiter" render={(props) => <RecruiterSignupForm {...props} />}/>
			</div>
		);
	}
}

const map = (store) => {
	return {
		UI: store.UI.signUpPage,
		principal: store.auth.principal
	};
}

export default connect(map)(SignupPage);