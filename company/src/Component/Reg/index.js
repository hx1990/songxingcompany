
import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Upload } from 'antd';
import './index.css'



const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;



class RegistrationForm extends React.Component {
  constructor(){
    super()
    let that=this
    this.mode1={
      action: '/upload/picture',
      onChange({ file}) {
        if(file.status==="done"){
          that.setState({
            show1:false,
            idCardDownUrl:file.response.data
          })
        }
      },
    }
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致，请重新输入!');
    } else {
      callback();
    }
  }
  
  compareCode = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== '12345') {
      callback('输入验证码不正确，请重新输入!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  settlement(e){
    
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    

    

    return (
        <div className='reg'>
        <h2>企业结算申请</h2>
      <Form onSubmit={this.handleSubmit} className='form'>
      <FormItem {...formItemLayout}  label="选择结算方式" >
      {getFieldDecorator('nickname6', {
            rules: [{ required: true, message: '!', whitespace: true }],
          })(
            <Select defaultValue="日结" style={{ width: 120 }} onChange={this.settlement.bind(this)}>
                 <Option value="1">日结</Option>
                 <Option value="2">月结</Option>
           </Select>
          )}
        </FormItem>

       <FormItem {...formItemLayout}  label="企业名称" >
           {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入您公司的名称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="企业地址">
          {getFieldDecorator('nickname2', { rules: [{ required: true, message: '请输入公司地址!', whitespace: true }],  })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="联系人">
          {getFieldDecorator('nickname5', { rules: [{ required: true, message: '请输入企业联系人姓名!', whitespace: true }],  })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="联系人电话">
          {getFieldDecorator('nickname6', { rules: [{ required: true, message: '请输入企业联系人电话!', whitespace: true }],  })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="法人姓名">
          {getFieldDecorator('nickname7', { rules: [{ required: true, message: '请输入企业法人姓名!', whitespace: true }],  })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="法人电话">
          {getFieldDecorator('nickname8', { rules: [{ required: true, message: '请输入企业法人电话!', whitespace: true }],  })(
            <Input />
          )}
        </FormItem>

        <FormItem {...formItemLayout}  label="上传营业执照">
          {getFieldDecorator('nickname9', { rules: [{ required: true, message: '请输入公司法人姓名!', whitespace: true }],  })(
            <div>
            <Upload {...this.mode} >
            <Button > <Icon type="upload" />上传营业执照 </Button>
            </Upload>
            <img alt='' src={this.state.contractUrl}/>
            </div>
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="上传法人身份证正面">
          {getFieldDecorator('nickname10', { rules: [{ required: true, message: '请输入公司法人姓名!', whitespace: true }],  })(
            <div>
            <Upload {...this.mode} >
            <Button > <Icon type="upload" />上传法人身份证正面 </Button>
            </Upload>
            <img alt='' src={this.state.contractUrl}/>
            </div>
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="上传法人身份证反面">
          {getFieldDecorator('nickname8', { rules: [{ required: true, message: '请输入公司法人姓名!', whitespace: true }],  })(
            <div>
            <Upload {...this.mode} >
            <Button > <Icon type="upload" />上传法人身份证反面</Button>
            </Upload>
            <img alt='' src={this.state.contractUrl}/>
            </div>
          )}
        </FormItem>

        {/* <FormItem {...formItemLayout}  label="企业邮箱" >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '你输入的邮箱不合法',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
            
          )}
        </FormItem> */}
        {/* <FormItem {...formItemLayout} label="注册手机号">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入注册手机号!' }],
          })(<span>
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            <Button>获取验证码</Button>
            </span>
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="验证码" >
      {getFieldDecorator('nickname1', {
            rules: [{ required: true, message: '请输入验证码!',  },{
                validator: this.compareCode,
              }],
          })(
            <Input />
          )}
        </FormItem> */}
        {/* <FormItem {...formItemLayout}  label="注册密码" >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>

        <FormItem  {...formItemLayout}  label="重新输入密码" >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请重新输入密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem> */}

        
        {/* <FormItem {...formItemLayout}  label="企业联系人">
          {getFieldDecorator('nickname3', { rules: [{ required: true, message: '请输入企业联系人!', whitespace: true }],  })(
            <Input />
          )}
        </FormItem>
        
        <FormItem {...formItemLayout} label="联系人电话">
          {getFieldDecorator('phone1', {
            rules: [{ required: true, message: '请输企业联系人电话!' }],
          })(
            <Input  style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem {...formItemLayout}  label="法人代表">
          {getFieldDecorator('nickname4', { rules: [{ required: true, message: '请输入公司法人姓名!', whitespace: true }],  })(
            <Input />
          )}
        </FormItem> */}
        
        
        {/* <FormItem
          {...formItemLayout}
          label="Website"
        >
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'Please input website!' }],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(
                <Input />
              )}
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem> */}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">注册</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const  Reg = Form.create()(RegistrationForm);


export default Reg