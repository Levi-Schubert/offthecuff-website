import React, { Component } from 'react';
import "./Nav.css"
import logo from ".././img/logo.png"

export default class Nav extends Component{

    isActive = function(view){
        if(this.props.active === view){
            return "is-active"
        }
    }

	// returns the correct login option based on if the user is authenticated
    authenticated = function(authenticated){
        if(authenticated){
            return <a id="nav__logout" className="log title is-5 navbar-item is-unselectable" onClick={this.props.viewHandler}>Logout</a>
        }else{
            return <a id="nav__login" className="log title is-5 navbar-item is-unselectable" onClick={this.props.viewHandler}>Login</a>
        }
	}.bind(this)
	
	//if user is authenticated display link to their profile
	profile = function(authenticated){
		if(authenticated){
			return <a id={`nav__profile${this.props.authedUser}`} className="is-unselectable right" onClick={this.props.viewHandler}><figure className="image is-48x48"><img id={`nav__profile${this.props.authedUser}`} className="is-rounded" src={this.props.user.img} alt="Profile"/> </figure></a>
		}
	}

    render(){
        return(
            <nav id="nav__color" className="navbar">
				<img id="logo" src={logo} alt="logo" />
                <div id="navbar" className="navbar-brand container-row">
                    <a id="nav__home" className="title is-5 navbar-item is-unselectable" onClick={this.props.viewHandler}>Home</a>
                    <a id="nav__episodes" className="title is-5 navbar-item is-unselectable" onClick={this.props.viewHandler}>Episodes</a>
                    <a id="nav__forum" className="title is-5 navbar-item is-unselectable" onClick={this.props.viewHandler}>Forum</a>
					{this.authenticated(this.props.authenticated)}
                </div>
					{this.profile(this.props.authenticated)}
				{/* <img id="logo" className=" is-invisible right" src={logo} alt="logo" /> */}
            </nav>
        )
    }


}
