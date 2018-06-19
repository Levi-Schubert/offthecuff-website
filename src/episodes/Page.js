import React, { Component } from 'react';
import Episode from "./Episode"

export default class Page extends Component{


	render(){
		return(
			<div>
				{
					this.props.page.map(e => {
					return <Episode viewHandler={this.props.viewHandler} changeView={this.props.changeView} key={e.id} episode={e} />
				})}
			</div>
		)
	}
}