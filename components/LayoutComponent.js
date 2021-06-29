import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu, Col, Row, Button, Typography, Card } from 'antd';
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faBars } from "@fortawesome/free-solid-svg-icons";

const { Header, Content, Footer } = Layout;
const LayoutComponent = ({ children }) => {

    return (
        <Layout className="navbar-layout" >
            <Row align='middle'>
                <Col xs={7} sm={7} md={{ span: 10, offset: 1 }} xl={{ span: 8 }} xxl={{ span: 7, offset: 1 }}>
                    <Row justify='center' align='middle' gutter={5}>
                        <Col>
                            <img
                                className="logo-img"
                                src="/icons/sprout.svg"
                                alt="sprout"
                                width='50%'
                                height='50%'
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 16 }} sm={{ span: 16 }} md={{ span: 10, offset: 2 }} xl={{ span: 10, offset: 4 }} xxl={{ span: 7, offset: 5 }} >
                    <Row justify='end' align='middle' wrap={false}>
                        <Link href='/login'><Button className='login-button' type='ghost'>Sign In</Button></Link>
                        <Link href='/register'><Button className='signup-button' style={{backgroundColor:"#35b729",color:'white'}}>Sign UP</Button></Link>
                    </Row>
                </Col>
            </Row>
            <Header className="header" style={{backgroundColor:'#35b729',height:'100%'}}>
                <nav className="navbar " style={{width:'100%'}}>
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className="checkbtn">
                        <FontAwesomeIcon icon={faBars} color='#ffffff'></FontAwesomeIcon>
                    </label>
                    <ul className='navbar-menu'>
                        {/* <li className="test"><Link href='/'><a className='active'>home</a></Link></li>
                        <li><Link href='/membership'><a className='active'>membership</a></Link></li>
                        <li><Link href='/logistic'><a className='active'>logistic</a></Link></li>
                        <li><Link href='/it'><a className='active'>IT</a></Link></li> */}
                    </ul>
                </nav>
            </Header>
            <Content style={{ padding: 0, marginTop: -22 ,height:'100%'}}>
                {children}
            </Content>
            <Footer style={{ margin: 0, backgroundColor: "#35b729" }}>
                <Row justify='center' style={{ color: '#fff' }}>
                    <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
                        <Row justify='center' >
                            <Typography.Text style={{ fontFamily: 'Sukhumvit Set', color: '#fff', fontSize: 18 }}> All rights reserved. Copyright © 2021 Sprout Co., Ltd.</Typography.Text>
                            
                        </Row>
                    </Col>
                </Row>
            </Footer>
        </Layout >
    )
}

export default LayoutComponent