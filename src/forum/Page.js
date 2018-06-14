import React, { Component } from 'react';
import Thread from "./Thread.js"

export default class Page extends Component{


	render(){
		return(
			<div>
				{
					this.props.page.map(t => {
					return <Thread viewHandler={this.props.viewHandler} key={t.id} thread={t} />
				})}
			</div>
		)
	}
}