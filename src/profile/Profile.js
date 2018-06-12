import React, { Component } from 'react';
import edit from "../img/edit.png"
import "./Profile.css"

export default class Profile extends Component{

    state={
        user :{
            id: "",
            displayName:"Your displayName",
            name:"Name",
            bio:"In aftertaste brewed, caramelization aftertaste flavour single origin cortado percolator, affogato et mug skinny cream sweet, id, grinder trifecta instant aromatic extra aftertaste. Brewed cinnamon con panna robust barista grounds, medium, et, wings fair trade, medium, extraction spoon grinder, body, fair trade siphon cultivar coffee flavour cappuccino dark. Iced crema, dark con panna macchiato irish white at pumpkin spice latte, shop, bar lungo americano macchiato black et seasonal sweet. Mazagran java, café au lait turkish aromatic roast mug trifecta doppio latte, in, sugar chicory aroma lungo sugar. French press seasonal aroma, frappuccino, barista eu spoon, aftertaste so, espresso percolator aftertaste flavour robusta, latte redeye doppio, mug decaffeinated caffeine sit organic americano extra. Brewed so, spoon dripper chicory coffee, macchiato body, arabica, con panna robust iced sit steamed. Kopi-luwak, redeye, id mazagran turkish cup aged, whipped, mazagran plunger pot redeye seasonal shop robust.",
            status:"Your status here",
            img:"https://s.gravatar.com/avatar/37ae8814361f55ea127bf1407e99cf48?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fme.png"
        },
        editing:false,
        bio_edits:"",
        status_edits:""
    }

    editable = function(){
        if(this.props.user === this.props.authedUser){
            return  <div className="media-right">
                        <a onClick={this.edit}><img className="image is-32x32"src={edit}/></a>
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
        let userUpdate = {id: this.state.user.id, displayName: this.state.user.displayName, name: this.state.user.name, bio: this.state.bio_edits, status: this.state.status_edits, img: this.state.user.img}
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

    editing = function(comp){
        switch(comp){
            case("status"):
                if(this.state.editing){
                    return <input id="status_edits" type="text" className="input" onChange={this.change} value={this.state.status_edits}/>
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

    componentDidMount(){
        if(this.props.user){
            fetch(`${this.props.api}/users/${this.props.user}`).then(r => r.json()).then(user => {
                this.setState({user:{img: user.img, displayName: user.displayName, bio: user.bio, status: user.status, name: user.name, id: this.props.user}, bio_edits: user.bio, status_edits: user.status})
            })
        }
    }

    render(){
        return (
            <section>
            <div className="level">
                <h1 className= "title level-item">{this.state.user.displayName}</h1>
            </div>
            <div className="level">
                {this.editing("status")} 
            </div>
            <div className="media">
                <div className="media-left">
                    <div className="level">
                        <div className="level-item">
                            <figure className="image is-128x128">
                                <img className="is-rounded" src={this.state.user.img}/>
                            </figure>
                        </div>
                    </div>
                    <div className="level">
                        <h1 className="title level-item">{this.state.user.name}</h1>
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
