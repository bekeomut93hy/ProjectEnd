import React, { Component } from 'react';
import Navbar from "./navbar"
import Infotable from "./infortable"
import { withRouter } from "react-router-dom"
import Axios from "axios"
class headsetting extends Component {
    state = {
        age: 19,
        gender: null,
        infoMode: false,
        infoModeMess: false
    }
    componentWillMount() {
        console.log(this.props.info);
        if (this.props.info.gender === "male") {
            this.setState({
                gender: "Nữ"
            })
        }
        else if (this.props.info.gender === "female") {
            this.setState({
                gender: "Nam"
            })
        }
        else {
            this.setState({
                gender: "Tất cả"
            })
        }
    }
    _handleChangeAge = (e) => {
        this.setState({
            age: e.target.value
        })
    };
    _handleChangeGender = (gender)=>{
        this.setState({
            gender : gender
        })
    }
    _handleLogout = () => {
        Axios({
            url: "http://localhost:3001/auth/logout",
            withCredentials: true,
            method: "get",
        }).then((res) => {
            this.props.history.push("/");
        }).catch(err => {
            console.log(err);
        })
    };
    _handleWatchInfo = () => {
        this.setState({
            infoMode: true
        });
    }
    _handleCloseInfo = () => {
        this.setState({
            infoMode: false
        })
    }
    _handleInfoMode = (mode) => {
        this.setState({
            infoModeMess: mode
        })
    }
    render() {
        return (

                <div id="Headsetting" className="col-sm-12 col-md-3">
                
                    <div className="row align-items-center ">
                        <div onClick={this._handleCloseInfo} className="col-2">
                        <span  onClick={this._handleCloseInfo} className="close">&times;</span>
                        </div>
                        <div className="col-2">
                            <img className="rounded-circle" src={this.props.info.avatarUrl} alt="Unknown"/>
                        </div>
                        <div onClick={this._handleWatchInfo} className="col-8">
                            <h5> Thông tin của tôi </h5>
                        </div>
                    </div>
                    <hr />

                    {
                        this.state.infoMode === false ? 
                        <Navbar changeMode={this._handleInfoMode} mode={this.state.infoModeMess} /> :
                            <Infotable
                                mode={this.state.infoMode}
                                handleLogout={this._handleLogout}
                                handleChangeAge={this._handleChangeAge}
                                handleChangeGender={this._handleChangeGender}
                                info={this.props.info}
                                setting={this.state}
                            />
                    }

                </div>
        );
    }
}

export default withRouter(headsetting);