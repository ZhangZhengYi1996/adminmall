import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//页面
import Home from "page/home/index.jsx";
import Layout from "component/layout/index.jsx";
import Login from "page/login/index.jsx";
import ErrorPage from "page/error/index.jsx";
import UserList from "page/user/index.jsx"
import ProductRouter from "page/product/router.jsx";
import OrderList from "page/order/index.jsx";
import OrderDetail from "page/order/detail.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let LayOutRouter = (
      <Layout>
        <Switch>
          <Route path="/product" component={ProductRouter} />
          <Route path="/product-category" component={ProductRouter}/>
          <Route path="/" component={Home} exact />
          <Route path="/order/index" component={OrderList} />
          <Route path="/order/detail/:orderNumber" component={OrderDetail} />
          <Route path="/user/index" component={UserList} />
          <Redirect from="/order" to="/order/index" exact />
          <Redirect from="/user" to="/user/index" exact />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>);

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path='/' render={props => LayOutRouter} />
        </Switch>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById("app")
);


