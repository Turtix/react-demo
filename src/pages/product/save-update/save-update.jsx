import React,{Component} from "react";
import { Card ,Icon, Form, Input, Button, Cascader,InputNumber,message} from 'antd';

import RichTextEditor from './rich-text-editor';
import { reqGetCategories } from '../../../api';

import './save-update.less';
const  Item = Form.Item;

@Form.create()
class  SaveUpdate  extends Component{
    constructor(props) {
        super(props);
        this.state={
            options:[],  //级联列表的数据
        }
        this.richTextEditor = React.createRef();
    }

    //点击箭头 退出添加品类  回退到上一级路由
    goBack = ()=>{
        this.props.history.goBack();
    }

    //级联选择器change事件
    onChange = (value)=>{
        // console.log(value)
    }

    //提交表单
    submit = (e)=>{
        e.preventDefault();
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                console.log( values);
                console.log(this.richTextEditor.current.state.editorState.toHTML());
            }
        });
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
                            label:item.name,
                            isLeaf: false,       //实现懒加载
                        }
                    })
                })
            }else{
                const  { options } = this.state;
                this.setState({
                    options: options.map((item)=>{
                        if(item.value === parentId){
                            //说明找到了要修改的分类
                            item.children = result.data.map((item)=>{
                                return {
                                    value: item._id,
                                    label:item.name,
                                    //isLeaf: false,       //二级目录不能实现懒加载
                                }
                            });
                            item.loading = false;    //请求回来  取消loading状态.
                            item.isLeaf = true;      //请求回来  取消loading状态.
                        }
                        return  item;
                    })
                })
            }
        }else{
            message.error(result.msg);
        }
    }

    //请求所有一级分类数据
    componentDidMount() {
        this.getCategories('0');
    }

    //加载二级分类数据
    loadData = (selectedOptions) => {
        //传入options数组,并拿到数组的最后一项,selectedOptions拿到的是一个数组,targetOption是数组里面的最后一个对象.
        const targetOption = selectedOptions[selectedOptions.length - 1];

        //显示loading状态
        targetOption.loading = true;

        console.log(selectedOptions)
        console.log(targetOption)    //{value: "5ca562f4718ec41748232bfd", label: "电脑", isLeaf: false}

        //点击一级菜单  加载二级分类数据
        this.getCategories(targetOption.value);

        // 模拟异步请求 懒加载 options
        setTimeout(() => {
            //请求成功去掉loading状态.
           /* targetOption.loading = false;
            targetOption.isLeaf = true;*/

        }, 1000);
    }


    render (){
        const {options} = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
          <Card
              title={<div className="save-update-title" onClick={this.goBack}><Icon type="arrow-left" className="save-update-icon" />&nbsp;&nbsp;<span>添加商品</span></div>}
              style={{ width: '100%' }}
          >
              <Form {...this.formItemLayout} onClick={this.submit}>
                  <Item  label="商品名称">
                      {/*第一次调用,第一个参数要和文档中的请求参数一致,whiteSpace:true  允许有空格*/}
                      {getFieldDecorator('name', {
                          rules: [{ required: true,whiteSpace:true, message: '商品名称不能为空!' }],
                      })(
                         <Input placeholder="请输入商品名称" />
                      )}
                  </Item>
                  <Item   label="商品描述">
                      {getFieldDecorator('desc', {
                          rules: [{ required: true,whiteSpace:true, message: '商品名称不能为空!' }],
                      })(
                         <Input placeholder="请输入商品描述" />
                      )}
                  </Item>
                  <Item
                      label="选择分类"
                      wrapperCol={{
                          xs:{span: 24},
                          sm:{span: 5},
                      }}
                  >
                      {getFieldDecorator('category', {
                          rules: [{ required: true, message: '请选择商品分类!' }],
                      })(
                            <Cascader
                              options={options}
                              onChange={this.onChange}
                              placeholder="请选择分类"
                              loadData={this.loadData}    //加载数据
                              changeOnSelect       //当此项为 true 时，点选每级菜单选项值都会发生变化
                            />
                      )}
                  </Item>
                  <Item
                      label="商品价格"
                      wrapperCol={{
                          xs:{span: 24},
                          sm:{span: 5},
                      }}
                  >
                      {getFieldDecorator('price', {
                          rules: [{ required: true, message: '请输入商品价格!' }],
                      })(
                          <InputNumber
                              className="save-update-input-number"
                              // 每3位数字就有一个，并且开头￥
                              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              // 去除非数字的内容   特殊字符不需要咋转义
                              parser={value => value.replace(/￥\s?|(,*)/g, '')}
                              // onChange={this.onChange}
                          />
                      )}
                  </Item>
                  <Item
                      label="商品详情"
                      wrapperCol={{
                          xs:{span: 24},
                          sm:{span: 22},
                      }}
                  >
                      {/* 1.RichTextEditor不是antd的原生组件,所以不能用getFieldDecorator来校验
                          2.父组件获取子组件的内容   可以用ref
                      */}
                      <RichTextEditor ref={this.richTextEditor}/>
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
export default  SaveUpdate;
