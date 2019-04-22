import React, { Component } from 'react';
import Card from "../components/chatpage/card"
import Axios from 'axios';
class chatpage extends Component {
        state={
            _id : String,
            name: String,
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
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    
    render() {
        return (
            <div>
                <Card Username={this.state.name}/>
            </div>
        );
    }
}

export default chatpage;