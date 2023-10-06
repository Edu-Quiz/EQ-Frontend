import GroupCards from "./Groups/GroupCards";
import { React } from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

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