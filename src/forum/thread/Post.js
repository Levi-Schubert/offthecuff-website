import React, {Component} from "react"

export default class Post extends Component{

	render(){
		return(
			<div className="notification media thread">
				<div className="media-left has-text-centered usertile">
					<div className="tile is-parent is-vertical">
                        <div className="tile is-child">
							<h1 className="title is-5 is-unselectable">{this.props.post.user.displayName}</h1>
						</div>
						<div className="tile is-child">
							<div className="level">
								<div className="level-item">
									<a className="image is-64x64">
										<img id={`thread__profile__${this.props.post.user.id}`} onClick={this.props.viewHandler} className="is-rounded" src={this.props.post.user.img}/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="media-content">
					<div className="tile is-parent">
						<div className="tile is-child has-text-left">
							<p>{this.props.post.content}</p>
							<span className="has-text-weight-semibold">{(new Date(this.props.post.timestamp).toString().substring(4,21)).toString()}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
