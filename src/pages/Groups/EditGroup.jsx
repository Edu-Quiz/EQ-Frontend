import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import FormEditGroup from "../../components/Groups/FormEditGroup";

const EditGroup = () => {
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
  return (<FormEditGroup />);
};

export default EditGroup;
