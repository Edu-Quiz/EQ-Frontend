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
    console.log(response.data)
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
      {/* <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Grupo</th>
            <th>Maestro Asignado</th>
            <th>Alumnos Inscritos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={group.uuid}>
              <td>{index + 1}</td>
              <td>{group.group_name}</td>
              <td>{group.Professor.first_name} {group.Professor.last_name}</td>
              <td>0</td>
              <td>
                <Link
                  to={`/groups/edit/${group.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(group.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default GroupList;
