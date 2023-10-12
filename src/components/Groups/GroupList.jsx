import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Space, Button } from "antd"
import { React, useState, useEffect } from "react";

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`);
    setGroups(response.data);
  };

  const deleteGroup = async (groupId) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/groups/${groupId}`);
    getGroups();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre del Grupo',
      dataIndex: 'group_name',
      key: 'group_name',
    },
    {
      title: 'Profesor Asignado',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (_, object) => (<p>
        {object.Professor ? `${object.Professor.first_name} ${object.Professor.last_name}` : 'N/A'}
      </p>),
    },
    {
      title: 'Alumnos Inscritos',
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
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="title">Grupos</h1>
      <h2 className="subtitle">Lista de Grupos</h2>
      <Link to="/groups/add" className="button is-primary mb-2">
        + Crear Grupo
      </Link>
      <Table columns={columns} dataSource={groups} />
    </div>
  );
};

export default GroupList;
