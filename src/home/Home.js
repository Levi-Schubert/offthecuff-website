import React, { Component } from 'react';
import "./Home.css"
import itunes from "../img/itunes.svg"
import Episode from "../episodes/Episode"


export default class Home extends Component{

	state={
		episode: null
	}

	loaded = function(){
		if(this.state.episode !== null){
			return <Episode episode={this.state.episode} mediaHandler={this.props.mediaHandler}/>
		}
	}

	//get the most recent episode
	load = function(){
		fetch(`${this.props.api}/episodes?_sort=id&_order=desc`).then(r => r.json()).then(episodes => {
			this.setState({episode: episodes[0]})
		})
	}.bind(this)

	componentDidMount(){
		this.load()
	}

    render(){
        return (
            <section id="home__content" className="container">
                <h1 className="title">Home</h1>
				<div id="episode" className="notification">
					<h2 className="title is-4">Off the Cuff</h2>
					<p className="content">Off the Cuff with the Gals is a comedy focused podcast. Topics discussed range from technology, music, and odd facts to life stories and fictional scenarios.</p>
					<p className="title is-3">Most Recent Episode</p>
					{this.loaded()}
					<div className="level">
						<p className="title is-3 level-item"> Listen on iTunes </p>
						<div className="level-item"><a href="https://itunes.apple.com/us/podcast/off-the-cuff-podcast-with-the-gals/id1323641263?mt=2"><img width ='125px' alt='Get it on iTunes' src={itunes}/></a></div>
					</div>
				</div>
            </section>
        )
    }
}
