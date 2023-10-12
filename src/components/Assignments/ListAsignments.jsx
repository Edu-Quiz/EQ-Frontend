import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Table, Space, Button } from "antd"
import { React, useState, useEffect } from "react";

const ListAssignments = () => {
  const { group_id } = useParams();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getAssignment();
  }, []);

  const getAssignment = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/assignments?group_id=${group_id}`);
    setGroups(response.data);
  };

  const deleteGroup = async (groupId) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/groups/${groupId}`);
    getAssignment();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre de la Tarea',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Alumnos Completados',
      key: 'studentCount',
      dataIndex: 'studentCount',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, object) => (
        <Space size="small">
          <Link to={`/groups/edit/${object.uuid}`}>
            <Button type="primary">Editar</Button>
          </Link>
          <Button type="primary" danger onClick={() => deleteGroup(object.uuid)}>Eliminar</Button>
          <Link to={`/game/${object.uuid}`}>
            <Button type="primary">Test</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="subtitle">Lista de Tareas</h2>
      <Link to="./assignment/add" className="button is-primary mb-2">
        + Crear Tarea
      </Link>
      <Table columns={columns} dataSource={groups} />
    </div>
  );
};

export default ListAssignments;
