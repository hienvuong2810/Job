import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateAccountSignupState, updateSignupForm, signUpCandidate } from '../../../actions/accountActions.js';
import ErrorMessage from '../../utils/ErrorMessage.jsx';
import FormControl2 from '../../utils/FormControl2.jsx';
import AccountSignupForm from '../AccountSignupForm.jsx';
import AdvancedAccountSignupForm from '../AdvancedAccountSignupForm.jsx';
import { initState } from '../../../reducers/accountReducer.js';

const formName = "candidateAccount";

class CandidateSignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	init() {
		this.props.dispatch(updateAccountSignupState("form", initState.signUp.form));
	}

	onInputChange(e) {
		this.props.dispatch(updateSignupForm(formName, {
			...this.props.signUp.form[formName],
			[e.target.name]: e.target.value
		}));
	}

	onOpenStatusChange(e) {
		this.props.dispatch(updateSignupForm(formName, {
			...this.props.signUp.form[formName],
			isOpen: (e.target.value === "true" ? true : false)
		}));
	}

	async onSubmit() {
		let { advancedAccount, candidateAccount } = this.props.signUp.form;
		let form = { ...this.props.signUp.form.basicAccount };

		for (let key in advancedAccount) {
			form[key] = advancedAccount[key];
		}

		for (let key in candidateAccount) {
			form[key] = candidateAccount[key];
		}

		const res = await this.props.dispatch(signUpCandidate(form));

		if (res && res.ok) {
			this.props.history.push("/verify/" + form.username);
		}
	}

	componentWillUnmount() {
		this.init();
	}

	render() {
		const msg = this.props.signUp.msg;
		const form = this.props.signUp.form[formName];

		return (
			<div id="sufm-cand">
				<FormControl2 content={
					<Fragment>
						<AccountSignupForm />
						<h2 className="text-center text-default"><u>
						<i className="fas fa-user margin-x-small"></i>Personnal informations</u></h2>
						<div className="field">
							<label forhtml="sufm-cand-dob">Birthday</label>
							<input name="dob" id="sufm-cand-dob" required="required" type="date"
							dateformat="yyyy MM dd" onChange={ this.onInputChange.bind(this) }
							value={ form.dob }/>
							<ErrorMessage content={ msg.dob } />
						</div>
						<div className="field">
							<label forhtml="sufm-cand-tle">Title</label>
							<input name="title" id="sufm-cand-tle" required="required"
							onChange={ this.onInputChange.bind(this) } value={ form.title }/>
							<ErrorMessage content={ msg.title } />
						</div>
						<div className="field">
							<label forhtml="sufm-cand-resm">Resume</label>
							<input name="resume" id="sufm-cand-resm" required="required"
							onChange={ this.onInputChange.bind(this) } value={ form.resume }/>
						</div>
						<div className="field">
							<p className="text-primary margin-y-small">Are you seeking for a job?</p>
							<select onChange={ this.onOpenStatusChange.bind(this) }
							name="isOpen">
								<option value={ true }>Yes</option>
								<option value={ false }>No</option>
							</select>
							<ErrorMessage content={ msg.isOpen } />
						</div>
						<AdvancedAccountSignupForm />
						<div className="margin-y-medium border-none text-right">
						<button className="btn btn-primary"
						onClick={ this.onSubmit.bind(this) }>Submit</button></div>
					</Fragment>
				}/>
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		signUp: store.account.signUp,
		factors: store.factors
	};
}

export default connect(mapStateToProps)(CandidateSignupForm);