import React, { useEffect } from "react";
import FormAddAssignment from "../../components/Assignments/FormAddAssignment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddAssignment = () => {
  const { isError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (<FormAddAssignment />);
};

export default AddAssignment;
