import React, { Component } from 'react';
import Card from "../chatpage/card"
import Profile from "./profile"
import { BrowserRouter as Router, withRouter, Link, Route } from "react-router-dom";
class rightSide extends Component {
    render() {
        return (

            <div className="mx-auto my-auto row">
              
                    <Route path='/app/recs' render={()=>{
                       return ( <Card 
                        state={this.props.state} />
                       )
                    }}/>
                    <Route path='/app/profile' render={()=>{
                       return ( <Profile 
                        state={this.props.state} />
                       )
                    }}/>
            </div>

        );
    }
}

export default withRouter(rightSide);