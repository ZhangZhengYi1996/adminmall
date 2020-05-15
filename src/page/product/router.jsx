import React, { Component } from 'react';
import { BrowserRouter,Route, Switch, NavLink, Link ,Redirect} from 'react-router-dom';
import ProductList from "page/product/index/index.jsx";
import ProductSave from "page/product/index/save.jsx";
import ProductDetail from 'page/product/index/detail.jsx';

export default class ProductRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                {/* <Route path="/product/save" component={ProductSave}/> */}
                <Redirect from="/product" to="/product/index" exact/>
            </Switch>
        )
    }
}
