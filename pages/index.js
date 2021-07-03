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
  Tabs,
  Steps,
} from "antd";
import axios from "axios";
const MEMBER_ENDPOINT = process.env.NEXT_PUBLIC_MEMBER_ENDPOINT;

export default function Home() {
  const { TabPane } = Tabs;
  const { Step } = Steps;
  const { Paragraph } = Typography;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [colorKey, setColorKey] = useState(0);
  const [contract, setContract] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  const [paymentLink, setPaymentLink] = useState();
  const [requirement, setRequirement] = useState();
  const [aeName, setAeName] = useState();
  const [aePercent, setAepercent] = useState(0);

  const handleContract = (item, key) => {
    let number = 0;
    setColorKey(key);
    setContract(item);
    item.contractData.cartItems.map((cart) => {
      number += cart.ppu;
    });
    setTotalPrice(number);
    switch (item.contractData.status) {
      case "offering":
        setCurrent(1);
        break;
      case "accepted":
        setCurrent(2);
        break;
      case "done":
        setCurrent(3);
        break;
      default:
        setCurrent(0);
    }
  };

  const getOrder = async () => {
    try {
      let number = 0;
      const response = await axios.get(`${MEMBER_ENDPOINT}/contract`);
      console.log(response.data)
      if (response.status === 200) {
        setColorKey(0);
        setOrder(response.data);
        setContract(response.data[0]);
        response.data[0].contractData.cartItems.map((cart) => {
          number += cart.ppu;
        });
        setTotalPrice(number);
        switch (response.data[0].contractData.status) {
          case "offering":
            setCurrent(1);
            break;
          case "accepted":
            setCurrent(2);
            break;
          case "done":
            setCurrent(3);
            break;
          default:
            setCurrent(0);
        }
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

  const handleAeLeader = (e) => {
    setContract({
      ...contract,
      contractData: {
        ...contract.contractData,
        ae_id: e,
      },
    });
  };
  const addAe = () => {
    onReset();
    const ae = {
      name: aeName,
      percent: aePercent,
    };
    setContract({
      ...contract,
      contractData: {
        ...contract.contractData,
        ae_team: [...contract.contractData.ae_team, ae],
      },
    });
  };

  const deleteAe = (item) => {
    setContract({
      ...contract,
      contractData: {
        ...contract.contractData,
        ae_team: [
          ...contract.contractData.ae_team.filter(
            (data) => data.name !== item.name
          ),
        ],
      },
    });
  };

  const onChangeRequirement = (value) => {
    setRequirement(value.target.value);
  };

  const addRequirement = () => {
    onReset();
    setContract({
      ...contract,
      contractData: {
        ...contract.contractData,
        requirement: [...contract.contractData.requirement, requirement],
      },
    });
  };

  const deleteRequirement = (item) => {
    setContract({
      ...contract,
      contractData: {
        ...contract.contractData,
        requirement: [
          ...contract.contractData.requirement.filter((data) => data !== item),
        ],
      },
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
          backgroundColor: "white",
        }}
      >
        <Row justify="center">
          <Steps style={{ width: "80%" }} current={current}>
            <Step title="Offering" />
            <Step title="Accepted" />
            <Step title="Done" />
          </Steps>
        </Row>
        <Row
          justify="start"
          style={{ margin: "20px", height: "100%", width: "100%" }}
        >
          {contract && contract.contractData.status === "offering" ? (
            <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
              <TabPane tab="contract" key="1">
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
                            JSON.stringify(
                              contract.contractData.customer_name
                            )
                          )
                          : ""}
                      </Typography.Text>
                    </Row>
                    <Row>
                      <Paragraph style={{ marginRight: 12 }}>
                        ชื่อ AE:{" "}
                      </Paragraph>
                      <Paragraph editable={{ onChange: handleAeLeader }}>
                        {contract ? contract.contractData.ae_id : ""}
                      </Paragraph>
                    </Row>
                    <Row>
                      <Col>
                        <table>
                          {contract
                            ? contract.contractData.cartItems.map(
                              (item, key) => (
                                <>
                                  <tr>
                                    <th key={key}>Package: {item.name}</th>
                                  </tr>
                                  {item.detailsEN.map((item, key) => (
                                    <tr>
                                      <td key={key}>{item}</td>
                                    </tr>
                                  ))}
                                </>
                              )
                            )
                            : ""}
                        </table>
                      </Col>
                    </Row>
                    <Row>
                      <Typography.Text>
                        ราคา:{totalPrice ? totalPrice : ""}
                      </Typography.Text>
                    </Row>
                    <Row>
                      <Typography.Text
                        style={{ fontSize: 20, color: "#46D68C" }}
                      >
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
                        <Form.Item
                          label="commission"
                          rules={[{ required: true }]}
                        >
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
                        {contract
                          ? contract.contractData.ae_team.map((item, key) => (
                            <Row key={key}>
                              <Col>{item.name}</Col>
                              <Col>{item.percent}</Col>
                              <Col>
                                <Button onClick={() => deleteAe(item)}>
                                  ลบ
                                </Button>
                              </Col>
                            </Row>
                          ))
                          : ""}
                      </Col>
                    </Row>
                    <Row>
                      <Checkbox style={{ fontSize: "16px", color: "#414141" }}>
                        I agree with this contract details{" "}
                      </Checkbox>
                    </Row>
                    <Row justify="center" style={{ paddingBottom: "52px" }}>
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
              </TabPane>
              <TabPane tab="requirement" key="2">
                <Col span={20}>
                  <Form form={form} name="contract">
                    <Row justify="start">
                      <Col span={24}>
                        <Row>
                          <Col>
                            <Form.Item
                              name="requirement"
                              label="Add Requirement"
                              rules={[{ required: true }]}
                            >
                              <Input onChange={onChangeRequirement} />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item>
                              <Button onClick={addRequirement}>เพิ่ม</Button>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          {contract &&
                            contract.contractData.requirement.length > 0 ? (
                            <Typography.Text>Requirement</Typography.Text>
                          ) : (
                            ""
                          )}
                        </Row>
                        {contract
                          ? contract.contractData.requirement.map(
                            (item, key) => (
                              <Row key={key}>
                                <Col>
                                  {key + 1}. {item}
                                </Col>
                                <Col>
                                  <Button
                                    onClick={() => deleteRequirement(item)}
                                  >
                                    ลบ
                                  </Button>
                                </Col>
                              </Row>
                            )
                          )
                          : ""}
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </TabPane>
            </Tabs>
          ) : contract && contract.contractData.status === "accepted" ? (
            "หน้า qr"
          ) : contract && contract.contractData.status === "done" ? (
            "สำเร็จ"
          ) : (
            ""
          )}
        </Row>
      </Col>
    </Row>
  );
}
