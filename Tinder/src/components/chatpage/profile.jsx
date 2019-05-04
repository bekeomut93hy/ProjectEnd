import React, { Component } from 'react';
import { withRouter, Link ,Route } from "react-router-dom"
import EditProfile from "./editprofile"
class profile extends Component {
    render() {
        const style={
            backgroundColor : "red",
        }
        return (
            <div>
                 <Link to="/app/profile/edit" className="text-decoration-none" >
                <button className="my-4 text-white btn btn-grad text-center btn-lg col-3 mx-auto register"> Sửa thông tin </button>
                </Link>
                <Route path="/app/profile/edit" render={() => {
                            return (<EditProfile
                                state={this.props.state}
                            />)
                        }} />
            </div>
        );
    }
}

export default withRouter(profile);