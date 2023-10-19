import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Skeleton } from "antd";

const ListScores = () => {
  const { group_id, assignment_id } = useParams();
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAssignment()
  }, []);

  const getAssignment = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assignments/getScores/${assignment_id}`);
      console.log(response.data)
      setScores(response.data.scores)
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'student_id',
      key: 'student_id',
    },
    {
      title: 'Nombre del Alumno',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (_, object) => (
        <p type="primary">{object.student_details.first_name} {object.student_details.last_name}</p>
      )
    },
    {
      title: 'Calificacion',
      key: 'score',
      dataIndex: 'score',
    },
  ];

  return (
    <div>
      <h2 className="subtitle">Calificaciones</h2>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <>
          <Link to={`/group/${group_id}`} className="button is-primary mb-2">
            Regresar
          </Link>
          <Table columns={columns} dataSource={scores} />
        </>
      )}
    </div>
  );
};

export default ListScores;
