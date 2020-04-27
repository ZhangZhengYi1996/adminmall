import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import User from "service/user-service.jsx";
const _user = new User();

export default class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:_mm.getStorage("userInfo").username||""
        }
    }
    //退出登录
    onLogout() {
      _user.logOut().then(res=>{
          _mm.removeStorage("userInfo");
       window.location.href="/login";
      },err=>{
          _mm.errorTips(err);
      })
    }
    render() {
        return (
            <div>
                <div className="navbar navbar-default top-navbar">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/"><b>My</b>MMall</Link>
                    </div>

                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" href="javascript:;" >
                                <i className="fa fa-user fa-fw"></i>
                                {
                                    this.state.username
                                    ?<span>欢迎，{this.state.username}</span>
                                    :<span>欢迎</span>
                                }
                                
                                <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li>
                                    <a onClick={() => { this.onLogout() }}>
                                        <i className="fa fa-sign-out fa-fw"></i>
                                        <span>Logout </span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        )
    }
}
