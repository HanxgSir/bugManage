/**
 * Created by Administrator on 2017/2/23.
 */
import React from 'react';
import { render } from 'react-dom';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';
import Cascader from 'antd/lib/cascader';
import Select from 'antd/lib/select';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Checkbox  from 'antd/lib/checkbox';

const FormItem = Form.Item;
const Option = Select.Option;
class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordDirty: false
        };
        // 提交注册
        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('注册信息: ', values);
                    $.post('/register', values, function (data) {
                        console.log(data);
                    })
                }
            });
        };
        this.handlePasswordBlur = (e) => {
            const value = e.target.value;
            this.setState({passwordDirty: this.state.passwordDirty || !!value});
        };

        this.checkPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('两次输入的密码不一致!');
            } else {
                callback();
            }
        };
        this.checkConfirm = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.passwordDirty) {
                form.validateFields(['confirm'], {force: true});
            }
            callback();
        };
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6
            }
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86'
        })(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <div className="content_box">
                <div className="register_box">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                            hasFeedback
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: '邮箱格式不正确！'
                                }, {
                                    required: true, message: '请输入邮箱！'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入密码！'
                                }, {
                                    validator: this.checkConfirm
                                }]
                            })(
                                <Input type="password" onBlur={this.handlePasswordBlur}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认你的密码！'
                                }, {
                                    validator: this.checkPassword
                                }]
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
            <span>
              昵称
              <Tooltip title="你想让别人怎么称呼你？">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
                            hasFeedback
                        >
                            {getFieldDecorator('nickname', {
                                rules: [{required: true, message: '请输入你的昵称'}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="电话"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{required: true, message: '请输入电话'}]
                            })(
                                <Input addonBefore={prefixSelector}/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">注册</Button>
                            <a href="/" className="loginBtn">已有帐号，快去登录</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const Register = Form.create()(RegisterComponent);
module.exports = Register;
