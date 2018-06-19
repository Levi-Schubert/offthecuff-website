import React, {Component} from "react"
import PageNav from "../pagenav/Pagenav"
import Page from "./Page"
import left from "../../img/left.png"

export default class Thread extends Component{
	state = {
		pages: [],
		currentPage: 0,
		title:"",
		newPost: ""
	}

	loaded = function(){
		if(this.state.pages.length > 0){
			return <Page viewHandler={this.props.viewHandler} page={this.state.pages[this.state.currentPage]} />
		}
	}.bind(this)

	change = function(evt){
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}.bind(this)

	post = function(){
		//get post from state and post to api
		let post = {
			threadId: this.props.thread,
			userId: this.props.authedUser,
			content: this.state.newPost,
			timestamp: new Date().getTime()
		}
		fetch(`${this.props.api}/posts`,{ 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post),
			method: 'POST'
			}).then(r => r.json()).then(post => {
				//update the thread key bump with new timestamp
				fetch(`${this.props.api}/threads/${this.props.thread}`, {
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({bump: post.timestamp}),
					method: 'PATCH'
				} ).then()
				this.setState({newPost: ""})
				this.getPosts()
			})

	}.bind(this)

	newPost(){
		if(this.props.authedUser === null){
			return (<div className="notification thread__box post__box">
					<textarea className="input" placeholder="Please log in to post to the forum" disabled/>
					<input type="button" className="button is-info" value="Post" onClick={this.post} disabled/>
				</div>)
		}else{
			return (<div className="notification thread__box post__box">
					<textarea id="newPost" className="input" placeholder="New post" value={this.state.newPost} onChange={this.change}/>
					<input type="button" className="button is-info" value="Post" onClick={this.post}/>
				</div>)
		}
	}

	changePage = function(e){
		if(e.target.id === "next"){
			this.setState({currentPage: (this.state.currentPage + 1)})
		}else{
			this.setState({currentPage: (this.state.currentPage - 1)})
		}
	}.bind(this)

	getPosts = function(){
		fetch(`${this.props.api}/posts?_expand=user&threadId=${this.props.thread}`).then(r => r.json()).then(threads => {
			let pagesArr = []
			let page = []
			for (let i = 0; i < threads.length; i += 1) {
				if (page.length < 10) {
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
		fetch(`${this.props.api}/threads/${this.props.thread}`).then( r => r.json()).then(thread => {
			this.setState({title: thread.title})
		})
	}.bind(this)

	componentDidMount() {
		this.getPosts()
	}

	render(){
		return(
				<div>
					<a className="title"><img id="thread__list" className="image is-32x32"src={left} onClick={this.props.back} alt="back"/></a>
					<h1 className="title">{this.state.title}</h1>
					<section id="post__pages">
						{this.loaded()}
						{this.newPost()}
					</section>
					<PageNav isFirst={(this.state.currentPage === 0)} isLast={(this.state.currentPage === this.state.pages.length -1)} changePage={this.changePage}/>
				</div>
		)
	}
}