import axios from "axios";
import { Link } from "react-router-dom";
import { App, Table, Space, Button, Popconfirm, Skeleton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const GroupList = () => {
  const { notification } = App.useApp();
  const [groups, setGroups] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGroups();
  }, []);

  const showNotification = (e) => {
    notification.success({
      message: `Grupo Eliminado Existosamente!`,
      description: `El Grupo: ${e.group_name} se ha eliminado exitosamente`,
      placement: "topRight",
    });
  };

  const getGroups = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`);
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOk = async (e) => {
    setConfirmLoading(true);

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/groups/${e.uuid}`);
      getGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
    } finally {
      setConfirmLoading(false);
      showNotification(e);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre del Grupo",
      dataIndex: "group_name",
      key: "group_name",
    },
    {
      title: "Profesor Asignado",
      dataIndex: "uuid",
      key: "uuid",
      render: (_, object) => (
        <p>{object.Professor ? `${object.Professor.first_name} ${object.Professor.last_name}` : "N/A"}</p>
      ),
    },
    {
      title: "Alumnos Inscritos",
      key: "studentCount",
      dataIndex: "studentCount",
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, object) => (
        <Space size="small">
          <Link to={`/groups/edit/${object.uuid}`}>
            <Button type="primary">Editar</Button>
          </Link>
          <Popconfirm
            title="Eliminar Grupo"
            description="¿Estás seguro de eliminar este grupo?"
            onConfirm={() => handleOk(object)}
            okButtonProps={{ loading: confirmLoading }}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            okText="Eliminar"
            cancelText="Cancelar"
          >
            <Button type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
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
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table columns={columns} dataSource={groups} />
      )}
    </div>
  );
};

export default GroupList;
