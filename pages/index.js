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
} from "antd";
import axios from "axios";
const MEMBER_ENDPOINT = process.env.NEXT_PUBLIC_MEMBER_ENDPOINT;

export default function Home() {
  const { TextArea } = Input;
  const { Paragraph } = Typography;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentLink, setPaymentLink] = useState();
  const [requirement, setRequirement] = useState();
  const [totalRequirement, setTotalRequirement] = useState([]);
  const [aeName, setAeName] = useState();
  const [aePercent, setAepercent] = useState();
  const [aeTeam, setAeTeam] = useState({
    aeHeader: {
      name: "AE ที่รับผิดชอบ",
    },
    aeAdd: [],
  });
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
  const onChangeRequirement = (value) => {
    console.log(value.target.value);
    setRequirement(value.target.value);
  };
  const addRequirement = () => {
    setTotalRequirement([...totalRequirement, requirement]);
  };

  const onChangeAeName = (value) => {
    setAeName(value.target.value);
  };

  const onChangeAePercent = (value) => {
    setAepercent(value);
  };

  const addAe = () => {
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

  const deleteRequirement = (item) =>{
    setTotalRequirement([...totalRequirement.filter((data)=>data!==item)])
  }

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
        <Row justify="center" style={{ border: "1px solid #c4c4c4" }}>
          <Col>
            <Typography.Title level={3}>รายการที่1</Typography.Title>
            <Typography.Paragraph>ชื่อลูกค้า</Typography.Paragraph>
            <Typography.Paragraph>
              รายละเอียดแพ็คเกจที่สนใจ
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row justify="center" style={{ border: "1px solid #c4c4c4" }}>
          <Col>
            <Typography.Title level={3}>รายการที่1</Typography.Title>
            <Typography.Paragraph>ชื่อลูกค้า</Typography.Paragraph>
            <Typography.Paragraph>
              รายละเอียดแพ็คเกจที่สนใจ
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row justify="center" style={{ border: "1px solid #c4c4c4" }}>
          <Col>
            <Typography.Title level={3}>รายการที่1</Typography.Title>
            <Typography.Paragraph>ชื่อลูกค้า</Typography.Paragraph>
            <Typography.Paragraph>
              รายละเอียดแพ็คเกจที่สนใจ
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row justify="center" style={{ border: "1px solid #c4c4c4" }}>
          <Col>
            <Typography.Title level={3}>รายการที่1</Typography.Title>
            <Typography.Paragraph>ชื่อลูกค้า</Typography.Paragraph>
            <Typography.Paragraph>
              รายละเอียดแพ็คเกจที่สนใจ
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row justify="center" style={{ border: "1px solid #c4c4c4" }}>
          <Col>
            <Typography.Title level={3}>รายการที่1</Typography.Title>
            <Typography.Paragraph>ชื่อลูกค้า</Typography.Paragraph>
            <Typography.Paragraph>
              รายละเอียดแพ็คเกจที่สนใจ
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row justify="center" style={{ border: "1px solid #c4c4c4" }}>
          <Col>
            <Typography.Title level={3}>รายการที่1</Typography.Title>
            <Typography.Paragraph>ชื่อลูกค้า</Typography.Paragraph>
            <Typography.Paragraph>
              รายละเอียดแพ็คเกจที่สนใจ
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row justify="center" style={{ border: "1px solid #c4c4c4" }}>
          <Col>
            <Typography.Title level={3}>รายการที่1</Typography.Title>
            <Typography.Paragraph>ชื่อลูกค้า</Typography.Paragraph>
            <Typography.Paragraph>
              รายละเอียดแพ็คเกจที่สนใจ
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row justify="center" style={{ border: "1px solid #c4c4c4" }}>
          <Col>
            <Typography.Title level={3}>รายการที่1</Typography.Title>
            <Typography.Paragraph>ชื่อลูกค้า</Typography.Paragraph>
            <Typography.Paragraph>
              รายละเอียดแพ็คเกจที่สนใจ
            </Typography.Paragraph>
          </Col>
        </Row>
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
            <Form form={form}>
              <Form.Item label="ชื่อลูกค้า" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="ชื่อ AE" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Row>
                <Col>
                  <Form.Item label="Requirement" rules={[{ required: true }]}>
                    <Input onChange={onChangeRequirement} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button onClick={addRequirement}>เพิ่ม</Button>
                  </Form.Item>
                </Col>
              </Row>
              <Col>
                {totalRequirement.map((item, key) => (
                  <Row key={key}>
                    <Col>{key + 1}. {item}</Col>
                    <Col>
                        <Button onClick={() => deleteRequirement(item)}>ลบ</Button>
                      </Col>
                  </Row>
                ))}
              </Col>
              <Row>
                <Col>
                  <Form.Item label="ราคา" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="ราคารวม" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    label="เพิ่ม AE เข้าทีม"
                    rules={[{ required: true }]}
                  >
                    <Input onChange={onChangeAeName} />
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
                      onChange={onChangeAePercent}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button onClick={addAe}>เพิ่ม</Button>
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
                <Button onClick={sendForm}>Submit</Button>
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
