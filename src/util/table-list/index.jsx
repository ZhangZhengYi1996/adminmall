import React, { Component } from 'react';
//通用的列表
class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLoading: true,
        };
    }
    componentWillReceiveProps() {
        this.setState({
            //只有在第一次挂载的时候为true
            firstLoading: false,
        })
    }
    render() {
        //表头信息
        let tableHeader = this.props.tableHeads.map((head, index) => {
            if (typeof head === "object") {
                return (
                    <th key={index} width={head.width}>{head.name}</th>
                )
            } else if (typeof head === "string") {
                return (
                    <th key={index}>{head}</th>
                )
            }

        });
        //列表内容
        let listBody = this.props.children;
        //列表信息
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.firstLoading ? "正在加载。。。" : "没有找到相应的结果～"}
                </td>
            </tr>
        )
        let tableBody = listBody.length > 0 ? listBody : listInfo;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default TableList;