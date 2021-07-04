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
  const [qrcodeModalVisible, setQrcodeModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [colorKey, setColorKey] = useState(0);
  const [contract, setContract] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  const [qrCodeData, setQrcodeData] = useState();
  const [requirement, setRequirement] = useState();
  const [aeName, setAeName] = useState();
  const [aePercent, setAepercent] = useState(0);

  const handleContract = async (item, key) => {
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
        const quotation = item.contractData.quotation
        const qrcode = await axios.post(`${MEMBER_ENDPOINT}/payment`, { price: totalPrice, quotation: quotation });
        console.log(qrcode)
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
      if (response.status === 200) {
        setColorKey(0);
        setOrder(response.data);
        setContract(response.data[0]);
        response.data[0].contractData.cartItems.map((cart) => {
          number += cart.ppu;
        });
        setTotalPrice(number);
        const quotation = response.data[0].contractData.quotation
        switch (response.data[0].contractData.status) {
          case "offering":
            setCurrent(1);
            break;
          case "accepted":
            setCurrent(2);
            const qrcode = await axios.post(`${MEMBER_ENDPOINT}/payment`, { price: totalPrice, quotation: quotation });
            console.log(qrcode)
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
      const response = await axios.post(`${MEMBER_ENDPOINT}/contract`, { contract, totalPrice });
      if (response.status === 200) {
        const name = response.data.name
        const price = response.data.price
        const quotation = response.data.quotation
        const qrcode = await axios.post(`${MEMBER_ENDPOINT}/payment`, { price, quotation });
        console.log(qrcode)
        // setPaymentLink(response.data);

        setQrcodeModalVisible(true)

        // setIsModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setQrcodeModalVisible(false);
    setPaymentModalVisible(false)
  };

  const handleCancel = () => {
    setQrcodeModalVisible(false);
    setPaymentModalVisible(false)
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
                        >
                          <Input onChange={(e) => onChangeAeName(e)} />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          label="commission"
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
                            <Row key={key} gutter={5}>
                              <Col>AE Name: {item.name}</Col>
                              <Col>Commission: {item.percent}</Col>
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
                    visible={qrcodeModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    centered
                  >

                  </Modal>
                  <Modal
                    visible={paymentModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    centered
                  >

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
            <Row>
              <Col span={24}>นาย A</Col>
              <Col span={24}><img src={`data:image/jpeg;base64,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`} blurDataURL={true} width={200} height={200} /></Col>
              <Col span={24}>จำนวนเงิน 12000 บ.</Col>
            </Row>
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
