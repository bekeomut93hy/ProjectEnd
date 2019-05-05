import React, { Component } from 'react';
import SwitchButton from "../common/button";
import GenderSetting from "./genderSetting";
import EmailAccount from "./emailAccount";
import PhoneAccount from "./phoneAccount";
import { BrowserRouter as Router, withRouter, Link, Route } from "react-router-dom";
class infortable extends Component {
    render() {
        return (

            <div id="info" className="animated slideInLeft delay-0.5s faster">
                <Route path="/app/profile" render={() => {
                    return (
                        <div>
                            <div className="row">
                                <div className="col-7">
                                    <span> Đang tìm kiếm </span>
                                </div>
                                <div className="ml-auto mr-2">
                                    <Link to="/app/setting/gender" className="text-decoration-none">
                                        <span> {this.props.setting.gender} </span>
                                    </Link>
                                </div>
                            </div>
                            <hr />

                            <div>
                                <div className="row">
                                    <div className="col-3">
                                        <span> Độ tuổi </span>
                                    </div>
                                    <div className="ml-auto mr-2">
                                        <span> 18 - {this.props.setting.age} </span>
                                    </div>
                                </div>
                                <input onChange={this.props.handleChangeAge} type="range" className="custom-range" min="18" max="72" value={this.props.setting.age} step="1" />
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-8 ">
                                    <span> Hiển thị tôi trên UET Tinder</span>
                                </div>
                                <SwitchButton />
                            </div>
                            <hr />
                            <div className="text-center">
                                <span> Thiết lập tài khoản </span>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-3 mr-2">
                                    <span> Email </span>
                                </div>
                                <div className="ml-auto mr-2" >
                                    <Link to="/app/setting/emailAccount" className="text-decoration-none"   >

                                        <span> {this.props.info.email} </span>
                                    </Link>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-5">
                                    <span> Số điện thoại </span>
                                </div>
                                <div className="ml-auto mr-2">
                                    <Link to="/app/setting/phoneAccount" className="text-decoration-none" >

                                        {
                                            this.props.info.contact === null ? <span> Thêm SĐT </span> : <span>  {this.props.info.contact}</span>
                                        }
                                    </Link>
                                </div>
                            </div>
                            <hr />
                            <div className="text-center">
                                <span onClick={this.props.handleLogout}> Đăng xuất </span>
                            </div>
                        </div>
                    )
                }} />
                <Route path="/app/setting/phoneAccount" render={() => {
                    return (
                        <PhoneAccount
                            state={this.props.info}
                        />
                    )
                }} />
                <Route path="/app/setting/emailAccount" render={() => {
                    return (
                        <EmailAccount
                            state={this.props.info}
                        />
                    )
                }} />
                <Route path="/app/setting/gender" render={() => {
                    return (
                        <GenderSetting
                            handleChangeGender={this.props.handleChangeGender}
                        />)
                }} />
            </div>


        );
    }
}

export default withRouter(infortable);