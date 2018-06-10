import React, { Component } from 'react';
import './App.css';
import Auth from './auth/Auth.js'
import Login from "./login/Login"
import Navbar from "./nav/Nav"
import Home from "./home/Home"
import decode from "jwt-decode"




class App extends Component {
  
  constructor(props){
    super(props)
    document.getElementById('root').classList.add("hero")
  }

  state={
    view:"home",
    auth: new Auth(),
    userId: null,
    authenticated: false
  }
  
  checkCredentials = function(){
    if(!this.state.authenticated){
    let idToken = this.state.auth.getIdToken()
    let access = this.state.auth.getAccessToken()
    if(idToken){
      this.setState({userId: decode(idToken).sub, authenticated: true})
    }
  }
  }.bind(this)

  showView = function(e) {
    let currentview = null;
    let user = null
    if (e.hasOwnProperty("target")) {
      currentview = e.target.id.split("__")[1]
      if(e.target.id.split("__").length > 2){
          user = e.target.id.split("__")[2]
      }
    }
    this.setState({view: currentview})
  }.bind(this)

  view = () =>{
    switch(this.state.view){
      case("login"):
        return <Login/>
      case("logout"):
        this.setState({view: "home", userId: null, authenticated: false})
        window.history.replaceState({}, document.title, ".")
        return<Home/>
      case ("home"):
      default:
        this.checkCredentials()
        return <Home/>
    }
  }

  render() {
    return (
      <div className="hero-body">
        <Navbar viewHandler={this.showView} active={this.state.view} authenticated={this.state.authenticated}/>
        {this.view()}
      </div>
    )
  }
}

export default App;
