import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import JobPost  from "./components/jobposts/JobPosts.jsx";
import Search from "./pages/SearchPage.jsx";
class App extends React.Component {
	render() {
		return (
			<Fragment>
				<Route path="/search/:query" render={(props) => <Search {...props}/>}/>
				<Route path="/post" exact render={(props) => <JobPost {...props} />}/>
				<Route path="/" exact render={(props) => <HomePage {...props} />}/>
				<Route path="/admin" render={(props) => <AdminDashboard {...props} />}/>
				<Route path="/signup" render={(props) => <SignupPage {...props} />}/>
				<Route path="/login" render={(props) => <LoginPage {...props} />}/>
				<Route path="/chat" render={(props) => <ChatPage {...props} />}/>
				<Route path="/verify/:id?" render={(props) => <VerificationPage {...props} />}/>
				<Route path="/u/:username?" render={(props) => <UserPage {...props} key={ Math.random() }/>}/>
			</Fragment>
		);
	}
}

export default App;
