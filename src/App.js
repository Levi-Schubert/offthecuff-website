import React, { Component } from 'react';
import './App.css';
import Auth from './auth/Auth.js'
import Episodes from "./episodes/Episodes"
import Forum from "./forum/Forum"
import Home from "./home/Home"
import Login from "./login/Login"
import Navbar from "./nav/Nav"
import Player from "./player/Player"
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
		profile: null,
		playing: false,
		mediaUrl: ""
	}

	// checks the credentials of the login token from auth0
	checkCredentials = function () {
		//check to see if user is already authenticated
		if (!this.state.authenticated) {
			let idToken = this.state.auth.getIdToken()
			// check if the hash exists and is within acceptable issue date window
			if (idToken && this.checkIssueDate(decode(idToken).iat)) {
				this.setState({ userId: decode(idToken).sub, authenticated: true, })
				//remove hash from url
				window.history.replaceState({}, document.title, ".")
				//fetch user data from database
				fetch(`${this.state.api}/users/${decode(idToken).sub}`).then(r => r.json()).then(user => {
					if (user.hasOwnProperty("id")) {
						this.setState({ userData: user })
					} else {
						//if user doesn't have database entry create one for them
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
			}else{
				//if token exists but is not within acceptable issue window remove the hash and don't authenticate them
				if(idToken){
					window.history.replaceState({}, document.title, ".")
				}
			}
		}
	}.bind(this)

	// checks the issue date of auth0 hash to ensure it's within the issued window
	checkIssueDate = function (ts){
		//parse the auth0 timestamp to milliseconds
		let validTs = parseInt((ts + "000"), 10)
		let currentTime = new Date().getTime()
		//if the issue date is within 90 seconds allow login
		if(validTs <= (currentTime + 9000)){
			return true
		}
		return false

	}

	componentDidMount() {
		//on component load check for login parameters
		this.checkCredentials()
	}

	//event handler to pull the correct view to set to state
	showView = function (e) {
		let currentview = null;
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
				return <Episodes api={this.state.api} mediaHandler={this.mediaHandler}/>
			case ("profile"):
				return <Profile api={this.state.api} user={this.state.profile} authedUser={this.state.userId} />
			case ("forum"):
				return <Forum api={this.state.api} viewHandler={this.showView} authedUser={this.state.userId}/>
			case ("login"):
				return <Login />
			case ("logout"):
				return <Home api={this.state.api} mediaHandler={this.mediaHandler}/>
			case ("home"):
			default:
				return <Home api={this.state.api} mediaHandler={this.mediaHandler}/>
		}
	}

	//handler for setting the correct media to play or stop
	mediaHandler = function(url){
		if(url !== "none"){
			if(this.state.playing){
				this.setState({playing: false})
			}
			this.setState({playing: true, mediaUrl: url})
		}else{
			this.setState({playing: false, mediaUrl: ""})
		}
	}.bind(this)

	media = function(){
		if(this.state.playing){
			return <Player url={this.state.mediaUrl} mediaHandler={this.mediaHandler}/>
		}
	}

	render() {
		return (
			<div id="page" className="hero-body">
				<div>
					<Navbar viewHandler={this.showView} active={this.state.view} authenticated={this.state.authenticated} authedUser={`__${this.state.userId}`} user={this.state.userData} />
					{/* <hr /> */}
				</div>
				{this.view()}
				{this.media()}
			</div>
		)
	}
}

export default App;
