import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "component/page-title/index.jsx";
import MUtil from "util/mm.jsx";
import TableList from "util/table-list/index.jsx";
import Order from "service/order-service.jsx";
import ListSearch from "./index-list-search.jsx";
import Pagination from "util/pagination/index.jsx";
const _order = new Order();
const _mm = new MUtil();

export default class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: [],
            listType: "list" //list或者是search
        };
    }
    componentDidMount() {
        this.loadOrderList();
    }
    loadOrderList() {
        let listParam = {};
        listParam.pageNum = this.state.pageNum;
        listParam.listType = this.state.listType;
        //如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === "search") {
            listParam.orderNo = this.state.orderNumber;
        }
        //请求借口
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, err => {
            this.setState({
                list: []
            })
            _mm.errorTips();
        });
    }
    //搜索
    onSearch(orderNumber) {
        //console.log(searchType, searchKeyWord)
        let listType = orderNumber === "" ? "list" : "search";
        this.setState({
            pageNum: 1,
            listType: listType,
            orderNumber: orderNumber,
        }, () => {
            this.loadOrderList();
        })

    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum
        }, () => {
            this.loadOrderList();
        });
    }

    render() {
        let tableHeads = ["订单号", "收件人", "订单状态", "订单总价", "创建时间", "操作"];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表" />
                <ListSearch onSearch={(orderNumber) => { this.onSearch(orderNumber) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td> <Link to={"/order/detail/" + order.orderNo}>{order.orderNo}</Link></td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>¥{order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link to={"/order/detail/" + order.orderNo}>详情</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                    onChange={(pageNum) => {
                        this.onPageNumChange(pageNum);
                    }} />
            </div >
        )
    }
}
