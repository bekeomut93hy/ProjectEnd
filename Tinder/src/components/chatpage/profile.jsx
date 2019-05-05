import React, { Component } from 'react';
import { withRouter, Link, Route } from "react-router-dom"
import EditProfile from "./editprofile"
class profile extends Component {
    render() {
        const style = {
            backgroundColor: "red",
        }
        return (
            <div className="animated fadeIn">
                <Route exact path="/app/profile" render={() => {
                    return (<Link to="/app/profile/edit" className="text-decoration-none" >
                        <button className="animated fadeIn my-4 text-white btn btn-grad text-center btn-lg col-3 mx-auto register"> Sửa thông tin </button>
                    </Link>)
                }} />
                <Route exact path="/app/profile/edit" render={() => {
                    return (<EditProfile
                        state={this.props.state}
                    />)
                }} />
            </div>
        );
    }
}

export default withRouter(profile);