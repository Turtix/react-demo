import React,{Component} from "react";
import {Form, Input} from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;

@Form.create()
 class  UpdateCategoryNameForm  extends Component{
    constructor(props) {
        super(props);
        this.proptype = {
            categoryName: PropTypes.string.isRequired
        }

    }
    /*
        自定义表单校验
    */
    validator = (rule,value,callback)=>{
        const { categoryName } = this.props;
        if (!value) {
            callback('请输入要修改的分类名称，不能为空');
        } else if (value === categoryName) {
            callback('不能与修改前分类名称相同');
        } else {
            callback();
        }
    }
    render (){
      const {form:{getFieldDecorator},categoryName} = this.props;
      return (
          <Form onSubmit={this.handleSubmit} className="login-form">
              <Item>
                  {getFieldDecorator(
                      'categoryName',
                      {
                          initialValue: categoryName,
                          rules: [
                              //自定义表单校验
                              {validator: this.validator}
                          ]
                      }
                  )(
                      <Input  placeholder="请输入要修改的分类名称~" />
                  )}
              </Item>
          </Form>
      )
    }
}
export default UpdateCategoryNameForm
