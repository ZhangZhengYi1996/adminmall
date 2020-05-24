import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import MUtil from "util/mm.jsx";
import Product from "service/product-service.jsx";
import TableList from "util/table-list/index.jsx";
import "./index.scss";
import ListSearch from './index-list-search.jsx';
const _product = new Product();
const _mm = new MUtil();

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: [],
            listType: "list"
        };
    }
    componentDidMount() {
        this.loadProductList();
    }
    loadProductList() {
        let listParam = {};
        listParam.pageNum = this.state.pageNum;
        listParam.listType = this.state.listType;
        //如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === "search") {
            listParam.searchType = this.state.searchType;
            listParam.keyWord = this.state.searchKeyWord;
        }
        //请求借口
        _product.getProductList(listParam).then(res => {
            this.setState(res);
        }, err => {
            this.setState({
                list: []
            })
            _mm.errorTips();
        });
    }
    //搜索
    onSearch(searchType, searchKeyWord) {
        //console.log(searchType, searchKeyWord)
        let listType = searchKeyWord === "" ? "list" : "search";
        this.setState({
            pageNum: 1,
            listType: listType,
            searchType: searchType,
            searchKeyWord: searchKeyWord
        }, () => {
            this.loadProductList();
        })

    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum
        }, () => {
            this.loadProductList();
        });
    }
    //上架或者下架操作
    onSetProductStatus(e, productId, currentStatus) {
        let newStatus = currentStatus == 1 ? 2 : 1,
            confirmTips = currentStatus == 1 ? "确定要下架商品吗？" : "确定要上架商品吗？";
        if (window.confirm(confirmTips)) {
            _product.SetProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadProductList();
            }, err => {
                _mm.errorTips(err);
            })
        }
    }

    render() {
        let tableHeads = [
            { name: "商品id", width: "10%" },
            { name: "商品信息", width: "50%" },
            { name: "价格", width: "10%" },
            { name: "状态", width: "15%" },
            { name: "操作", width: "15%" },

        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表" >
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/product/save">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyWord) => { this.onSearch(searchType, searchKeyWord) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>¥{product.price}</td>
                                    <td>
                                        <p>{product.status == 1 ? "在售" : '已下架'}</p>
                                        <button
                                            onClick={(e) => { this.onSetProductStatus(e, product.id, product.status) }}
                                            className="btn btn-warning btn-xs"
                                        >
                                            {product.status == 1 ? "下架" : '上架'}
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="opera" to={"/product/detail/" + product.id}>详情</Link>
                                        <Link className="opera" to={"/product/save/" + product.id}>编辑</Link>
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
