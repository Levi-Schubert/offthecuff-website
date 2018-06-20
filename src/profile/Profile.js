import React, { Component } from 'react';
import edit from "../img/edit.png"
import "./Profile.css"

export default class Profile extends Component{

    state={
        user :{
            id: "",
            displayName:"",
            bio:"",
            status:"",
            img: ""
        },
        editing:false,
        bio_edits:"",
        status_edits:"",
        name_edits: "",
        error: "",
        userList: []
    }

    editable = function(){
        if(this.props.user === this.props.authedUser){
            return  <div className="media-right">
                        <a onClick={this.edit}><img className="image is-32x32"src={edit} alt="edit"/></a>
                    </div>
        }
    }

    edit = function(){
        if(this.state.editing){
            this.setState({editing: false})
        }else{
            this.setState({editing: true})
        }
    }.bind(this)

    change = function(evt){
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    save = function(){
        let userUpdate = {id: this.state.user.id, displayName: this.state.user.displayName, bio: this.state.bio_edits, status: this.state.status_edits, img: this.state.user.img}
        document.getElementById("save_changes").classList.toggle("is-loading")
        fetch(`${this.props.api}/users/${this.state.user.id}`, {
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userUpdate),
            method: 'PUT'
            }).then(r => {
                this.setState({user: userUpdate})
                document.getElementById("save_changes").classList.toggle("is-loading")
                this.edit()
            })

    }.bind(this)

    saveName = function(){
        this.setState({error: ""})
        let error = false
        this.state.userList.forEach(name => {
            if(name === this.state.name_edits && error !== true){
                error = true
                this.setState({error: "name_taken"})
            }
        })
        if(error === false){
            let userUpdate = {id: this.state.user.id, displayName: this.state.name_edits, bio: this.state.user.bio, status: this.state.user.status, img: this.state.user.img}
            fetch(`${this.props.api}/users/${this.state.user.id}`, {
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userUpdate),
                method: 'PUT'
                }).then(r => {
                    this.setState({user: userUpdate})
                })
        }
    }.bind(this)

    notification = function(){
        switch(this.state.error){
            case("name_taken"):
                return <div className="level notification is-danger"><h3 className="is-title is-warning level-item">Display name is taken</h3></div>
			default:
				
        }
    }.bind(this)

    displayName = function(){
        if(this.state.userList.length > 0 && this.state.user.displayName === ""){
            return <div id="name_change" className="level"> <input id="name_edits" type="text" value={this.state.name_edits} className="input level-item" onChange={this.change} placeholder="Please choose a display name"/> <input type="button" id="save_name" className="button is-info level-item" value="Save" onClick={this.saveName}/></div>
        }else{
            return <h1 className= "title level-item">{this.state.user.displayName}</h1>
        }
    }

    editing = function(comp){
        switch(comp){
            case("status"):
                if(this.state.editing){
                    return <input id="status_edits" type="text" className="input is-small" onChange={this.change} value={this.state.status_edits}/>
                }else{
                    return <p className="level-item">{this.state.user.status}</p>                
                }
            case("bio"):
                if(this.state.editing){
                    return <div> <textarea id="bio_edits" type="text" className="input" onChange={this.change} value={this.state.bio_edits}/> <div className="level"><input type="button" id="save_changes" className="button is-info" value="Save Changes" onClick={this.save}/> </div></div>
                }else{
                    return <p id="bio" className="content">{this.state.user.bio}</p>
                }
            default:
                if(comp === "status"){
                    return <p className="level-item">{this.state.user.status}</p> 
                }else{
                    return <p id="bio" className="content">{this.state.user.bio}</p>
                }
        }
	}
	
	getData = function(user){
		fetch(`${this.props.api}/users/${user}`).then(r => r.json()).then(user => {
			this.setState({user:{img: user.img, displayName: user.displayName, bio: user.bio, status: user.status, id: this.props.user}, bio_edits: user.bio, status_edits: user.status})
			if(user.displayName === "" && this.props.user === this.props.authedUser){
				fetch(`${this.props.api}/users`).then(r => r.json()).then(users => {
					let displayNames = []
					users.forEach(user => {
						if(user.displayName !== ""){
							displayNames.push(user.displayName)
						}
					})
					this.setState({userList: displayNames})
				})
			}
		})
	}.bind(this)

	componentWillReceiveProps(nextProps) {
		if(nextProps.user !== this.state.user.id){
			this.getData(nextProps.user)
		}
	}

    componentDidMount(){
        if(this.props.user){
            this.getData(this.props.user)
        }
    }

    render(){
        return (
            <section>
                {this.notification()}
            <div className="level">
                {this.displayName()}
            </div>
            <div className="level">
                {this.editing("status")} 
            </div>
            <div className="media">
                <div className="media-left">
                    <div className="level">
                        <div className="level-item">
                            <figure className="image is-128x128">
                                <img className="is-rounded" src={this.state.user.img} alt="profile"/>
                            </figure>
                        </div>
                    </div>
                </div>
                <div className="media-content notification">
                    {this.editing("bio")}
                </div>
                {this.editable()}
            </div>
            </section>
            
        )
    }
}
