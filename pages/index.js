import React, { useState, useEffect, useRef } from "react";
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
  Card,
  Layout,
  Divider
} from "antd";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
const MEMBER_ENDPOINT = process.env.NEXT_PUBLIC_MEMBER_ENDPOINT;
const { Sider, Content, Header } = Layout
const { TabPane } = Tabs;
const { Step } = Steps;
// const ColPrint = (Col)`

// `

export default function Home() {
  const { Paragraph } = Typography;
  const [form] = Form.useForm();
  const [qrcodeModalVisible, setQrcodeModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [colorKey, setColorKey] = useState(0);
  const [contract, setContract] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  const [requirement, setRequirement] = useState();
  const [aeName, setAeName] = useState();
  const [aePercent, setAepercent] = useState(0);
  const printRef = useRef()

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
      const response = await axios.post(`${MEMBER_ENDPOINT}/contract`, { contract, totalPrice });
      if (response.status === 200) {
        const name = response.data.name
        const price = response.data.price
        const quotation = response.data.quotation
        const qrcode = await axios.post(`${MEMBER_ENDPOINT}/payment`, { price, quotation, docId: contract.docId });
        // setPaymentLink(response.data);
        if (qrcode.status === 200) {
          getOrder();
        }
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

  const handlePrint = useReactToPrint({
    //   pageStyle: `
    //   @page {
    //     size: 80mm 50mm;
    //   }

    //   @media all {
    //     .pagebreak {
    //       display: none;
    //     }
    //   }

    //   @media print {
    //     .pagebreak {
    //       page-break-before: always;
    //     }
    //   }
    // `,
    content: () => printRef.current,
  });

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', position: 'relative' }}>
      <Sider style={{ minHeight: '100vh', background: '#c4c4c4' }}>
        <Row style={{ position: 'sticky', width: '100%' }}>
          {order.map((item, key) =>
            key === colorKey ? (
              <Col span={24}>
                <Card
                  justify="center"
                  key={key}
                  hoverable
                  style={{ background: '#DDDDDD', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
                  onClick={() => handleContract(item, key)}
                >
                  <Col>
                    <Typography.Title level={4}>
                      {item.contractData.customer_name}
                    </Typography.Title>

                    {item.contractData.cartItems.map((cart, key) => (
                      <Typography.Paragraph key={key}>
                        {cart.name}
                      </Typography.Paragraph>
                    ))}
                  </Col>
                </Card>
              </Col>
            ) : (
              <Col span={24}>
                <Card
                  justify="center"
                  key={key}
                  hoverable
                  style={{ background: '#f7f7f7', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
                  onClick={() => handleContract(item, key)}
                >
                  <Col>
                    <Typography.Title level={4}>
                      {item.contractData.customer_name}
                    </Typography.Title>

                    {item.contractData.cartItems.map((cart, key) => (
                      <Typography.Paragraph key={key}>
                        {cart.name}
                      </Typography.Paragraph>
                    ))}
                  </Col>
                </Card>
              </Col>
            )
          )}
        </Row>
      </Sider>

      <Content style={{ padding: 10 }}>
        <Row justify="center">
          <Steps style={{ width: "80%" }} current={current}>
            <Step title="Offering" />
            <Step title="Accepted" />
            <Step title="Done" />
          </Steps>
        </Row>
        <button onClick={handlePrint}>Print this out!</button>
        <Row
          justify="start"
          style={{ margin: "20px", width: "100%" }}
        >
          {contract && contract.contractData.status === "offering" ? (
            <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
              <TabPane tab={<Typography.Title level={2}>Contract</Typography.Title>} key="1">

                <Col span={24} style={{ padding: 25 }}>
                  <Form form={form} name="contract">
                    <Row justify="end">
                      <Form.Item>
                        <Button
                          style={{
                            backgroundColor: "#AE1531",
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

                    <Col span={24} ref={printRef}>
                      <Row justify='center'>
                        <Col span={24}>
                          {contract
                            ? contract.contractData.cartItems.map(
                              (item1, key1) => <Row>

                                <Col span={12}>

                                  <Col span={24}>
                                    <img src="/images/sprout-logo.png" width={300} alt="sprout logo" />
                                  </Col>

                                  <Col span={24}>
                                    <Row justify="center">
                                      <Typography.Text>
                                        ชื่อลูกค้า:{" "}
                                        {
                                          contract && contract.contractData.customer_name
                                        }
                                      </Typography.Text>
                                    </Row>
                                  </Col>

                                  <Row justify='center'>
                                    <Col span={24}>
                                      <Paragraph style={{ marginRight: 12 }}>
                                        ชื่อ AE : {" "}
                                      </Paragraph>
                                      <Paragraph editable={{ onChange: handleAeLeader }}>
                                        {contract ? contract.contractData.ae_id : ""}
                                      </Paragraph>
                                    </Col>
                                  </Row>

                                </Col>

                                <Col span={12}>
                                  <Row justify='end' style={{ textAlign: 'end' }}>
                                    <Typography.Title level={4}>บริษัท ไอเอ็มทีกรุ๊บ จำกัด</Typography.Title>
                                    <Typography.Text>1106 อาคารสเปซ ซัมเมอร์ ฮิลล์ ชั้น 3 ห้อง TT13 ถ.สุขุมวิท แขวงพระโขนง เขตคลองเตย กรุงเทพมหานคร</Typography.Text>
                                    <Typography.Text>เลขที่ผู้เสียภาษี 0-1055-57155-14-6 | (สำนักงานใหญ่)</Typography.Text>
                                  </Row>
                                </Col>

                                <Col span={24}>
                                  <Divider style={{ width: '100%', background: '#000' }} />
                                </Col>

                                <Col span={24}>

                                  <table key={key1} style={{ width: '100%' }}>

                                    <tr key={key1} style={{ border: '2px solid #1BB61D' }}>
                                      <th>Package: {item1.name}</th>
                                      <th>หน่วย</th>
                                      <th>ราคา</th>
                                    </tr>

                                    <tr>
                                      <td>
                                        {
                                          item1.detailsEN.map((item2, key2) => (
                                            <p key={key2}>{item2}</p>
                                          ))
                                        }
                                      </td>
                                      <th>{item1.qty}</th>
                                      <th>{item1.ppu}</th>
                                    </tr>

                                    {
                                      key1 == contract.contractData.cartItems.length - 1 &&
                                      <tr>
                                        <td>รวม</td>
                                        <td>{contract.contractData.cartItems.length}</td>
                                        <td>{totalPrice ? totalPrice : ""}</td>
                                      </tr>
                                    }

                                  </table>
                                </Col>
                              </Row>
                            )
                            : ""}
                        </Col>
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
                    </Col>

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
                          fontFamily: "Prompt",
                          fontSize: "25px",
                        }}
                      >
                        สรุปและออกใบเสนอราคา
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
              <TabPane tab={<Typography.Title level={2}>Add More Requirement</Typography.Title>} key="2">
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
            <Row justify='center' style={{ width: '100%' }}>
              <Col span={24}>
                <Typography.Title>ชำระเงิน</Typography.Title>
              </Col>
              <Col span={24}>
                <Card>
                  <Row justify='center' align='middle'>
                    <Col span={12} style={{ height: '100%' }}>
                      <Row justify='center'>
                        <Col span={24}>
                          <Row justify='start'>
                            <Form.Item label='ชื่อ' labelCol={{ span: 24 }}>
                              <Card style={{ textAlign: 'center' }}>
                                {contract.contractData.customer_name}
                              </Card>
                            </Form.Item>
                          </Row>
                        </Col>
                        <Col span={24}>
                          <Row justify='start'>
                            <Form.Item label='ยอดรวม' labelCol={{ span: 24 }}>
                              <Card style={{ textAlign: 'center' }}>
                                {totalPrice}
                              </Card>
                            </Form.Item>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          ) : contract && contract.contractData.status === "done" ? (
            "สำเร็จ"
          ) : (
            ""
          )}
        </Row>
      </Content>
    </Layout >
  );
}
