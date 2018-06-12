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
            return <a id="nav__logout" className="navbar-item is-unselectable" onClick={this.props.viewHandler}><figure className="image is-24x24"><img className="is-rounded" src={this.props.user.img}/> </figure>Logout</a>
        }else{
            return <a id="nav__login" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Login</a>
        }
    }.bind(this)

    render(){
        return(
            <nav className="navbar">
                <div className="navbar-brand container-row">
                    <a id="nav__home" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Home</a>
                    <a id="nav__forum" className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Forum</a>
                    <a id={`nav__profile${this.props.authedUser}`} className="navbar-item is-unselectable" onClick={this.props.viewHandler}>Profile</a>
                    {this.authenticated(this.props.authenticated)}
                </div>
            </nav>
        )
    }


}
