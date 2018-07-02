import React, { Component } from 'react';

export default class Pagenav extends Component{

	//check to see if page is the first and disables previous if true
	isFirst = function(){
		if(this.props.isFirst){
			return <a className="pagination-previous" disabled>Previous</a>
		}else{
			return <a id="prev" className="pagination-previous" onClick={this.props.changePage}>Previous</a>
		}
	}

	//check to see if page is the last and disables next if true
	isLast = function(){
		if(this.props.isLast){
			return <a className="pagination-next" disabled>Next page</a>
		}else{
			return <a id="next" className="pagination-next" onClick={this.props.changePage}>Next page</a>
		}
	}

	render(){
		return(
			<div id="page__nav" className="pagination is-centered" role="navigation" aria-label="pagination">
					{this.isFirst()}
					{this.isLast()}
			</div>
		)
	}
}