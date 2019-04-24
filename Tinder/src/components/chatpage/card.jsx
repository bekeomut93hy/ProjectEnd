import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter} from "react-router-dom"
class card extends Component {
   
    render() {
        return (
            <div>
                `<h1> Welcome {this.props.Username}</h1>`
                <button onClick={this.handleClick} className="btn btn-success"> Log out </button>
            </div>
        );
    }
}

export default withRouter(card);