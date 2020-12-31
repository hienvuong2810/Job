import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateAccountSignupState, updateSignupForm, signUpRecruiter } from '../../../actions/accountActions.js';
import ErrorMessage from '../../utils/ErrorMessage.jsx';
import FormControl2 from '../../utils/FormControl2.jsx';
import AccountSignupForm from '../AccountSignupForm.jsx';
import AdvancedAccountSignupForm from '../AdvancedAccountSignupForm.jsx';
import { initState } from '../../../reducers/accountReducer.js';

const formName = "recruiterAccount";

class RecruiterSignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}

	init() {
		this.props.dispatch(updateAccountSignupState("form", initState.signUp.form));
	}

	onInputChange(e) {
		this.props.dispatch(updateSignupForm(formName, {
			...this.props.form,
			[e.target.name]: e.target.value
		}));
	}

	async onSubmit() {
		let { advancedAccount, recruiterAccount } = this.props.signUp.form;
		let form = { ...this.props.signUp.form.basicAccount };

		for (let key in advancedAccount) {
			form[key] = advancedAccount[key];
		}

		for (let key in recruiterAccount) {
			form[key] = recruiterAccount[key];
		}

		const res = await this.props.dispatch(signUpRecruiter(form));

		if (res && res.ok) {
			this.props.history.push("/verify/" + form.username);
		}
	}

	componentWillUnmount() {
		this.init();
	}

	render() {
		const { form, msg } = this.props;

		return (
			<div id="sufm-cand">
				<FormControl2 content={
					<Fragment>
						<AccountSignupForm />
						<h2 className="text-center text-default"><u>
						<i className="fas fa-user margin-x-small"></i>Additional informations</u></h2>
						<div className="field">
							<label forhtml="sufm-rec-ctn">Contact name</label>
							<input name="contactName" id="sufm-rec-ctn" required="required"
							onChange={ this.onInputChange.bind(this) } value={ form.contactName }/>
							<ErrorMessage content={ msg.contactName } />
						</div>
						<div className="field">
							<label forhtml="sufm-rec-ctnr">Contact number</label>
							<input name="contactPhonenumber" id="sufm-rec-ctnr" required="required"
							onChange={ this.onInputChange.bind(this) } value={ form.contactPhonenumber }/>
							<ErrorMessage content={ msg.contactPhonenumber } />
						</div>
						<AdvancedAccountSignupForm />
						<div className="margin-y-medium border-none text-right">
						<button className="btn btn-black"
						onClick={ this.onSubmit.bind(this) }>Submit</button></div>
					</Fragment>
				}/>
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	const { signUp } = store.account;

	return {
		signUp,
		form: signUp.form.recruiterAccount,
		msg: signUp.msg
	}
}

export default connect(mapStateToProps)(RecruiterSignupForm);