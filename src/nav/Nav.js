import React, { Component } from 'react';
import "./Nav.css"
import logo from ".././img/logo.jpg"

export default class Nav extends Component{

    isActive = function(view){
        if(this.props.active === view){
            return "is-active"
        }
    }

	// returns the correct login option based on if the user is authenticated
    authenticated = function(authenticated){
        if(authenticated){
            return <a id="nav__logout" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Logout</a>
        }else{
            return <a id="nav__login" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Login</a>
        }
	}.bind(this)
	
	//if user is authenticated display link to their profile
	profile = function(authenticated){
		if(authenticated){
			return <a id={`nav__profile${this.props.authedUser}`} className="navbar-item is-unselectable" onClick={this.props.viewHandler}><figure className="image is-24x24"><img id={`nav__profile${this.props.authedUser}`} className="is-rounded" src={this.props.user.img} alt="Profile"/> </figure></a>
		}
	}

    render(){
        return(
            <nav className="navbar">
				<img id="logo" src={logo} alt="logo" />
                <div id="navbar" className="navbar-brand container-row">
                    <a id="nav__home" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Home</a>
                    <a id="nav__episodes" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Episodes</a>
                    <a id="nav__forum" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Forum</a>
					{this.authenticated(this.props.authenticated)}
					{this.profile(this.props.authenticated)}
                </div>
				<img id="logo" className="is-invisible" src={logo} alt="logo" />
            </nav>
        )
    }


}
