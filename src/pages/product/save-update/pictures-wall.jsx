import React,{Component} from "react";
import { Upload, Icon, Modal } from 'antd';
import PropsTypes from 'prop-types';
export default  class  PicturesWall   extends Component{
    static propTypes = {
        _id: PropsTypes.string.isRequired,
        imgs: PropsTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: this.props.imgs.map((img,index)=>{
                return {
                    uid: -index,
                    name: img,
                    status: 'done',    //upload加载图片状态
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
    handleChange = ({ fileList }) => this.setState({ fileList })

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
