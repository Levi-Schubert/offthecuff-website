import React, {Component} from "react"
import PageNav from "../pagenav/Pagenav"
import Page from "./Page"
import left from "../../img/left.png"

export default class Thread extends Component{
	state = {
		pages: [],
		currentPage: 0,
		title:""
	}

	loaded = function(){
		if(this.state.pages.length > 0){
			return <Page viewHandler={this.props.viewHandler} page={this.state.pages[this.state.currentPage]} />
		}
	}.bind(this)


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
					<a id="thread__list" className="title" onClick={this.props.back}><img className="image is-32x32"src={left}/></a>
					<h1 className="title">{this.state.title}</h1>
					<section id="pages">
						{this.loaded()}
					</section>
					<PageNav isFirst={(this.state.currentPage === 0)} isLast={(this.state.currentPage === this.state.pages.length -1)} changePage={this.changePage}/>
				</div>
		)
	}
}