import React, { Component } from 'react';

class LoginContactTable extends Component {
    handleClick=(e)=>{
        const sdt = document.getElementById("sdt").value;   
    }
    render() {
        return (
            <div id="login" className="mx-auto my-auto text-center col-md-4 align-items-center ">
                <span onClick={this.props.closeLogin} className="close">&times;</span>
                <div className="col-12 my-4">
                    <img src="https://tinder.com/static/build/80ab7bdae3b4132925e4bcf99b6aa46a.svg" alt="logo" />
                </div>
                <div className="my-5">
                    <h3> Nhập số điện thoại di động của bạn </h3>
                </div>
                <div className="row">
                    <div className="col-3  mt-2 sdt">
                        <span> VN </span>
                    </div>
                    <div className="col-2  mt-2 sdt">
                        <span>
                            +84
                            </span>
                    </div>
                    <div className="col-5 sdt mb-4">
                        <input className="form-control" id="sdt"  type="text"></input>
                    </div>
                </div>
                <button onClick={this.handleClick} className="my-4 text-white btn btn-grad text-center btn-lg col-12 mx-auto register d-md-block"> TIẾP TỤC </button>
            </div>
        );
    }
}

export default LoginContactTable;