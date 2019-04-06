

import React,{Component} from "react";
import {Form, Input,Select} from "antd";

import  PropTypes from 'prop-types';

const Item = Form.Item;

@Form.create()
 class  AddCategoryForm  extends Component{
    constructor(props) {
        super(props);
        this.proptype = {
            categories: PropTypes.array.isRequired,

        }

    }
    /*
        自定义表单校验
    */
    validator = (rule,value,callback)=>{
        // console.log(rule,value);
        const {categories} = this.props;
        const  category = categories.find((category)=>category.name === value);
        if(!value){
            callback("分类名称不能为空~");
        }else if(category){
            callback("不能与之前的分类名称相同~");
        }else{
            callback();
        }
    }


    render (){
       const {form:{getFieldDecorator} ,categories } = this.props;
       // console.log(categories);
      return (
          <Form onSubmit={this.handleSubmit} className="login-form">
              <Item label="所属分类">
                  {getFieldDecorator(
                      'parentId',
                      {
                         initialValue: '0'
                      }
                  )(
                      <Select >
                          <option key="0" value="0">一级分类</option>
                          {
                              categories.map((category)=><option key={category._id} value={category._id}>{category.name}</option>)
                          }
                      </Select>
                  )}
              </Item>
              <Item label="分类名称">
                  {getFieldDecorator(
                      'categoryName',
                      {
                          rules: [
                              //自定义表单校验
                              {validator: this.validator}
                          ]
                      }
                  )(
                      <Input  placeholder="请输入要添加的品类" />
                  )}
              </Item>
          </Form>
      )
    }
}
export default  AddCategoryForm
