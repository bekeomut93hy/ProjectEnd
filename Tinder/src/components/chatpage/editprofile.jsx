import React, { Component } from 'react';
import Axios from 'axios';
import UploadImage from "./uploadImage"
import { storage } from '../firebase/index'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { async } from '@firebase/util';
class editprofile extends Component {
    state = {
        upload: false,
        deleteImage: null,
    }
    _handleAddImage = () => {
        Swal.fire({
            title: 'Tải ảnh lên',
            input: 'file',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Tải ảnh lên',
            showLoaderOnConfirm: true,
            preConfirm: async (image) => {
                const uploadTask = await storage.ref(`images/${this.props.state._id}/${image.name}`).put(image);
                await storage.ref('images').child(this.props.state._id).child(image.name).getDownloadURL().then(async url => {
                    console.log(url);
                    await Axios({
                        url: "http://localhost:3001/auth/uploadImage",
                        withCredentials: true,
                        method: "post",
                        data: {
                            url: url
                        }
                    }).then(res => {
                        console.log("OK");
                    }).catch(err => {
                        console.log(err);
                    });
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    type: 'success',
                    title: 'Thành công',
                    text: 'Tải ảnh lên thành công',
                })
            }
        })
    }
    _handleDeleteImage = async (evt) => {
        await this.setState({
            deleteImage: evt.target.src
        })
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Ảnh đã xóa không thể hồi phục",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý'
        }).then(async (result) => {
            await storage.refFromURL(this.state.deleteImage).delete();
            await Axios({
                url: "http://localhost:3001/auth/deleteImage",
                withCredentials: true,
                method: "post",
                data: {
                    url: this.state.deleteImage
                }
            }).then((res) => {
                console.log("ok");
            }).catch(err => {
                console.log(err);
            })
            console.log(this.state.deleteImage);
            if (result.value) {

                Swal.fire(
                    'Đã xóa',
                    'Ảnh đã xóa thành công',
                    'success'
                )
            }
        })
    }
    handleUpload = () => {
        if (this.state.upload === false)
            this.setState({
                upload: true
            })
        else {
            this.setState({
                upload: false
            })
        }
    }
    EditProfile = () => {
        Axios({
            url: "http://localhost:3001/auth/editProfile",
            withCredentials: true,
            method: "post",
            data: {
                gender: document.getElementById("gender").value,
                school: document.getElementById("school").value,
                introduce: document.getElementById("introduce").value,
                _id: this.props.state._id
            }
        }).then((res) => {
            console.log("OK");
            this.props.history.goBack();
        }).catch(err => {
            console.log(err)
        });

    }
    render() {
        const styleMenu = {
            borderRadius: '8px',
            boxShadow: "0 5px 13px 1px rgba(0,0,0,.09)",
        }
        const styleItem = {
            height: "16vh",
            width: "90%"
        }
        return (
            <div className="animated fadeIn" style={styleMenu}>
                <div className="d-flex justify-content-around align-items-center text-center flex-wrap mt-1">
                    {
                        Array.from(this.props.state.avatarUrl).map((item, index) => {
                            return <div className="my-2" onClick={this._handleDeleteImage} key={index} style={{ width: "30%" }}>
                                <img style={styleItem} src={item} alt="abc" />
                            </div>
                        })
                    }
                    <div onClick={this._handleAddImage} style={{ width: "30%" }}>
                        <img style={styleItem} src="http://meetdev.com/assets/img/icon-user-default.png" alt="abc" />
                    </div>

                </div>
                {
                    this.state.upload === true ? <UploadImage userId={this.props.state._id} /> : null
                }
                <div className="row">
                    <div className="col-12 text-left title">
                        <p> Giới thiệu {this.props.state.name}</p>
                    </div>
                    <div className="col-12">
                        <div class="input-group">
                            <textarea id="introduce" maxLength="500" defaultValue={this.props.state.introduce} className="form-control" aria-label="With textarea"></textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-left title">
                        <p> Trường </p>
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-sm mb-3">
                            <input id="school" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-left title">
                        <p> Giới tính </p>
                    </div>
                    <div className="col-12">
                        <select id="gender" className="custom-select custom-select-sm">
                            <option selected value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div>
                <button onClick={this.EditProfile} className="my-4 text-white btn btn-grad text-center btn-lg col-3 mx-auto register d-sm-none d-md-block"> Lưu </button>
            </div>
        );
    }
}

export default withRouter(editprofile);