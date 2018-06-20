import React, { Component } from 'react';


export default class Episodes extends Component{

	handle = function(){
		this.props.mediaHandler(this.props.episode.url)
	}.bind(this)

	render(){
		return(
			<div className="notification">
				<div id="episode__link"className="tile is-child has-text-centered">
					<a id={`episodes__episode__${this.props.episode.id}`} className="title is-5" onClick={this.handle}> {`${this.props.episode.id} | ${this.props.episode.title}`} </a>
					<p>{this.props.episode.description}</p>
					<p className="has-text-weight-semibold">Cast: {this.props.episode.cast}</p>
					<p className="has-text-weight-semibold">Release Date: {`${new Date(this.props.episode.date).getMonth() + 1}/${new Date(this.props.episode.date).getDate()}/${new Date(this.props.episode.date).getFullYear()}`}</p>
				</div>
			</div>
		)
	}
}