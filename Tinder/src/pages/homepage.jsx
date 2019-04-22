import React, { Component } from 'react';
import Navbar from "../components/homepage/Navbar";
import Main from "../components/homepage/Main";
import Login from "../components/homepage/LoginMobile";
import LoginTable from "../components/homepage/LoginTable";
import "../css/homepage.css"
import CarouselBackground from "../components/homepage/CarouselBackground"
class homepage extends Component {
    state = {
        isLogin: false
    }
    componentDidMount() {
        this.setState({
            isLogin : true
        })
    }
    
    _onLoginChange = (login) => {
        this.setState({
            isLogin: login
        });
        console.log(this.state.isLogin);
    }
    render() {
        return (
            <div>
                <div id="homepage" className="container">
                    <Navbar onLoginChange={this._onLoginChange} />
                    <Main onLoginChange={this._onLoginChange} />
                    {/* <CarouselBackground /> */}
                    <Login />
                </div>
                {
                    this.state.isLogin === true ? <LoginTable onLoginChange={this._onLoginChange} /> : null
                }

            </div>

        );
    }
}

export default homepage;