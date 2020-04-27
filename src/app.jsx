import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//页面
import Home from "page/home/index.jsx";
import Layout from "component/layout/index.jsx";
import Login from "page/login/index.jsx";
import ErrorPage from "page/error/index.jsx";
import UserList from "page/user/index.jsx"


class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let LayOutRouter = (
      <Layout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/product" component={Home} />
          <Route path="/product-category" component={Home} />
          <Route path="/user/index" component={UserList} />
          <Redirect from="/user" to="/user/index" exact />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>);

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={(props) => {
            return (
              LayOutRouter
            )
          }} />

        </Switch>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById("app")
);


