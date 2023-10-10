import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Userlist from "../../components/Users/Userlist";
import Game from "../../components/Game/Game";

const RenderGame = () => {
  return (<Game/>);
};

export default RenderGame;
