import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import MUtil from "util/mm.jsx";
import User from "service/user-service.jsx";
import TableList from "util/table-list/index.jsx";
const _user = new User();
const _mm = new MUtil();

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: []
        };
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() {
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }, err => {
            this.setState({
                list: []
            })
            _mm.errorTips();
        });
    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum
        }, () => {
            this.loadUserList();
        });
    }
    render() {
        let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />

                <th>id</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>注册时间</th>
                <TableList tableHeads={["id","用户名","邮箱","电话","注册时间"]}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                    onChange={(pageNum) => {
                        this.onPageNumChange(pageNum);
                    }} />
            </div >
        )
    }
}
