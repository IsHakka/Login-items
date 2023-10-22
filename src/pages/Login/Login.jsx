import './index.scss';
import { Card, Form, Input, Button } from 'antd';
import logo from './../../assets/logo.jpeg';

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
      };
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="mobile"
                        // 多層驗證
                        rules={[{ required: true, message: '請輸入手機號碼' },
                        {
                            pattern: /^09\d{2}-?\d{3}-?\d{3}$/,
                            message: '請輸入正確的手機格式'
                        }]}>
                        <Input size="large" placeholder="請輸入手機號碼" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[{ required: true, message: '請輸入驗證碼' }]}>
                        <Input size="large" placeholder="請輸入驗證碼" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登入
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login