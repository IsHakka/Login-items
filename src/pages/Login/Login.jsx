import './index.scss';
import { Card, Form, Input, Button, message } from 'antd';
import logo from './../../assets/logo.jpeg';
import { useDispatch } from 'react-redux';
import { fetchLogin} from '../../store/modules/user';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        await dispatch(fetchLogin(values));
        // 跳轉首頁
        navigate('/');
        message.success('登入成功');
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
                        rules={[{ required: true, message: '請輸入學生證' },
                        {
                            // pattern: /^09\d{2}-?\d{3}-?\d{3}$/,
                            message: '請輸入正確的格式'
                        }]}>
                        <Input size="large" placeholder="請輸入學生證" />
                    </Form.Item>
                    <span>學生證:13800000002 驗證碼:246810</span>
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