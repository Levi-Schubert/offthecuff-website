import React, { Component } from 'react';
import Page from "./Page"
import Pagenav from "./pagenav/Pagenav"
import "./Forum.css"
import Thread from "./thread/Thread"

export default class Forum extends Component {

	state = {
		pages: [],
		currentPage: 0,
		view: "list",
		thread: ""
	}

	loaded = function(){
		if(this.state.pages.length > 0){
			return <Page viewHandler={this.props.viewHandler} changeView={this.changeView} page={this.state.pages[this.state.currentPage]} />
		}
	}.bind(this)

	changeView = function(e){
		let currentview = null
		if (e.hasOwnProperty("target")) {
			currentview = e.target.id.split("__")[1]
			if (e.target.id.split("__").length > 2) {
				this.setState({ thread: e.target.id.split("__")[2] })
			}
			this.setState({ view: currentview })
		}
	}.bind(this)

	showView = function(){
		if(this.state.view === "thread"){
			return <Thread api={this.props.api} thread={this.state.thread} viewHandler={this.props.viewHandler}/>
			//create thread view here (include back button to return to pagelist)
		}else{
			return <div>
						<section id="pages">
							<h1 className="title">Forum</h1>
							{this.loaded()}
						</section>
						<Pagenav isFirst={(this.state.currentPage === 0)} isLast={(this.state.currentPage === this.state.pages.length -1)} changePage={this.changePage}/>
					</div>
		}
	}.bind(this)

	changePage = function(e){
		if(e.target.id === "next"){
			this.setState({currentPage: (this.state.currentPage + 1)})
		}else{
			this.setState({currentPage: (this.state.currentPage - 1)})
		}
	}.bind(this)

	getThreads = function(){
		fetch(`${this.props.api}/threads?_expand=user&?_sort=bump&_order=desc`).then(r => r.json()).then(threads => {
			let pagesArr = []
			let page = []
			for (let i = 0; i < threads.length; i += 1) {
				if (page.length < 5) {
					page.push(threads[i])
				} else {
					pagesArr.push(page)
					page = []
					page.push(threads[i])
				}
			}
			if (page.length !== 0) {
				pagesArr.push(page)
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
			{this.showView()}
			</section>
		)
	}
}
