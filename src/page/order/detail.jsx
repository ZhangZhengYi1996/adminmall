import React, { Component } from 'react'
import PageTitle from "component/page-title/index.jsx";
import MUtil from "util/mm.jsx";
import Order from "service/order-service.jsx";
import TableList from "util/table-list/index.jsx";
import "./detail.scss"
const _order = new Order();
const _mm = new MUtil();


export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: this.props.match.params.orderNumber,
            orderInfo: {}
        }
    }
    componentDidMount() {
        this.loadOrderDetail();
    }
    //加载商品详情
    loadOrderDetail() {
        _order.getOrderDetail(this.state.orderNumber).then((res) => {
            this.setState({
                orderInfo: res
            });
        }, (err) => {
            _mm.errorTips(err);
        })

    }
    //发货操作
    onSendGoods() {
        if (window.confirm("确认该订单是否支付")) {
            _order.sendGoods(this.state.orderNumber).then((res) => {
                _mm.successTips("发货成功");
                this.loadOrderDetail();
            },(err)=>{
                _mm.errorTips(err);
            })
        }

    }

    render() {
        let receiveInfo = this.state.orderInfo.shippingVo || {};
        let tableHeads = [
            { name: "商品图片", width: "10%" },
            { name: "商品信息", width: "45%" },
            { name: "价格", width: "15%" },
            { name: "数量", width: "15%" },
            { name: "总记", width: "15%" },
        ];
        let productList = this.state.orderInfo.orderItemVoList || [];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {receiveInfo.receiverName}，
                                {receiveInfo.receiverProvince}
                                {receiveInfo.receiverCity}
                                {receiveInfo.receiverAddress}
                                {receiveInfo.receiverPhone || receiveInfo.receiverMobile}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.statusDesc}
                                {
                                    this.state.orderInfo.status === 20
                                        ? <button className="btn btn-default btn-sm btn-send"
                                            onClick={(e) => { this.onSendGoods(e) }}
                                        >发货</button>
                                        : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">¥{this.state.orderInfo.payment}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                        <div className="col-md-10">
                            <TableList tableHeads={tableHeads}>
                                {
                                    productList.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img
                                                        className="p-img"
                                                        src={`${this.state.orderInfo.imageHost}${product.productImage}`}
                                                        alt={product.productName} />
                                                </td>
                                                <td>{product.productName}</td>
                                                <td>¥{product.currentUnitPrice}</td>
                                                <td>{product.quantity}</td>
                                                <td>¥{product.totalPrice}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </TableList>
                        </div>
                    </div>
                </div>
            </div>)
    }
}
