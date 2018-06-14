import React, { Component } from 'react';
import Page from "./Page.js"
import "./Forum.css"

export default class Forum extends Component {

	state = {
		pages: [],
		currentPage: 0
	}

	loaded = function(){
		if(this.state.pages.length > 0){
			return <Page viewHandler={this.props.viewHandler} page={this.state.pages[this.state.currentPage]} />
		}
	}.bind(this)

	getThreads = function(){
		fetch(`${this.props.api}/threads?_expand=user&?_sort=bump&_order=desc`).then(r => r.json()).then(threads => {
			let pagesArr = []
			let page = []
			for (let i = 0; i < threads.length; i += 1) {
				if (page.length < 11) {
					page.push(threads[i])
				} else {
					pagesArr.push(page)
					page = []
				}
				if (i === threads.length - 1 && page.length !== 10) {
					pagesArr.push(page)
				}
			}
			this.setState({ pages: pagesArr })
		})
	}.bind(this)

	componentDidMount() {
		this.getThreads()
	}

	render() {
		return (
			<section id="forum" className="container">
				<h1 className="title">Forum</h1>
				{this.loaded()}
			</section>
		)
	}
}
