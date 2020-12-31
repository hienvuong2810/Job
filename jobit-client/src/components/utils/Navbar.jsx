import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {proxy} from "../../fetch.js"

class Navbar extends React.Component {

	async handleClick(event){
		var search = document.getElementsByClassName("search")[0].value;
		console.log(search);
		let sear = encodeURIComponent(search);
		this.props.history.push("/search/"+sear)

		// let res = await proxy('http://localhost:8080/search?search=c%23', {
        //     method: 'POST',
        //     headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //      }
        //   });

        //   if(res.ok){
        //       await console.log(res);
		//   }
	}

	render() {
		const principal = this.props.principal;
		return (
			<div id={ this.props.id } className="navbar">
				<div><Link to="/"><h3 className="margin-none">
				<i className="fab fa-connectdevelop margin-x-small">
				</i>talenthub</h3></Link></div>
				<div>
					<div className="width-max height-max pos-rela">
						<input className="search" placeholder="Search"/>	
						<button className="btn border-none pos-mid-right" onClick={this.handleClick.bind(this)}  >Search</button>
					</div>
				</div>
				<div>
					{
						!principal ? (
							<div className="width-max grid grid-c-3-3 text-center">
								<Link to="/login"><button className="btn border-none">
								Sign in</button></Link>
								<Link to="/signup"><button className="btn btn-primary">
								Sign up</button></Link>
							</div>
						) : (
							<div className="width-max grid grid-c-2-4 text-center">
								<div></div>
								<div className="text-primary text-truncate">
								<Link to={ "/u/" }>{ principal.username }
								</Link></div>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		principal: store.auth.principal
	}
}

export default withRouter(connect(mapStateToProps)(Navbar));