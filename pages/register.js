import { Form, Input, Row, Button, Card, Divider, Typography, Col } from 'antd'
import Link from 'next/link'

const Register = ({ map }) => {
    const form = Form.useForm()
    return (
        <Row justify='center'>

            <Col xs={0} sm={0} md={0} lg={0} xl={12} xxl={12}>
                <Card style={{ borderRadius: 5, padding: 5, width: '100%', height: '100%' }}>
                    <Row justify='center' align="middle" style={{ minHeight: '100vh' }}>
                        <img src="/images/register-logo.svg" width='70%' alt="register" />
                    </Row>
                </Card>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                <Card style={{ borderRadius: 5, padding: 5, minHeight: '100vh' }}>
                    <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
                        <Col xs={22} sm={18} md={18} lg={18} xl={20} xxl={20}>
                            <Form ref={form}>
                                <Typography.Title level={3}>Sign up</Typography.Title>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} width={250} />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} width={250} />
                                </Form.Item>
                                <Form.Item
                                    label="Confirm password"
                                    name="confirmPassword"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} width={250} />
                                </Form.Item>
                                <Form.Item
                                    label="First name"
                                    name="firstName"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} width={250} />
                                </Form.Item>
                                <Form.Item
                                    label="Last name"
                                    name="lastName"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} width={250} />
                                </Form.Item>
                                <Form.Item
                                    label="Phone"
                                    name="phone"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} width={250} />
                                </Form.Item>
                                <Form.Item
                                    label="Referrer Code"
                                    name="reffererCode"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} width={250} />
                                </Form.Item>
                                <Form.Item
                                    label=' '
                                    labelCol={{ span: 24 }}
                                >
                                    <Button style={{
                                        borderRadius: 50,
                                        width: '100%',
                                        background: '#1BB61D',
                                        color: '#fff',
                                        height: '40px'
                                    }}>
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>

                </Card>
            </Col>
        </Row >
    )
}

export default Register