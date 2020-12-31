import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateSignupForm, signUpCandidate } from '../../actions/candidateActions.js';
import { fetchCities } from '../../actions/factorsActions.js';
import FormControl2 from '../utils/FormControl2.jsx';
import ErrorMessage from '../utils/ErrorMessage.jsx';

class CandidateSignupForm extends React.Component {
	onInputChange(e) {
		this.props.dispatch(updateSignupForm(e.target.name, e.target.value));
	}

	onSelectChange(list, e) {
		this.props.dispatch(updateSignupForm(e.target.name, list[e.target.value]));
	}

	onCountryChange(list, e) {
		const props = this.props;

		props.dispatch(fetchCities(list[e.target.value].id));
		props.dispatch(updateSignupForm("addresses", {
			...props.signUp.form.addresses,
			city: {
				...props.signUp.form.addresses.city,
				country: list[e.target.value]
			}
		}));
	}

	onCityChange(list, e) {
		this.props.dispatch(updateSignupForm("addresses", {
			...this.props.signUp.form.addresses,
			city: list[e.target.value]
		}));
	}

	onAvatarChange(blob) {
		this.props.dispatch(updateSignupForm("avatar", blob));
	}

	onAddressChange(e) {
		this.props.dispatch(updateSignupForm("addresses", {
			...this.props.signUp.form.addresses,
			[e.target.name] : e.target.value
		}));
	}

	onOpenStatusChange(e) {
		this.props.dispatch(updateSignupForm("isOpen", (e.target.value === "true" ? true : false)));
	}

	onOtherLinksChange(e) {
		const value = e.target.value;

		this.props.dispatch(updateSignupForm("otherLinks", value.split(/,/i)));
	}

	async onSubmit() {
		// eslint-disable-next-line
		const res = await this.props.dispatch(signUpCandidate(this.props.signUp.form));
	}

	render() {
		const { form, msg } = this.props.signUp;
		const factors = this.props.factors;
		let genders = factors.gender.list;
		let countries = factors.country.list;
		let cities = factors.city.list;
		let phoneCodes = factors.phoneCode.list;

		return (
			<div id="sufm-cand">
				<FormControl2 content={
					<Fragment>
						<h2 className="text-center text-default"><u>
						<i className="fas fa-info-circle margin-x-small"></i>Account informations</u></h2>
						<div className="field">
							<label forhtml="sufm-cand-id">Username</label>
							<ErrorMessage content={ msg.username } />
							<input name="username" id="sufm-cand-id" required="required"
							onChange={ this.onInputChange.bind(this) } value={ form.username }/>
						</div>
						<div className="grid grid-c-3-3">
							<div className="field">
								<label forhtml="sufm-cand-email">Email</label>
								<ErrorMessage content={ msg.email } />
								<input name="email" id="sufm-cand-email" required="required"
								onChange={ this.onInputChange.bind(this) } value={ form.email }/>
							</div>
							<div className="field">
								<label forhtml="sufm-cand-phone">Phone</label>
								<ErrorMessage content={ msg.phone } />
								<input name="phone" id="sufm-cand-phone" required="required"
								onChange={ this.onInputChange.bind(this) } value={ form.phone }/>
							</div>
						</div>
						<div className="field">
							<label forhtml="sufm-cand-fullname">Fullname</label>
							<ErrorMessage content={ msg.fullname } />
							<input name="fullname" id="sufm-cand-fullname" required="required"
							onChange={ this.onInputChange.bind(this) } value={ form.fullname }/>
						</div>
						<div className="field">
							<p className="text-primary margin-y-small">Country Phone Code</p>
							<select onChange={ this.onSelectChange.bind(this, phoneCodes) }
							name="countryPhoneCode">
								{
									phoneCodes.map((code, index) => {
										return <option key={ code.id }
										value={ index }>{ code.phoneCode } - { code.name }</option>
									})
								}
							</select>
							<ErrorMessage content={ msg.countryPhoneCode } />
						</div>
						<div className="field">
							<p className="text-primary margin-y-small">Gender</p>
							<select onChange={ this.onSelectChange.bind(this, genders) }
							name="gender" defaultValue={0}>
								{
									genders.map((gender, index) => {
										return <option key={ gender.id }
										value={ index }>{ gender.name }</option>
									})
								}
							</select>
							<ErrorMessage content={ msg.gender } />
						</div>
						<div className="grid grid-c-3-3">
							<div className="field">
								<label forhtml="sufm-cand-pw">Password</label>
								<input name="password" id="sufm-cand-pw" required="required"
								onChange={ this.onInputChange.bind(this) } value={ form.password }
								type="password"/>
								<ErrorMessage content={ msg.password } />
							</div>
							<div className="field">
								<label forhtml="sufm-cand-rpw">Re-password</label>
								<input name="rePassword" id="sufm-cand-rpw" required="required"
								onChange={ this.onInputChange.bind(this) } value={ form.rePassword }
								type="password"/>
								<ErrorMessage content={ msg.rePassword } />
							</div>
						</div>
						<h2 className="text-center text-default"><u>
						<i className="fas fa-user margin-x-small"></i>Personnal informations</u></h2>
						<ErrorMessage content={ msg.addresses } />
						<div className="grid grid-c-3-3">
							<div className="field">
								<label forhtml="sufm-cand-bis">Bis</label>
								<input name="bis" id="sufm-cand-bis" required="required"
								onChange={ this.onAddressChange.bind(this) } value={ form.addresses.bis }/>
							</div>
							<div className="field">
								<label forhtml="sufm-cand-street">Street</label>
								<input name="street" id="sufm-cand-street" required="required"
								onChange={ this.onAddressChange.bind(this) } value={ form.addresses.street }/>
							</div>
						</div>
						<div className="grid grid-c-3-3">
							<div className="field">
								<p className="text-primary margin-y-small">Country</p>
								<select onChange={ this.onCountryChange.bind(this, countries) }
								name="country">
									{
										countries.map((country, index) => {
											return <option key={ country.id }
											value={ index }>{country.name}</option>
										})
									}
								</select>
								<ErrorMessage content={ msg.country } />
							</div>
							<div className="field">
								<p className="text-primary margin-y-small">City</p>
								<select onChange={ this.onCityChange.bind(this, cities) }
								name="city">
									{
										cities.map((city, index) => {
											return <option key={ city.id }
											value={ index }>{city.name}</option>
										})
									}
								</select>
								<ErrorMessage content={ msg.city } />
							</div>
						</div>
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
						<div className="field">
							<p className="text-primary margin-y-small">Are you seeking for a job?</p>
							<select onChange={ this.onOpenStatusChange.bind(this) }
							name="isOpen">
								<option value={ true }>Yes</option>
								<option value={ false }>No</option>
							</select>
							<ErrorMessage content={ msg.isOpen } />
						</div>
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
		signUp: store.candidate.signUp,
		factors: store.factors
	};
}

export default connect(mapStateToProps)(CandidateSignupForm);