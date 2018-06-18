import React, { Component } from 'react';
import Post from "./Post.js"

export default class Page extends Component{


	render(){
		return(
			<div>
				{
					this.props.page.map(p => {
					return <Post viewHandler={this.props.viewHandler} key={p.id} post={p} />})
				}
			</div>
		)
	}
}