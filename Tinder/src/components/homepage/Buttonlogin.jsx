import React, { Component } from 'react';

class Buttonlogin extends Component {
    render() {
        return (
            <div>
                <button className="col-12 btn btn-lg loginfb my-1"> ĐĂNG NHẬP VỚI FACEBOOK </button>
                <button className="col-12 btn btn-lg loginsdt my-1 mb-5"> ĐĂNG NHẬP VỚI SỐ ĐIỆN THOẠI</button>
            </div>
        );
    }
}

export default Buttonlogin;