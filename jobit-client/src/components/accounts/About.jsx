import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { JOBSEEKER } from '../../actions/accountActions.js';

const roleNames = {
	CANDIDATE: "JOB SEEKER",
	RECRUITER: "RECRUITER"
}

const openStatus = {
	true: "Open",
	false: "Employed"
}

const openStatusColor = {
	true: "text-primary",
	false: "text-default"
}

class About extends React.Component {
	render() {
		const { user } = this.props;
		const address = user.addresses[0];
		const roleName = user.role.name;

		return (
			<Fragment>
				<article className="article-control">
					<div className="grid grid-c-3-3">
						<div>
							<header>{ user.username }</header>
							<p className="text-bold">{ roleNames[roleName] }</p>
							<p>{ address.city.name }, { address.city.country.name }</p>
							{
								roleName === JOBSEEKER ?
								(<p className={ openStatusColor[user.isOpen] }>{ openStatus[user.isOpen] }</p>):
								(null)
							}
						</div>
						<div className="grid grid-c-3-3">
							<div></div>
							<div className="avatar">
							{
								!user.avatar ? (
									<i className="fas fa-user" style={{fontSize: "150px"}}></i>
								) : (
									<img alt="ava" src="/img/cand.jpg" className="preview"/>
								)
							}
							</div>
						</div>
					</div>
					<div className="hr"></div>
					<main>
						<div className="item">
							<label>Fullname</label>
							<p>{ user.fullname }</p>
						</div>
						<div className="item">
							<label>Birthday</label>
							<p>{ (new Date(user.dob)).toLocaleDateString() }</p>
						</div>
						<div className="item">
							<label>Email</label>
							<p>{ user.email }</p>
						</div>
						<div className="item">
							<label>Phone number</label>
							<p>{ user.phone }</p>
						</div>
						<div className="item">
							<label>Addresses</label>
							{
								user.addresses.map(add =>
									<p key={ add.id }>
									{ add.bis + ' ' + add.street + ' ' + add.city.name + ', ' + add.city.country.name }
									</p>)
							}
						</div>
						<div className="item">
							<label>Gender</label>
							<p>{ user.gender.name }</p>
						</div>
						<div className="item">
							<label>Github</label>
							<p><i className="fab fa-github margin-x-small"></i>
							{ user.githubLink }</p>
						</div>
						<div className="item">
							<label>Facebook</label>
							<p><i className="fab fa-facebook-f margin-x-small"></i>
							{ user.facebookLink }</p>
						</div>
						<div className="item">
							<label>Twitter</label>
							<p><i className="fab fa-twitter margin-x-small"></i>
							{ user.twitterLink }</p>
						</div>
						<div className="item">
							<label>Linkedin</label>
							<p><i className="fab fa-linkedin margin-x-small"></i>
							{ user.linkedinLink }</p>
						</div>
						<div className="item">
							<label>Stackoverflow</label>
							<p><i className="fab fa-stack-overflow margin-x-small"></i>
							{ user.stackoverflowLink }</p>
						</div>
						<div className="item">
							<label>Keywords</label>
							<div className="margin-y-medium" id="kw-cont">
								{
									user.keywords.map(word => <div className="icon pointer bg-primary"
										key={ word.id }><span>{ word.id }</span></div>)
								}
							</div>	
						</div>
					</main>
				</article>
			</Fragment>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		user: store.account.user
	}
}

export default connect(mapStateToProps)(About);