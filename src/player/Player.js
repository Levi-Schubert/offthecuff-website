import React, {Component} from "react"
import "./Player.css"

export default class Player extends Component{

	//if user closes out of player remove the current url to media
	handle = function(){
		this.props.mediaHandler("none")
	}.bind(this)

	render(){
		return(
			<div id="playerfix" className="notification">
                    <audio id="player" className="level-item" autoPlay controls>
                        <source src={this.props.url} type="audio/mpeg" />
                    </audio>
                    <input type="button" className="button is-danger level-item" onClick={this.handle} value="X"/>
            </div>
		)
	}
}