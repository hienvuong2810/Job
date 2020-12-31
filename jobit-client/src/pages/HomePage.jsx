import React from 'react';
import Navbar from '../components/utils/Navbar.jsx';

class HomePage extends React.Component {
	pushHistory(des) {
		this.props.history.push(des);
	}
	
	render() {
		return (
			<div id="hm-pg" className="content">
				<Navbar id="main-nav"/>
				<div id="hm-pg-wpp">
					<img alt="homepage-img" src="/img/wallpaper.jpg"/>
					<div className="overlay">
						<input placeholder="Tell us what you are looking for"/>
					</div>
				</div>
				<div className="panel">
					<div><img alt="homepage-img" src="/img/cand.jpg" id="cand-bnr"
					/></div>
					<div>
						<div className="content">
							<h2>Search for your dream job</h2>
							<p><span className="text-primary">talenthub</span> provides a way for those who
							is looking for an IT Job to approach their dream job easily.</p>
							<h2>Meet your potential recruiters</h2>
							<p>Talk to the recruiters in the fastest way.</p>
							<h2>Build your CV <span className="text-primary text-bold">live </span>
							with <span className="text-primary text-bold">your own</span> template</h2>
							<p>Design and submit your own CV online, customized by no one else but you.</p>
							<button className="btn border-none btn-primary width-large"
							onClick={ this.pushHistory.bind(this, "/signup/candidate")}>
							Join as a Job seeker</button>
						</div>
					</div>
				</div>
				<div className="panel">
					<div>
						<div className="content text-right">
							<h2>Push forward your business</h2>
							<p>Keep your business going by recruiting the best human resource on our site.</p>
							<h2>Catching up</h2>
							<p>Easily analyze aspects of technology.</p>
							<h2>Build up the reputation for your company</h2>
							<button className="btn border-none btn-black width-large"
							onClick={ this.pushHistory.bind(this, "/signup/recruiter")}>
							Join as a Recruiter</button>
						</div>
					</div>
					<div><img alt="homepage-img" src="/img/rec.jpg" id="rec-bnr"
					/></div>
				</div>
				<footer className="padding-medium height-large box-shadow bg-black text-white text-bold">
					<div className="text-center">
						<h1 className="margin-none"><i className="fab fa-connectdevelop margin-x-small">
						</i>talenthub</h1>
						<main>
							<p>1 . 7 6 9 . 3 2 5 Job seekers</p>
							<p>8 1 . 4 0 3 Recruiters</p>
						</main>
						<h3>Contact us</h3>
					</div>
					<p>Tel: 0000-00-00</p>
					<p>Email: talentsupport-hub@org.com</p>
				</footer>
			</div>
		);
	}
}

export default HomePage;