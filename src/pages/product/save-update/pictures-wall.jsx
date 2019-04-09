import React,{Component} from "react";
import { Upload, Icon, Modal,message } from 'antd';
import PropsTypes from 'prop-types';
import {reqDelImage} from "../../../api";
export default  class  PicturesWall   extends Component{
    static propTypes = {
        _id: PropsTypes.string.isRequired,   //商品id
        imgs: PropsTypes.array.isRequired    //图片信息
    }

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: this.props.imgs.map((img,index)=>{
                return {
                    uid: -index,        // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
                    name: img,          // 文件名
                    status: 'done',    //upload加载图片状态  // 状态有：uploading done error removed
                    response: '{"status": "success"}',          // 服务端响应内容
                    url: 'http://localhost:5000/update'+img,  //图片路径
                }
            }) ,

        };
    }
    //取消
    handleCancel = () => this.setState({ previewVisible: false })

    //预览
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    //变化  上传/删除
    handleChange = async ({ file,fileList }) => {
        console.log(file)
        console.log(1111111111111)
        console.log(fileList)
        if(file.status === 'done'){
            //图片上传完成   修改图片name
            //找到上传的图片   也就是最后一张图片
            const lastFile = fileList[fileList.length-1];
            lastFile.name = file.response.data.name;
            lastFile.url = file.response.data.url;

        }else if(file.status === 'removed'){
            //删除图片
            const { name } = file;
            const {_id} = this.props;

            //发送请求  删除图片
            const result = await  reqDelImage(name,_id);
            if(result.status === 0){
                message.success('删除图片成功~')
            }else {
                message.error(result.msg);
            }
        }else if(file.status === 'error'){
            //图片上传失败
            message.error('图片上传失败')
        }
        this.setState({ fileList })
    }

    render (){
        const { previewVisible, previewImage, fileList } = this.state;
        const { _id ,imgs } = this.props;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
      return (
          <div className="clearfix">
              {/* 上传图片 */}
              <Upload
                  action="/manage/img/upload"     //上传图片请求地址
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  name="image"                    //发到后台的文件参数名
                  data={{_id}}                      //上传所需参数或返回上传参数的方法,参数类型object|(file) => object.
              >
                  {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
          </div>
      )
    }
}
