import React from 'react'
import PropsTypes from 'prop-types';
// 引入编辑器组件
import BraftEditor from 'braft-editor';

// 引入编辑器样式
import 'braft-editor/dist/index.css'

export default class RichTextEditor extends React.Component {
    static propTypes = {
        detail: PropsTypes.string
    }
    constructor(props){
        super(props);
        this.state = {
            // 如果是添加商品:创建一个空的editorState作为初始值  如果修改商品:将商品详情展示出来.
            editorState: BraftEditor.createEditorState(this.props.detail)
        }
    }

    //修改
    componentDidMount () {
        //如果富文本框detail原来没有值,就给它设置一个初始值.
        if(!this.props.detail){
            // 假设此处从服务端获取html格式的编辑器内容
            const htmlContent =  '请输入商品详细信息';
            // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
            this.setState({
                editorState: BraftEditor.createEditorState(htmlContent)
            })
        }

    }

    //提交会触发该函数
    /*submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
    }*/

    //一旦内容发生变化  就会触发该函数
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render () {
        const { editorState } = this.state;
        return (
            <div className="my-component" style={{border: '1px solid #d9d9d9', height: 300, borderRadius: 4}}>
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    // onSave={this.submitContent}  //保存方法已经不需要
                />
            </div>
        )

    }

}
