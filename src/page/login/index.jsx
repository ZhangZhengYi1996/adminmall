import React, { Component } from 'react';
import MUtil from "util/mm.jsx";
import User from "service/user-service.jsx";
const _user = new User();
const _mm = new MUtil();

import "./index.scss";

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            redirect: _mm.getUrlParam("redirect") || "/",
        }
    }
    
    componentWillMount() {
        document.title="登录-MYMMALL"
    }
    
    //输入信息
    onInputChange(e) {
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        })
    }
    //提交表单
    onSubmit() {
        let info = {
            username: this.state.username,
            password: this.state.password,
        },
            checkResult = _user.checkLoginInfo(info);
            //验证通过
        if (checkResult.status){
            _user.login(info).then((res) => {
                _mm.setStorage("userInfo",res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }else{//验证不通过
            _mm.errorTips(checkResult.msg);

        }
    }
    onInputKeyUp(e){
      if(e.keyCode === 13){
          this.onSubmit();
      }
    }
    render() {
        return (

            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录--MMALL后台管理系统</div>
                    <div className="panel-body">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <div className="col-sm-10 col-sm-offset-1">
                                    <input type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="请输入用户名"
                                        onChange={e => this.onInputChange(e)}
                                        onKeyUp={(e)=>this.onInputKeyUp(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-10 col-sm-offset-1">
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="请输入密码"
                                        onChange={e => this.onInputChange(e)}
                                        onKeyUp={(e)=>this.onInputKeyUp(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className=" col-sm-offset-1 col-sm-10">
                                    <button
                                        className="btn btn-lg btn-block btn-primary"
                                        onClick={e => this.onSubmit(e)}
                                    >登录</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
