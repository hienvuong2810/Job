import React, { Fragment } from 'react';
import TableA from '../utils/TableA.jsx';
import { connect } from 'react-redux';
import { updateAuthority } from '../../actions/factorsActions.js';

import { validateAuthority, validateGender, validateRole } from '../../validators/factorsValidators.js';

import { getFactors, updateFactors, createFactors } from '../../actions/factorsActions.js';

class FactorsControl extends React.Component {

	async componentDidMount() {
		await this.props.dispatch(getFactors('gender'));
		await this.props.dispatch(getFactors('authority'));
		await this.props.dispatch(getFactors('role'));
	}

	render() {
		const props = this.props;
		return (
			<Fragment>
				<AuthorityControl principal={ props.principal } authority={ props.factors.authority } dispatch={ props.dispatch }/>
				<GenderControl gender={ props.factors.gender } dispatch={ props.dispatch }/>
				<RoleControl role={ props.factors.role } dispatch={ props.dispatch }/>
			</Fragment>
		);
	}
}

//low-level component
class AuthorityControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formVisible: false,
			formUpdateVisible: false
		}
	}

	async componentDidMount() {
		// await this.props.dispatch(fetchAuthorities());
	}

	onChange2(e) {
		this.props.dispatch(updateAuthority("authority", {
			...this.props.authority,
			form: {
				...this.props.authority.form,
				[e.target.name]: e.target.value
			}
		}))
	}

	onChange(e) {
		console.log(e.target.value);
		this.props.dispatch(updateFactors("authority", {
			...this.props.authority,
			form: {
				...this.props.authority.form,
				[e.target.name]: e.target.value
			}
		}))
	}

	toggleForm() {
		this.setState({
			formVisible: !this.state.formVisible
		})
	}
	
	submit() {
		const auth = {
			name: this.props.authority.form.name,
			createdBy: this.props.authority.form.createdBy,
			createdOn: this.props.authority.form.createdOn
		}

		if (validateAuthority(auth)) {
			console.log("ok");
			// console.log(auth.name + ", " + auth.createdOn);

			this.props.dispatch(createFactors("authority", {
				...this.props.authority,
				form: {
					...this.props.authority.form,
					id: "",
					name: ""
				},
				newElement: {
					name: auth.name,
					createdBy: auth.createdBy,
					createdOn: auth.createdOn
				}
			}));
		}
	}

	update(id, name) {
		this.props.dispatch(updateFactors("authority", {
			...this.props.authority,
			action: "update",
			form: {
				...this.props.authority.form,
				id: id,
				name: name
			}
		}));
	}

	submitUpdate() {
		let newList = [...this.props.authority.list];
		var id;
		var name;
		var createdBy;
		var createdOn;
		newList.map(ele => function() {
			if (ele.id === this.props.authority.form.id) {
				ele.name = this.props.authority.form.name;
				id = ele.id;
				name = ele.name;
				createdBy = ele.createdBy;
				createdOn = ele.createdOn;
			}
		})
		this.props.dispatch(updateFactors("authority", {
			...this.props.authority,
			list: newList,
			action: "create",
			form: {
				...this.props.authority.form,
				id: "",
				name: ""
			},
			newElement: {
				id: id,
				name: name,
				createdBy: createdBy,
				createdOn: createdOn
			}
		}));
	}

	render() {
		const props = this.props;
		const form = props.authority.form;
		const formVisible = this.state.formVisible;

		return (
			<div>
				<div>
					<p><u className="text-h2">Authorities</u>
					<span>{ props.authority.list.length } total</span></p>
				</div>
				{
					(props.authority.list.length !== 0 ?
						<Fragment>
							<TableA head={
								<Fragment>
									<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th>Created by</th>
											<th>Created on</th>
										</tr>
									</thead>
								</Fragment>
							} body={
								<Fragment>
									{
										props.authority.list.map(auth => {
											return <tr key={ auth.id }>
												<td>{ auth.id }</td>
												<td>{
													(props.authority.action === "create" ? auth.name : ((auth.id === props.authority.form.id ? <input name="name" onChange={this.onChange.bind(this)} value={props.authority.form.name} /> : auth.name)))
												}</td>
												<td className="pointer">{ auth.createdBy }</td>
												<td>{ auth.createdOn }</td>
												<td>
													<button type="button" className="btn btn-primary" onClick={
														props.authority.action === "create" ?
														this.update.bind(this, auth.id, auth.name)
														:
														this.submitUpdate.bind(this)
													}>
														{
															(props.authority.action === "create" ? "Update" : (auth.id === props.authority.form.id ? "Submit" : "Update"))
														}
													</button>
												</td>
											</tr>;
										})
									}
								</Fragment>
							} id="fcts-auths-list" form={(formVisible ?
								<tr className="text-primary box-shadow">
									<td>Auto generated</td>
									<td><input value={ form.name } name="name"
									onChange={ this.onChange2.bind(this) }
									className="input-plain"/></td>
									<td>ngochuyou</td>
									<td>Nov 10 2019</td>
								</tr> : null )}/>
							<div className="text-right">
								{
									(formVisible ?
									<button className="btn btn-roof"
									onClick={ this.submit.bind(this) }>
									Go</button> : null)
								}
								<button className="btn btn-primary margin-x-small"
								onClick={ this.toggleForm.bind(this) }>
								{ (formVisible ? "Cancel" : "Add") } </button>
							</div>
						</Fragment>
					: <h3>No Authority types found.</h3>)
				}
			</div>
		);
	}
}

//low-level component
class GenderControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formVisible: false,
			formUpdateVisible: false
		}
	}

	async componentDidMount() {
		// await this.props.dispatch(fetchAuthorities(this.props.principal.token));
	}

	onChange2(e) {
		this.props.dispatch(updateAuthority("gender", {
			...this.props.gender,
			form: {
				...this.props.gender.form,
				[e.target.name]: e.target.value
			}
		}))
	}

	onChange(e) {
		console.log(e.target.value);
		this.props.dispatch(updateFactors("gender", {
			...this.props.gender,
			form: {
				...this.props.gender.form,
				[e.target.name]: e.target.value
			}
		}))
	}

	toggleForm() {
		this.setState({
			formVisible: !this.state.formVisible
		})
	}


	submit() {
		const auth = {
			name: this.props.gender.form.name
		}

		if (validateGender(auth)) {
			console.log("ok");
			// console.log(auth.name + ", " + auth.createdOn);

			this.props.dispatch(createFactors("gender", {
				...this.props.gender,
				form: {
					...this.props.gender.form,
					name: ""
				},
				newElement: {
					name: auth.name
				}
			}));
		}
	}

	update(id, name) {
		this.props.dispatch(updateFactors("gender", {
			...this.props.gender,
			action: "update",
			form: {
				...this.props.gender.form,
				id: id,
				name: name
			}
		}));
	}

	submitUpdate() {
		let newList = [...this.props.gender.list];
		var id;
		var name;
		newList.map(ele => function() {
			if (ele.id === this.props.gender.form.id) {
				ele.name = this.props.gender.form.name;
				id = ele.id;
				name = ele.name;
			}

		})
		this.props.dispatch(updateFactors("gender", {
			...this.props.gender,
			list: newList,
			action: "create",
			form: {
				...this.props.gender.form,
				name: ""
			},
			newElement: {
				id: id,
				name: name
			}
		}));
	}

	render() {
		const props = this.props;
		const form = props.gender.form;
		const formVisible = this.state.formVisible;

		return (
			<div>
				<div>
					<p><u className="text-h2">Genders</u>
					<span>{ props.gender.list.length } total</span></p>
				</div>
				{
					(props.gender.list.length !== 0 ?
						<Fragment>
							<TableA head={
								<Fragment>
									<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
										</tr>
									</thead>
								</Fragment>
							} body={
								<Fragment>
									{
										props.gender.list.map(auth => {
											return <tr key={ auth.id }>
												<td>{ auth.id }</td>
												<td>{
													(props.gender.action === "create" ? auth.name : ((auth.id === props.gender.form.id ? <input name="name" onChange={this.onChange.bind(this)} value={props.gender.form.name} /> : auth.name)))
												}</td>
												<td>
													<button type="button" className="btn btn-primary" onClick={
														props.gender.action === "create" ?
														this.update.bind(this, auth.id, auth.name)
														:
														this.submitUpdate.bind(this)
													}>
														{
															(props.gender.action === "create" ? "Update" : (auth.id === props.gender.form.id ? "Submit" : "Update"))
														}
													</button>
												</td>
											</tr>;
										})
									}
								</Fragment>
							} id="fcts-auths-list" form={(formVisible ?
								<tr className="text-primary box-shadow">
									<td>Auto generated</td>
									<td><input value={ form.name } name="name"
									onChange={ this.onChange2.bind(this) }
									className="input-plain"/></td>
									<td>ngochuyou</td>
									<td>Nov 10 2019</td>
								</tr> : null )}/>
							<div className="text-right">
								{
									(formVisible ?
									<button className="btn btn-roof"
									onClick={ this.submit.bind(this) }>
									Go</button> : null)
								}
								<button className="btn btn-primary margin-x-small"
								onClick={ this.toggleForm.bind(this) }>
								{ (formVisible ? "Cancel" : "Add") } </button>
							</div>
						</Fragment>
					: <h3>No Gender types found.</h3>)
				}
			</div>
		);
	}
}

//low-level component
class RoleControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formVisible: false,
			formUpdateVisible: false
		}
	}

	async componentDidMount() {
		// await this.props.dispatch(fetchAuthorities(this.props.principal.token));
	}

	onChange2(e) {
		this.props.dispatch(updateAuthority("role", {
			...this.props.role,
			form: {
				...this.props.role.form,
				[e.target.name]: e.target.value
			}
		}))
	}

	onChange(e) {
		console.log(e.target.value);
		this.props.dispatch(updateFactors("role", {
			...this.props.role,
			form: {
				...this.props.role.form,
				[e.target.name]: e.target.value
			}
		}))
	}

	toggleForm() {
		this.setState({
			formVisible: !this.state.formVisible
		})
	}


	submit() {
		const auth = {
			name: this.props.role.form.name
		}

		if (validateRole(auth)) {
			console.log("ok");
			// console.log(auth.name + ", " + auth.createdOn);

			this.props.dispatch(createFactors("role", {
				...this.props.role,
				form: {
					...this.props.role.form,
					name: ""
				},
				newElement: {
					name: auth.name
				}
			}));
		}
	}

	update(id, name) {
		this.props.dispatch(updateFactors("role", {
			...this.props.role,
			action: "update",
			form: {
				...this.props.role.form,
				id: id,
				name: name
			}
		}));
	}

	submitUpdate() {
		let newList = [...this.props.role.list];
		var id;
		var name;
		newList.map(ele => function() {
			if (ele.id === this.props.role.form.id) {
				ele.name = this.props.role.form.name;
				id = ele.id;
				name = ele.name;
			}
		})
		this.props.dispatch(updateFactors("role", {
			...this.props.role,
			list: newList,
			action: "create",
			form: {
				...this.props.role.form,
				name: ""
			},
			newElement: {
				id: id,
				name: name
			}
		}));
	}

	render() {
		const props = this.props;
		const form = props.role.form;
		const formVisible = this.state.formVisible;

		return (
			<div>
				<div>
					<p><u className="text-h2">Roles</u>
					<span>{ props.role.list.length } total</span></p>
				</div>
				{
					(props.role.list.length !== 0 ?
						<Fragment>
							<TableA head={
								<Fragment>
									<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
										</tr>
									</thead>
								</Fragment>
							} body={
								<Fragment>
									{
										props.role.list.map(auth => {
											return <tr key={ auth.id }>
												<td>{ auth.id }</td>
												<td>{
													(props.role.action === "create" ? auth.name : ((auth.id === props.role.form.id ? <input name="name" onChange={this.onChange.bind(this)} value={props.role.form.name} /> : auth.name)))
												}</td>
												<td>
													<button type="button" className="btn btn-primary" onClick={
														props.role.action === "create" ?
														this.update.bind(this, auth.id, auth.name)
														:
														this.submitUpdate.bind(this)
													}>
														{
															(props.role.action === "create" ? "Update" : (auth.id === props.role.form.id ? "Submit" : "Update"))
														}
													</button>
												</td>
											</tr>;
										})
									}
								</Fragment>
							} id="fcts-auths-list" form={(formVisible ?
								<tr className="text-primary box-shadow">
									<td>Auto generated</td>
									<td><input value={ form.name } name="name"
									onChange={ this.onChange2.bind(this) }
									className="input-plain"/></td>
									<td>ngochuyou</td>
									<td>Nov 10 2019</td>
								</tr> : null )}/>
							<div className="text-right">
								{
									(formVisible ?
									<button className="btn btn-roof"
									onClick={ this.submit.bind(this) }>
									Go</button> : null)
								}
								<button className="btn btn-primary margin-x-small"
								onClick={ this.toggleForm.bind(this) }>
								{ (formVisible ? "Cancel" : "Add") } </button>
							</div>
						</Fragment>
					: <h3>No Role types found.</h3>)
				}
			</div>
		);
	}
}


const mapStateToProps = (store) => {

	return {
		factors: store.factors,
		principal: store.auth.principal
	}
}

export default connect(mapStateToProps)(FactorsControl);
