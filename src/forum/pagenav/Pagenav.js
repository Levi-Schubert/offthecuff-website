import React, { Component } from 'react';

export default class Pagenav extends Component{

	isFirst = function(){
		if(this.props.isFirst){
			return <a className="pagination-previous" disabled>Previous</a>
		}else{
			return <a id="prev" className="pagination-previous" onClick={this.props.changePage}>Previous</a>
		}
	}
	isLast = function(){
		if(this.props.isLast){
			return <a className="pagination-next" disabled>Next page</a>
		}else{
			return <a id="next" className="pagination-next" onClick={this.props.changePage}>Next page</a>
		}
	}

	render(){
		return(
			<nav id="page__nav" className="pagination is-centered" role="navigation" aria-label="pagination">
					{this.isFirst()}
					{this.isLast()}
			</nav>
		)
	}
}