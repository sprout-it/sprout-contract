import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Modal,
  InputNumber,
  Checkbox,
} from "antd";
import axios from "axios";
const MEMBER_ENDPOINT = process.env.NEXT_PUBLIC_MEMBER_ENDPOINT;

export default function Home() {
  const { TextArea } = Input;
  const { Paragraph } = Typography;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorKey, setColorKey] = useState(0);
  const [contract, setContract] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  const [paymentLink, setPaymentLink] = useState();
  const [aeName, setAeName] = useState();
  const [aePercent, setAepercent] = useState(0);
  const [aeTeam, setAeTeam] = useState({
    aeHeader: {
      name: "",
    },
    aeAdd: [],
  });

  const handleContract = (item, key) => {
    let number = 0;
    setColorKey(key);
    setContract(item);
    item.contractData.cartItems.map((cart) => {
      number += cart.ppu;
    });
    setTotalPrice(number);
  };

  const getOrder = async () => {
    try {
      let number = 0;
      const response = await axios.get(`${MEMBER_ENDPOINT}/contract`);
      if (response.status === 200) {
        setColorKey(0);
        setOrder(response.data);
        setContract(response.data[0]);
        response.data[0].contractData.cartItems.map((cart) => {
          number += cart.ppu;
        });
        setTotalPrice(number);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendForm = async () => {
    try {
      const response = await axios.post(`${MEMBER_ENDPOINT}/contract`);
      if (response.status === 200) {
        setPaymentLink(response.data);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeAeName = (e) => {
    setAeName(e.target.value);
  };

  const onChangeAePercent = (value) => {
    setAepercent(value);
  };

  const handleAeHeader = (e) => {
    setAeTeam({
      ...aeTeam,
      aeHeader: {
        ...aeTeam.aeHeader,
        name: e,
      },
    });
  };
  const addAe = () => {
    onReset();
    const ae = {
      name: aeName,
      percent: aePercent,
    };
    setAeTeam({
      ...aeTeam,
      aeAdd: [...aeTeam.aeAdd, ae],
    });
  };

  const deleteAe = (item) => {
    setAeTeam({
      ...aeTeam,
      aeAdd: [...aeTeam.aeAdd.filter((data) => data.name !== item.name)],
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Row
      justify="center"
      style={{ marginTop: "22px", height: "100vh", paddingBottom: "52px" }}
    >
      <Col
        span={8}
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        {order.map((item, key) =>
          key === colorKey ? (
            <Row
              justify="center"
              key={key}
              style={{
                border: "1px solid #c4c4c4",
                cursor: "pointer",
                backgroundColor: "#D1D1D1",
              }}
              onClick={() => handleContract(item, key)}
            >
              <Col>
                <Typography.Title level={3}>
                  {item.contractData.customer_name}
                </Typography.Title>

                {item.contractData.cartItems.map((cart, key) => (
                  <Typography.Paragraph key={key}>
                    {cart.name}
                  </Typography.Paragraph>
                ))}
              </Col>
            </Row>
          ) : (
            <Row
              justify="center"
              key={key}
              style={{
                border: "1px solid #c4c4c4",
                cursor: "pointer",
                backgroundColor: "#F1F1F1",
              }}
              onClick={() => handleContract(item, key)}
            >
              <Col>
                <Typography.Title level={3}>
                  {item.contractData.customer_name}
                </Typography.Title>

                {item.contractData.cartItems.map((cart, key) => (
                  <Typography.Paragraph key={key}>
                    {cart.name}
                  </Typography.Paragraph>
                ))}
              </Col>
            </Row>
          )
        )}
      </Col>
      <Col
        span={16}
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Row
          justify="center"
          style={{ backgroundColor: "white", margin: "20px", height: "100%" }}
        >
          <Col span={20}>
            <Form form={form} name="contract">
              <Row justify="end">
                <Form.Item>
                  <Button
                    style={{
                      backgroundColor: "#AE1531",
                      height: "30px",
                      width: "93px",
                      borderRadius: "3px",
                      color: "white",
                      fontFamily: "Prompt",
                      fontSize: "15px",
                    }}
                  >
                    ลบ
                  </Button>
                </Form.Item>
              </Row>
              <Row justify="start">
                <Typography.Text>
                  ชื่อลูกค้า:{" "}
                  {contract
                    ? JSON.parse(
                        JSON.stringify(contract.contractData.customer_name)
                      )
                    : ""}
                </Typography.Text>
              </Row>
              <Row>
                <Paragraph style={{marginRight:12}}>ชื่อ AE: </Paragraph>
                <Paragraph editable={{ onChange: handleAeHeader }}>
                  {aeTeam.aeHeader.name}
                </Paragraph>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Typography.Text>Requirement</Typography.Text>
                  </Row>
                  {contract
                    ? contract.contractData.cartItems.map((item, key) => (
                        <>
                          <Row>
                            <Typography.Text key={key}>
                              Package: {item.name}
                            </Typography.Text>
                          </Row>
                          {item.detailsEN.map((item, key) => (
                            <Row>
                              <Typography.Text key={key}>
                                {item}
                              </Typography.Text>
                            </Row>
                          ))}
                        </>
                      ))
                    : ""}
                </Col>
              </Row>
              <Row>
                <Typography.Text>
                  ราคา:{totalPrice ? totalPrice : ""}
                </Typography.Text>
              </Row>
              <Row>
                <Typography.Text style={{ fontSize: 20, color: "#46D68C" }}>
                  Responsible persons
                </Typography.Text>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    name="aeteam"
                    label="เพิ่ม AE เข้าทีม"
                    rules={[{ required: true }]}
                  >
                    <Input onChange={(e) => onChangeAeName(e)} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="commission" rules={[{ required: true }]}>
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={(e) => onChangeAePercent(e)}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button onClick={() => addAe()}>เพิ่ม</Button>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>{aeTeam.aeHeader.name}</Row>
                  {aeTeam.aeAdd.map((item, key) => (
                    <Row key={key}>
                      <Col>{item.name}</Col>
                      <Col>{item.percent}</Col>
                      <Col>
                        <Button onClick={() => deleteAe(item)}>ลบ</Button>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
              <Row>
                <Checkbox style={{ fontSize: "16px", color: "#414141" }}>
                  I agree with this contract details{" "}
                </Checkbox>
              </Row>
              <Row justify="center">
                <Button
                  onClick={sendForm}
                  style={{
                    backgroundColor: "#1BB61D",
                    borderRadius: "5px",
                    color: "white",
                    height: "60px",
                    width: "130px",
                    fontFamily: "Prompt",
                    fontSize: "25px",
                  }}
                >
                  Submit
                </Button>
              </Row>
            </Form>
            <Modal
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              centered
            >
              <Paragraph
                style={{ fontSize: 22 }}
                copyable={{ tooltips: false }}
              >
                https://payment-k6re3l4ruq-as.a.run.app/{paymentLink}
              </Paragraph>
            </Modal>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
