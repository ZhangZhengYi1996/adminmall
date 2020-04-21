import React, { Component } from 'react';
import "./theme.css";
import TopNav from "component/top-nav/index.jsx";
import SideNav from "component/side-nav/index.jsx";

export default class Layout extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div id="wrapper">
                <TopNav/>
                <SideNav/>
                {this.props.children}
            </div>
        )
    }
}

