import React, { Component } from 'react'
import "./category-selector.scss"
import MUtil from "util/mm.jsx";
import Product from "service/product-service.jsx";
const _product = new Product();
const _mm = new MUtil();
//品类选择组件
export default class CategorySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0,
        }
    }
    componentDidMount() {
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        //数据没有发生变化的时候，不作处理
        if (!categoryIdChange && !parentCategoryIdChange) {
            return;
        }
        //加入只有一级品类
        if (nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            })
        } else {
            //有两层
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory();
            })
        }
    }

    //加载一级分类
    loadFirstCategory() {
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            })
        }, err => {
            _mm.errorTips();
        });
    }
    //加载二级分类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            })
        }, err => {
            _mm.errorTips();
        });
    }
    //选择一级分类
    onFirstCategoryChanged(e) {
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            //更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }
    //选择二级品类
    onSecondCategoryChanged(e) {
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue,
        }, () => {
            this.onPropsCategoryChange();
        })
    }
    //传给父组件选中的结果
    onPropsCategoryChange() {
        //判断props里的回调函数是否 存在
        let categoryChangeable = typeof this.props.onCategoryChange === "function";
        //如果有二级品类
        if (this.state.secondCategoryId) {
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        } else {
            //如果只有一级品类
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }
    render() {
        return (
            <div className="col-md-10">
                <select className="form-control cate-select"
                    readOnly={this.props.readOnly}
                    value={this.state.firstCategoryId}
                    onChange={(e) => this.onFirstCategoryChanged(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => {
                            return (
                                <option value={category.id} key={index}>{category.name}</option>
                            )
                        })
                    }
                </select>
                {this.state.secondCategoryList.length ? (
                    <select className="form-control cate-select"
                    readOnly={this.props.readOnly}
                        value={this.state.secondCategoryId}
                        onChange={(e) => this.onSecondCategoryChanged(e)}>
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map((category, index) => {
                                return (
                                    <option value={category.id} key={index}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                ) : null}

            </div>
        )
    }
}
