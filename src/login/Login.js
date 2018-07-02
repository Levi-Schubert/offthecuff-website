import React, { Component } from 'react';
import Auth from "../auth/Auth.js"
import "./Login.css"

export default class Login extends Component{
    constructor(props){
		super(props)
		//allow the user enough time to see the redirect message
        setTimeout(function(){
        let auth = new Auth()
        auth.login()
        },100)
    }

    render(){
        return(
            <div className="container">
                <div className="notification">
                    <h2>Redirecting to login page</h2>
                    <div className="button is-info is-loading">Redirecting ....to  login</div>
                </div>
            </div>
        )
    }
}