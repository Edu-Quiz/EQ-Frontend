import axios from "axios";
import GroupCards from "./Groups/GroupCards";
import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
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
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Bienvenido <strong>{user && [user.first_name, " ", user.last_name]}</strong>
      </h2>
      <GroupCards/>
    </div>
  );
};

export default Welcome;