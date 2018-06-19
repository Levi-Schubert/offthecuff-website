import React, { Component } from 'react';
import './App.css';
import Auth from './auth/Auth.js'
import Episodes from "./episodes/Episodes"
import Forum from "./forum/Forum"
import Home from "./home/Home"
import Login from "./login/Login"
import Navbar from "./nav/Nav"
import Profile from "./profile/Profile"
import decode from "jwt-decode"




class App extends Component {

	constructor(props) {
		super(props)
		document.getElementById('root').classList.add("hero")
	}


	state = {
		view: "home",
		auth: new Auth(),
		userId: null,
		authenticated: false,
		userData: {},
		api: "http://localhost:5001",
		profile: null
	}

	checkCredentials = function () {
		if (!this.state.authenticated) {
			let idToken = this.state.auth.getIdToken()
			// let access = this.state.auth.getAccessToken()
			if (idToken) {
				this.setState({ userId: decode(idToken).sub, authenticated: true, })
				// window.history.replaceState({}, document.title, ".")
				fetch(`${this.state.api}/users/${decode(idToken).sub}`).then(r => r.json()).then(user => {
					if (user.hasOwnProperty("id")) {
						this.setState({ userData: user })
					} else {
						let data = {
							id: decode(idToken).sub,
							displayName: "",
							bio: "",
							status: "",
							img: decode(idToken).picture
						}
						this.setState({ userData: data })
						fetch(`${this.state.api}/users`, {
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(data),
							method: 'POST'
						}).then()
					}
				})
			}
		}
	}.bind(this)

	componentDidMount() {
		this.checkCredentials()
	}

	showView = function (e) {
		let currentview = null;
		// debugger
		if (e.hasOwnProperty("target")) {
			currentview = e.target.id.split("__")[1]
			if (e.target.id.split("__").length > 2) {
				this.setState({ profile: e.target.id.split("__")[2] })
			}
		}
		if (currentview === "logout") {
			this.setState({ view: "home", userId: null, authenticated: false, userData: {} })
		} else {
			this.setState({ view: currentview })
		}
	}.bind(this)

	view = () => {
		switch (this.state.view) {
			case ("episodes"):
				return <Episodes api={this.state.api} />
			case ("profile"):
				return <Profile api={this.state.api} user={this.state.profile} authedUser={this.state.userId} />
			case ("forum"):
				return <Forum api={this.state.api} viewHandler={this.showView} authedUser={this.state.userId}/>
			case ("login"):
				return <Login />
			case ("logout"):
				return <Home />
			case ("home"):
			default:
				// this.checkCredentials()
				return <Home />
		}
	}

	render() {
		return (
			<div id="page" className="hero-body">
				<div>
					<Navbar viewHandler={this.showView} active={this.state.view} authenticated={this.state.authenticated} authedUser={`__${this.state.userId}`} user={this.state.userData} />
					<hr />
				</div>
				{this.view()}
			</div>
		)
	}
}

export default App;
