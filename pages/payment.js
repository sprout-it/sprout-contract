import { Layout, Col, Row, Card, Typography } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT
const client = new W3CWebSocket(`ws://127.0.0.1:3000/wait`)

const Index = ({
  name,
  callbackUrl,
  price,
  // token,
  expired,
}) => {

  const [struct, setStruct] = useState({
    name,
    callbackUrl,
    price,
    // token,
    expired,
  })

  const [qrUrl, setQrImg] = useState('')

  const genQr = async () => {
    const qrgen = await axios.get(`${ENDPOINT}/payment`)
    setQrImg(qrgen.data.data.qrImage)
  }

  useEffect(() => {
    genQr()
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send('test')
    };
    client.onmessage = (message) => {
      console.log(message)
      if (message.data == 'confirm') {
        window.location.assign(callbackUrl)
      }
    };
  }, [])

  // if (qrUrl)
  return <Layout style={{ width: '100vw', height: '100vh', background: '#fff' }}>
    <Layout.Header style={{ width: '100vw', height: 50, background: "#a9d872", boxShadow: '1px 1px 5px 1px #fff' }}>
      <Image src='/icons/sprout.svg' alt='sprout' width={100} blurDataURL={true} height={50} />
    </Layout.Header>
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <Card style={{ background: '#f7f7f7', boxShadow: '3px 3px 15px 3px rgb(50,50,50,.5)', borderRadius: 5 }}>
        <Col span={24}>
          <Row justify='center' align='middle'>
            <Typography.Title level={3}>
              {name}
            </Typography.Title>
          </Row>
        </Col >
        <Col span={24}>
          <Row justify='center' align='middle'>
            <Image src={`data:image/jpeg;base64,${qrUrl}`} blurDataURL={true} width={200} height={200} />
          </Row>
        </Col >
        <Col span={24}>
          <Row justify='center' align='middle'>
            <Typography.Title level={4}>
              จำนวนเงิน {price} บาท
            </Typography.Title>
          </Row>
        </Col >
        <Col span={24}>
          **ใบชำระเงินนี้หมดอายุเวลา {dayjs(Date.now() + 1000 * 60 * 60).format('YYYY-MM-DD HH:mm:ss')}
        </Col>
      </Card>
    </Row>
  </Layout>
}

export async function getServerSideProps(ctx) {
  const { name, price, callbackUrl, expired } = ctx.query;

  return {
    props: {
      name,
      callbackUrl,
      price,
      expired
      // token
    }
  }
}

export default Index