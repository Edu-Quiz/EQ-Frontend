import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { App, Table, Space, Button, Popconfirm, Skeleton } from "antd";

const UserList = () => {
  const { notification } = App.useApp();
  const [users, setUsers] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getUsers();
  }, []);

  const showNotification = (e) => {
    notification.success({
      message: `Usuario Eliminado Existosamente!`,
      description: `El Usuario: ${e.first_name} ${e.last_name} se ha eliminado exitosamente`,
      placement: 'topRight',
    });
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre Completo',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (_, object) => <p>{object.first_name} {object.last_name}</p>,
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, object) => (
        <Space size="small">
          <Link to={`/users/edit/${object.uuid}`}>
            <Button type="primary">Editar</Button>
          </Link>
          <Popconfirm
            title="Eliminar Usuario"
            description="¿Estas seguro de eliminar este usuario?"
            onConfirm={() => handleOk(object)}
            okButtonProps={{ loading: confirmLoading }}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            okText="Eliminar"
            cancelText="Cancelar"
          >
            <Button type="primary" danger>Eliminar</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleOk = async (e) => {
    setConfirmLoading(true);

    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${e.uuid}`);
    getUsers();

    setConfirmLoading(false);
    showNotification(e);
  };

  return (
    <div>
      <h1 className="title">Usuarios</h1>
      <h2 className="subtitle">Lista de Usuarios</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        + Crear Usuario
      </Link>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table columns={columns} dataSource={users} />
      )}
    </div>
  );
};

export default UserList;
