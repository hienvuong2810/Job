import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ErrorMessage from '../utils/ErrorMessage.jsx';
import { fetchCities } from '../../actions/factorsActions.js';
import { updateSignupForm } from '../../actions/accountActions.js';

const formName = "basicAccount";

class AccountSignupForm extends React.Component {
	onInputChange(e) {
		this.props.dispatch(updateSignupForm(formName, {
			...this.props.form,
			[e.target.name]: e.target.value
		}));
	}
	
	onSelectChange(list, e) {
		this.props.dispatch(updateSignupForm(formName, {
			...this.props.form,
			[e.target.name]: list[e.target.value]
		}));
	}

	onCountryChange(list, e) {
		const props = this.props;

		props.dispatch(fetchCities(list[e.target.value].id));
		props.dispatch(updateSignupForm(formName, {
			...props.form,
			addresses: {
				...props.form.addresses,
				city: {
					...props.form.addresses.city,
					country: list[e.target.value]
				}
			}
		}));
	}

	onCityChange(list, e) {
		this.props.dispatch(updateSignupForm(formName, {
			...this.props.form,
			addresses: {
				...this.props.form.addresses,
				city: list[e.target.value]
			}
		}));
	}

	onAddressChange(e) {
		this.props.dispatch(updateSignupForm(formName, {
			...this.props.form,
			addresses: {
				...this.props.form.addresses,
				[e.target.name] : e.target.value
			}
		}));
	}

	render() {
		const {
			genders, phoneCodes, countries,
			cities, form, msg
		} = this.props;
		
		return (
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
			</Fragment>
		);
	}
}

const mapStateToProps = (store) => {
	const factors = store.factors;

	return {
		genders: factors.gender.list,
		cities: factors.city.list,
		countries: factors.country.list,
		phoneCodes: factors.phoneCode.list,
		form: store.account.signUp.form.basicAccount,
		msg: store.account.signUp.msg
	}
}

export default connect(mapStateToProps)(AccountSignupForm);