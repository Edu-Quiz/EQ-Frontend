import axios from "axios";
import ListAssignments from "../../components/Assignments/ListAsignments";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";

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
    <>
      <div>
        <h1 className="title">Grupo: {group.group_name}</h1>
      </div>
      <ListAssignments/>
    </>
  );
};

export default ViewGroup;
