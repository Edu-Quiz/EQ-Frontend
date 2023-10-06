import React, { useEffect } from "react";
import PageLayout from "../PageLayout";
import FormAddGroup from "../../components/Groups/FormAddGroup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddGroup = () => {
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
  return (
    <PageLayout>
      <FormAddGroup />
    </PageLayout>
  );
};

export default AddGroup;
