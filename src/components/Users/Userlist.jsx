import axios from "axios";
import { Link } from "react-router-dom";
import { React,useState, useEffect } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { App, Table, Space, Button, Popconfirm } from "antd";

const Userlist = () => {
  const { notification } = App.useApp();
  const [users, setUsers] = useState([]);
  const [openStates, setOpenStates] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
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
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    setUsers(response.data);
    setOpenStates(new Array(response.data.length).fill(false));
  };

  const showPopconfirm = (index) => {
    setOpenStates((prevOpenStates) => {
      const newState = [...prevOpenStates];
      newState[index] = true;
      return newState;
    });
  };

  const handleOk = async (index, e) => {
    setConfirmLoading(true);

    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${users[index].uuid}`);
    getUsers();

    setOpenStates((prevOpenStates) => {
      const newState = [...prevOpenStates];
      newState[index] = false;
      return newState;
    });

    setConfirmLoading(false);
    showNotification(e)
  };

  const handleCancel = (index) => {
    setOpenStates((prevOpenStates) => {
      const newState = [...prevOpenStates];
      newState[index] = false;
      return newState;
    });
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
      render: (_, object, index) => (
        <Space size="small">
          <Link to={`/users/edit/${object.uuid}`}>
            <Button type="primary">Editar</Button>
          </Link>
          <Popconfirm
            title="Eliminar Usuario"
            description="¿Estas seguro de eliminar este usuario?"
            open={openStates[index]}
            onConfirm={() => handleOk(index, object)}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={() => handleCancel(index)}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            okText="Eliminar"
            cancelText="Cancelar"
          >
            <Button type="primary" danger onClick={() => showPopconfirm(index)}>Eliminar</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="title">Usuarios</h1>
      <h2 className="subtitle">Lista de Usuarios</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        + Crear Usuario
      </Link>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default Userlist;
