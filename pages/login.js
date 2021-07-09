import { Form, Input, Row, Button, Card, Divider, Col, Typography } from 'antd'
import Link from 'next/link'

const Login = () => {
    const form = Form.useForm()

    return (
        <Row justify='center'>
            <Col xs={0} sm={0} md={0} lg={0} xl={12} xxl={12}>
                <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
                    <img src="/images/key-logo.svg" alt="key-logo" width={500} height={500} />
                </Row>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                <Card style={{ padding: 10, minHeight: '100vh' }}>
                    <Row justify='center' align="middle" style={{ minHeight: '100vh' }}>
                        <Col xs={24} sm={22} md={18} lg={16} xl={16} xxl={12}>
                            <Form ref={form}>
                                <Row justify='center'>
                                    <img src="/images/sprout-logo.svg" width='100%' alt="sprout" />
                                </Row>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your Email!' }]}
                                >
                                    <Input style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password style={{ borderRadius: 50, background: 'rgb(240, 242, 245)', height: '40px' }} />
                                </Form.Item>
                                <Form.Item
                                    label=' '
                                    labelCol={{ span: 24 }}
                                >
                                    <Button style={{
                                        borderRadius: 50,
                                        width: '100%',
                                        height: '40px',
                                        background: '#1BB61D',
                                        color: '#fff'
                                    }}>
                                        Login
                                    </Button>
                                </Form.Item>

                                <Divider />

                                <Row justify='space-between' style={{ paddingBottom: 15 }}>
                                    <Col xs={13} sm={12} md={12} xl={12} xxl={12}>
                                        <Row justify='start'>
                                            <Typography.Text style={{ textAlign: 'center' }}>
                                                {`Don't have an account? `}
                                                <Link href='/register'>
                                                    <a>Sign up</a>
                                                </Link>
                                            </Typography.Text>
                                        </Row>
                                    </Col>
                                    <Col xs={11} sm={12} md={12} xl={12} xxl={12}>
                                        <Row justify='end'>
                                            <Typography.Text style={{ textAlign: 'center' }}>
                                                <Link href='/register'><a>Forgot Password?</a></Link>
                                            </Typography.Text>
                                        </Row>
                                    </Col>
                                </Row>

                                <Form.Item>
                                    <Button icon={
                                        <img
                                            style={{ margin: 2.5 }}
                                            src='/images/facebook-logo.svg'
                                            width={20}
                                            height={20}
                                        />
                                    }
                                        style={{
                                            borderRadius: 50,
                                            background: '#3B5998',
                                            color: '#fff',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '40px',
                                            alignItems: 'center'
                                        }}>
                                        Login with your Facebook account
                                    </Button>
                                </Form.Item>
                                <Form.Item >
                                    <Button
                                        icon={
                                            <img src='/images/google-logo.svg' style={{ margin: 2.5 }} width={20} height={20} />
                                        }
                                        style={{
                                            borderRadius: 50,
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'center',
                                            marginTop: 10,
                                            height: '40px',
                                            alignItems: 'center'
                                        }} >
                                        Login with your Google account
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default Login