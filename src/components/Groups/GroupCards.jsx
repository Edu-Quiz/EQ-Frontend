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
    console.log(response.data)
    console.log(new TextDecoder().decode(new Uint8Array(response.data[0].image.data)))
    setGroups(response.data);
  };

  return (
    <Space size={"middle"}>
    {groups.map((group) => (
        <Link to={`/group/${group.uuid}`}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt="example" src={new TextDecoder().decode(new Uint8Array(group.image.data))} />}
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