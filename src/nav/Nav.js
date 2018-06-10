import React, { Component } from 'react';
import "./Nav.css"

export default class Nav extends Component{

    isActive = function(view){
        if(this.props.active === view){
            return "is-active"
        }
    }

    authenticated = function(authenticated){
        if(authenticated){
            return <a id="nav__logout" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Logout</a>
        }else{
            return <a id="nav__login" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Login</a>
        }
    }.bind(this)

    render(){
        return(
            <nav className="navbar">
                <div className="navbar-brand container-row">
                    <a id="nav__home" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Home</a>
                    {this.authenticated(this.props.authenticated)}
                </div>
            </nav>
        )
    }


}
