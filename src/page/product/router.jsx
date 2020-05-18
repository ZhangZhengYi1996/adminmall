import React, { Component } from 'react';
import { BrowserRouter,Route, Switch, NavLink, Link ,Redirect} from 'react-router-dom';
import ProductList from "page/product/index/index.jsx";
import ProductSave from "page/product/index/save.jsx";
import ProductDetail from 'page/product/index/detail.jsx';
import CategoryList from "page/product/category/index.jsx";
import CategoryAdd from 'page/product/category/add.jsx';

export default class ProductRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                <Route path="/product-category/index/:categoryId?" component={CategoryList}/>
                <Route path="/product-category/add" component={CategoryAdd}/>
                <Redirect from="/product" to="/product/index" exact/>
                <Redirect from="/product-category" to="/product-category/index" exact/>
            </Switch>
        )
    }
}
