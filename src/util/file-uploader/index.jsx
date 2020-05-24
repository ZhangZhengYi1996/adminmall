import React, { Component } from 'react';
import FileUpload from './react-fileupload.jsx';

export default class FileUploader extends Component {
    render() {
        /*set properties*/
        const options = {
            baseUrl: '/manage/product/upload.do',
            fileFieldName: "upload_file",
            dataType: "json",
            chooseAndUpload:true,
            uploadSuccess: (res)=>{this.props.onSuccess(res.data)},
            uploadError: (err)=>{this.props.onError(err.message)}
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload" className="btn btn-xs btn-default">选择图片</button>
            </FileUpload>
        )
    }
}

