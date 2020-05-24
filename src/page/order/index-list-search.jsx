import React, { Component } from 'react'

export default class ListSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderNumber:""
        }
    }
    //数据变化的时候
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
            this.setState({
                [name]:value
            })
    }
    //点击搜索的时候
    onSearch(){
       this.props.onSearch(this.state.orderNumber)
    }
    //按回车，自动提交
    onSearchKeyWordKeyUp(e){
        if(e.keyCode===13){
            this.onSearch();
        }
          
    }

    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="from-control">
                                <option value="">按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="订单号"
                                name="orderNumber"
                                onChange={(e) => { this.onValueChange(e) }}
                                onKeyUp={(e)=>{this.onSearchKeyWordKeyUp(e)}}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={(e)=>{this.onSearch()}} >搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
