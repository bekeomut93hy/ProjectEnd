import React, { Component } from 'react';
import Info from "./info";
import LikeButton from './likebutton';
import CancelButton from "./cacelbutton";

class card extends Component {
    
    _handleLike = ()=>{
        console.log(this.props.state);
        console.log("like");
    }
    _handleCancel = ()=>{
        console.log("cancel");
    }
    _handleNext = ()=>{
        console.log("next");
    }
    render() {
        return (
            <div className="animated zoomIn"id="card">
                <div className="mx-auto my-auto">
                    <img id="card_image" src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/58381427_2159760604079800_5959782953067216896_n.jpg?_nc_cat=1&_nc_oc=AQnZfLrjiZcpc_2KqW5dsf7sApRHcDRWITmIJORQmDblX23MxiKBsNwq-d3ZT-7MLUU&_nc_ht=scontent.fhan3-2.fna&oh=b5b237121b5648b7ebb9dc4c50b1a66f&oe=5D7603EC" alt="card_image" />
                    <Info />

                    <div id="game-pad" className="d-flex justify-content-around  align-items-center">
                            <LikeButton handleLike={this._handleLike}/>
                            <CancelButton handleCancel={this._handleCancel} />
                    </div>
                </div>
               
            </div>
        );
    }
}
export default card;