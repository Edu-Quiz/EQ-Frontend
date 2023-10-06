import axios from "axios";
import { React, useState, useEffect } from "react";
import { Card, Col, Row } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;

const GroupCards = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`);
    console.log(response.data)
    setGroups(response.data);
  };

  return (
    <Row gutter={16}>
    {groups.map((group) => (
      <Col span={5}>
        <Link to={`/group/${group.uuid}`}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            }
          >
            <Meta
              title={group.group_name}
            />
          </Card>
        </Link>
      </Col>
    ))}
    </Row>
  );
};

export default GroupCards;