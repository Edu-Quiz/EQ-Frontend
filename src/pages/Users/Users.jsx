import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Userlist from "../../components/Users/Userlist";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  
  return (<Userlist />);
};

export default Users;
