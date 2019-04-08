import React,{Component} from "react";
import { Card ,Icon, Form, Input, Button, Cascader,InputNumber,message} from 'antd';

import RichTextEditor from './rich-text-editor';
import { reqGetCategories } from '../../api';

import './save-update.less';
const  Item = Form.Item;


export default  class  SaveUpdate  extends Component{
    constructor(props) {
        super(props);
        this.state={
            options:[],  //级联列表的数据
        }
    }

    //点击箭头 退出添加品类  回退到上一级路由
    goBack = ()=>{
        this.props.history.goBack();
    }

    //级联选择器change事件
    onChange = (value)=>{
        console.log(value)
    }

    //提交表单
    submit = ()=>{

    }
    //form表单的宽度
    formItemLayout = {
        // 调整Item中label占据多少列
        labelCol: {
            xs:{span: 24},
            sm:{span: 2},
        },
        // 调整Item的内容占据多少列
        wrapperCol: {
            xs:{span: 24},
            sm:{span: 10},
        },
    };

    //请求分类数据
    getCategories = async (parentId)=>{
        const  result =await reqGetCategories(parentId);
        if(result.status === 0){
            if(parentId === '0'){
                this.setState({
                /* 生成options格式如下
                const options = [
                    {
                    value: 'zhejiang',    //实际是通过value查找的name,value即为一级菜单数据的_id
                    label: 'Zhejiang',   //表单中显示的结果name
                    children: [{
                        value: 'hangzhou',
                        label: 'Hangzhou',
                    }],
                }];*/
                    options: result.data.map((item)=>{
                        return {
                            value: item._id,
                            label:item.name
                        }
                    })
                })
            }else{

            }
        }else{
            message.error(result.msg);
        }
    }

    //请求所有一级分类数据
    componentDidMount() {
        this.getCategories('0');
    }

    render (){
        const {options} = this.state;
        return (
          <Card
              title={<div className="save-update-title" onClick={this.goBack}><Icon type="arrow-left" className="save-update-icon" />&nbsp;&nbsp;<span>添加商品</span></div>}
              style={{ width: '100%' }}
          >
              <Form {...this.formItemLayout} onClick={this.submit}>
                  <Item  label="商品名称">
                          <Input placeholder="请输入商品名称" />
                  </Item>
                  <Item   label="商品描述">
                          <Input placeholder="请输入商品描述" />
                  </Item>
                  <Item
                      label="选择分类"
                      wrapperCol={{
                          xs:{span: 24},
                          sm:{span: 5},
                      }}
                  >
                      <Cascader
                          options={options}
                          onChange={this.onChange}
                          placeholder="请选择分类"
                      />
                  </Item>
                  <Item
                      label="商品价格"
                      wrapperCol={{
                          xs:{span: 24},
                          sm:{span: 5},
                      }}
                  >
                      <InputNumber
                          className="save-update-input-number"
                          // 每3位数字就有一个，并且开头￥
                          formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          // 去除非数字的内容   特殊字符不需要咋转义
                          parser={value => value.replace(/￥\s?|(,*)/g, '')}
                          // onChange={this.onChange}
                      />
                  </Item>
                  <Item
                      label="商品详情"
                      wrapperCol={{
                          xs:{span: 24},
                          sm:{span: 22},
                      }}
                  >
                      <RichTextEditor />
                  </Item>
                  <Item >
                      <Button type="primary"  className="save-update-button" onClick={this.check} htmlType="submit">
                          提交
                      </Button>
                  </Item>
              </Form>
          </Card>
      )
    }
}
