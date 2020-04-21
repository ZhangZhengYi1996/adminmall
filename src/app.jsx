import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//页面
import Home from "page/home/index.jsx";
import Layout from "component/layout/index.jsx";

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/product" component={Home} exact />
            <Route path="/product-category" component={Home} exact />
          </Switch>  
        </Layout>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);


