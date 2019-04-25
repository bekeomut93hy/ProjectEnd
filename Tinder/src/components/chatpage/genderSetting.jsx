import React, { Component } from 'react';

class genderSetting extends Component {
    handleChangeSex = (a) => {
        this.props.handleChangeSex(a);
    }
    render() {
        return (
            <div className="animated slideInLeft delay-0.5s faster"> 
                <div onClick={()=>{return this.handleChangeSex("Nam")}} className="inputGroup">
                    <input id="radio1" name="radio" type="radio" />
                    <label htmlFor="radio1">Nam</label>
                </div>
                <div onClick={()=>{return this.handleChangeSex("Nữ")}} className="inputGroup">
                    <input id="radio2" name="radio" type="radio" />
                    <label htmlFor="radio2">Nữ</label>
                </div>
                <div onClick={()=>{return this.handleChangeSex("Tất cả")}} className="inputGroup">
                    <input id="radio3" name="radio" type="radio" />
                    <label htmlFor="radio3">Tất cả</label>
                </div>
            </div>
        );
    }
}

export default genderSetting;