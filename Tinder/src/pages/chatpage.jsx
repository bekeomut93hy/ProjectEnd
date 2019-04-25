import React, { Component } from 'react';
import Headsetting from "../components/chatpage/headsetting"
import Axios from 'axios';
import "../css/chatpage.css"
class chatpage extends Component {
        state={
            _id : String,
            name: String,
            email : String,
            contact : String,
            avatarUrl : String
        }
    componentDidMount() {
        Axios({
            url : "http://localhost:3001/auth/getId",
            withCredentials : true,
            method : "get",
        }).then((res)=>{
            console.log(res.data);
            this.setState({
                _id : res.data.user._id,
                name : res.data.user.name,
                email : res.data.user.email,
                contact : res.data.user.contact,
                avatarUrl : res.data.user.avatarUrl
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    
    render() {
        return (
            <div className="row">
                <Headsetting info={this.state}/>
            </div>
        );
    }
}

export default chatpage;