import axios from "axios";
import { React, useState, useEffect } from "react";
import { Card, Space } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;

const GroupCards = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`);
    setGroups(response.data);
  };

  return (
    <Space size={"middle"}>
    {groups.map((group) => (
        <Link to={`/group/${group.uuid}`}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          >
            <Meta
              title={group.group_name}
            />
          </Card>
        </Link>
    ))}
    </Space>
  );
};

export default GroupCards;