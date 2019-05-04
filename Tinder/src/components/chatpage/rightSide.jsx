import React, { Component } from 'react';
import Card from "../chatpage/card"
import EditProfile from "./editprofile"
import { BrowserRouter as Router, withRouter, Link, Route } from "react-router-dom";
class rightSide extends Component {
    render() {
        return (

            <div className="mx-auto my-auto row">
                <Router>
                     <Route path='/app/profile' component={Card} />
                </Router>
                {/* <Card state={this.props.state}/> */}
                <EditProfile  state={this.props.state} />
            </div>

        );
    }
}

export default withRouter(rightSide);