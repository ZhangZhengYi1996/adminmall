import React, { Component } from 'react'
import PageTitle from "component/page-title/index.jsx";
import MUtil from "util/mm.jsx";
import Product from "service/product-service.jsx";
import CategorySelector from './category-selector.jsx';

import "./save.scss";

const _product = new Product();
const _mm = new MUtil();


export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            name: "",
            subtitle: "",
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: "",
            stock: "",
            detail: "",
            status: 1//1为在售
        }
    }
    componentDidMount() {
        this.loadProduct();
    }
    //加载商品详情
    loadProduct() {
        //有id，表示是编辑商品，需要表单回填
        if (this.state.id) {
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(",");
                res.subImages = images.map((imgUri) => {
                    return ({
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    })
                })
                this.setState(res);
            }, (err) => {
                _mm.errorTips(err);
            })
        }
    }


    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    value={this.state.price}
                                    readOnly
                                />
                                <span className="input-group-addon" >元</span>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    value={this.state.stock}
                                   readOnly
                                />
                                <span className="input-group-addon" >件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ?
                                    this.state.subImages.map((img, index) => {
                                        return (
                                            <div className="img-con" key={index}>
                                                <img src={img.url} className="img" />
                                            </div>

                                        )
                                    }) : (<div>暂无图片</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}>
                            
                        </div>
                    </div>
                   
                </div>
            </div>
        )
    }
}
