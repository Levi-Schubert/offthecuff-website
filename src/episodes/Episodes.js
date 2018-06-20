import React, { Component } from 'react';
import "./Episodes.css"
import Page from "./Page"
import Pagenav from "../forum/pagenav/Pagenav"

export default class Episodes extends Component{

	state = {
		pages: [],
		currentPage: 0
	}

	changePage = function(e){
		if(e.target.id === "next"){
			this.setState({currentPage: (this.state.currentPage + 1)})
		}else{
			this.setState({currentPage: (this.state.currentPage - 1)})
		}
	}.bind(this)

	loaded = function(){
		if(this.state.pages.length > 0){
			return <Page viewHandler={this.props.viewHandler} changeView={this.changeView} page={this.state.pages[this.state.currentPage]} mediaHandler={this.props.mediaHandler}/>
		}
	}.bind(this)

	getEpisodes = function(){
		fetch(`${this.props.api}/episodes?_sort=id&_order=desc`).then(r => r.json()).then(episodes => {
			let pagesArr = []
			let page = []
			for (let i = 0; i < episodes.length; i += 1) {
				if (page.length < 5) {
					page.push(episodes[i])
				} else {
					pagesArr.push(page)
					page = []
					page.push(episodes[i])
				}
			}
			if (page.length !== 0) {
				pagesArr.push(page)
			}
			this.setState({ pages: pagesArr })
		})
	}.bind(this)

	componentDidMount(){
		this.getEpisodes()
	}

	render(){
		return(
			<section id="episodes" className="container">
				<section id="pages">
				<div className="media has-text-centered">
					<p id="episode__title" className="title media-content has-text-centered">Episodes</p>
				</div>
				{this.loaded()}
				</section>
				<Pagenav isFirst={(this.state.currentPage === 0)} isLast={(this.state.currentPage === this.state.pages.length -1)} changePage={this.changePage}/>
			</section>
		)
	}
}