import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TopNav extends Component {
    constructor(props){
        super(props);
    }
    //退出登录
    onLogout(){

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
                                <span>欢迎，admin</span>
                                <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li>
                                    <a onClick={()=>{this.onLogout()}}>
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
