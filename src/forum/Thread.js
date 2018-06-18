import React, { Component } from 'react';

export default class Thread extends Component{


	render(){
		return(
			<div className="notification media thread">
				<div className="media-left has-text-centered usertile">
					<div className="tile is-parent is-vertical">
                        <div className="tile is-child">
							<h1 className="title is-5 is-unselectable">{this.props.thread.user.displayName}</h1>
						</div>
						<div className="tile is-child">
							<div className="level">
								<div className="level-item">
									<a className="image is-64x64">
										<img id={`thread__profile__${this.props.thread.user.id}`} onClick={this.props.viewHandler} className="is-rounded" src={this.props.thread.user.img}/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="media-content">
					<div className="tile is-parent">
						<div className="tile is-child has-text-left">
							<a id={`forum__thread__${this.props.thread.id}`} className="title is-5" onClick={this.props.changeView}> {this.props.thread.title}</a>
							<p>{this.props.thread.initialPost}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}