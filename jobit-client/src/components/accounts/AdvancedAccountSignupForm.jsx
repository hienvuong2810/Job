import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateSignupForm } from '../../actions/accountActions.js';

const formName = "advancedAccount";

class AdvancedAccountSignupForm extends React.Component {
	onInputChange(e) {
		this.props.dispatch(updateSignupForm(formName, {
			...this.props.form,
			[e.target.name]: e.target.value
		}));
	}

	onOtherLinksChange(e) {
		const value = e.target.value;

		this.props.dispatch(updateSignupForm(formName, {
			...this.props.form,
			otherLinks: value.split(/,/i)
		}));
	}

	render() {
		const { form } = this.props;

		return (
			<Fragment>
				<h2 className="text-center text-default"><u>
				<i className="fas fa-globe margin-x-small"></i>Social References</u></h2>
				<div className="field">
					<label forhtml="sufm-cand-git">Github Link</label>
					<input name="githubLink" id="sufm-cand-git" required="required"
					onChange={ this.onInputChange.bind(this) } value={ form.githubLink }/>
				</div>
				<div className="field">
					<label forhtml="sufm-cand-git">Facebook Link</label>
					<input name="facebookLink" id="sufm-cand-fb" required="required"
					onChange={ this.onInputChange.bind(this) } value={ form.facebookLink }/>
				</div>
				<div className="field">
					<label forhtml="sufm-cand-twt">Twitter Link</label>
					<input name="twitterLink" id="sufm-cand-twt" required="required"
					onChange={ this.onInputChange.bind(this) } value={ form.twitterLink }/>
				</div>
				<div className="field">
					<label forhtml="sufm-cand-lki">LinkedIn Link</label>
					<input name="linkedinLink" id="sufm-cand-lki" required="required"
					onChange={ this.onInputChange.bind(this) } value={ form.linkedinLink }/>
				</div>
				<div className="field">
					<label forhtml="sufm-cand-stk">Stackoverflow Link</label>
					<input name="stackoverflowLink" id="sufm-cand-stk" required="required"
					onChange={ this.onInputChange.bind(this) } value={ form.stackoverflowLink }/>
				</div>
				<div className="field">
					<label forhtml="sufm-cand-wl">Web Link</label>
					<input name="webLink" id="sufm-cand-wl" required="required"
					onChange={ this.onInputChange.bind(this) } value={ form.webLink }/>
				</div>
				<div className="field">
					<label forhtml="sufm-cand-otl">Other Links</label>
					<input name="otherLinks" id="sufm-cand-otl" required="required"
					onChange={ this.onOtherLinksChange.bind(this) } />
				</div>
			</Fragment>	
		);
	}
}

const mapStateToProps = (store) => {
	return {
		form: store.account.signUp.form.advancedAccount
	}
}

export default connect(mapStateToProps)(AdvancedAccountSignupForm);