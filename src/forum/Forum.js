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
		thread: "",
		newThread: false,
		title: "",
		post: ""
	}

	newHandle = function(){
		if(this.state.newThread === false){
			this.setState({newThread: true})
		}else{
			this.setState({newThread: false})
		}
	}.bind(this)

	change = function(evt){
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}.bind(this)

	create = function(){
		//create new thread
		let time = new Date().getTime()
		let thread = {
			userId: this.props.authedUser,
			title: this.state.title,
			initialPost: this.state.post,
			bump: time
		}
		//post to api
		fetch(`${this.props.api}/threads`,{ 
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(thread),
		method: 'POST'
		}).then(r => r.json()).then(thread => {
			//create initial post for thread
			let post = {
				threadId: thread.id,
				userId: this.props.authedUser,
				content: thread.initialPost,
				timestamp: time
			}
			//post post to api
			fetch(`${this.props.api}/posts`,{ 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post),
			method: 'POST'
			}).then(r => {
				//clear new thread field
				this.setState({title: "", post: ""})
				//close new thread form
				this.newHandle()
				//call get threads to refresh threads
				this.getThreads()
			})
		})
	}.bind(this)

	newThread = function(){
		if(this.state.newThread){
			return(
				<div className="notification thread__box">
					<input id="title" type="text" className="input new__thread" value={this.state.title} onChange={this.change} placeholder="Thread title"/>
					<textarea id="post" type="text" className="input new__thread" value={this.state.post} onChange={this.change} placeholder="Initial post"/>
					<input type="button" className="button is-info new__thread" value="Create" onClick={this.create} />
				</div>
			)
		}
	}


	authed = function(){
		if(this.props.authedUser === null){
			return "is-invisible"
		}
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
			return <Thread api={this.props.api} back={this.changeView} thread={this.state.thread} viewHandler={this.props.viewHandler}/>
			//create thread view here (include back button to return to pagelist)
		}else{
			return <div>
						<section id="pages">
						<div className="media has-text-centered">
							{/* this first hidden button is a really bad way to handle making the forum text centered, will fix later */}
							<input type="button" className="button is-info media-left is-invisible" value="New Thread" />
							<p className="title media-content has-text-centered">Forum</p>
							<input type="button" className={`button is-info media-right ${this.authed()}`} value="New Thread" onClick={this.newHandle}/>
						</div>
							{this.newThread()}
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
		fetch(`${this.props.api}/threads?_expand=user&_sort=bump&_order=desc`).then(r => r.json()).then(threads => {
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
