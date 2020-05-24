import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import "./index.scss"

class RichEditor extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.loadEditor();
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.defaultDetail!==nextProps.defaultDetail){
			this.simditor.setValue(nextProps.defaultDetail)
		}
		
	}
	
	loadEditor() {
		let element = this.refs['editor'];
		this.simditor = new Simditor({
			textarea: $(element),
			defaultValue: this.props.placeholder || "请输入",
			upload: {
				url: "/manage/product/richtext_img_upload.do",
				defaultImage:"",
				fileKey:"upload_file"

			}
		});
		this.bindEditorEvent();
	}
	//初始化编辑器的事件
	bindEditorEvent() {
		this.simditor.on("valuechanged", e => {
			this.props.onValueChange(this.simditor.getValue())
		})
	}
	render() {
		return (
			<div>
				<textarea ref="editor" placeholder="只需这一行就可以实现富文本编辑器，很nice啊"></textarea>
			</div>
		)

	}
}

export default RichEditor;