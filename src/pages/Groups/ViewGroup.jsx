import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import PageLayout from "../PageLayout";
import ListAssignments from "../../components/Assignments/ListAsignments";
import axios from "axios";

const ViewGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [group, setGroup] = useState([]);
  const { isError } = useSelector((state) => state.auth);
  const { group_id } = useParams();

  useEffect(() => {
    dispatch(getMe());
    getGroupInfo();
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const getGroupInfo = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups/${group_id}`);
    setGroup(response.data);
  };

  return (
    <PageLayout>
      <div>
        <h1 className="title">Grupo: {group.group_name}</h1>
      </div>
      <ListAssignments/>
    </PageLayout>
  );
};

export default ViewGroup;
