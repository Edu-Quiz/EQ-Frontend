import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { App, Table, Space, Button, Tag, Popconfirm, Skeleton } from "antd";

const ListAssignments = () => {
  const { group_id } = useParams();
  const { notification } = App.useApp();
  const [groups, setGroups] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAssignments();
  }, []);

  const showNotification = (e) => {
    notification.success({
      message: `Tarea Eliminado Existosamente!`,
      description: `La Tarea: ${e.title} se ha eliminado exitosamente`,
      placement: 'topRight',
    });
  };

  const getAssignments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assignments?group_id=${group_id}`);
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOk = async (e) => {
    setIsLoading(true);

    await axios.delete(`${process.env.REACT_APP_API_URL}/assignments/${e.uuid}`);
    getAssignments();

    setIsLoading(false);
    showNotification(e);
  };

  const columns_nonStudent = [
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
      render: (_, object) => (
        <Link to={`/group/${group_id}/assignment/scores/${object.uuid}`}>
            <Button type="primary">{object.studentCount}</Button>
        </Link>
      )
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, object) => (
        <Space size="small">
          <Link to={`/group/${group_id}/assignment/edit/${object.uuid}`}>
            <Button type="primary">Editar</Button>
          </Link>
          <Popconfirm
            title="Eliminar Tarea"
            description="¿Estas seguro de eliminar esta tarea?"
            onConfirm={() => handleOk(object)}
            okButtonProps={{ loading: isLoading }}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            okText="Eliminar"
            cancelText="Cancelar"
          >
            <Button type="primary" danger>Eliminar</Button>
          </Popconfirm>
          <Link to={`/group/${group_id}/game/${object.uuid}`}>
            <Button type="primary">Probar</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const columns_student = [
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
      title: 'Estatus',
      key: 'status',
      dataIndex: 'status',
      render: (_, object) => (
        <><Tag color={object.status_color}>{object.status}</Tag></>
      )
    },
    {
      title: 'Calificación',
      key: 'score',
      dataIndex: 'score',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, object) => (
        <Space size="small">
          <Link to={`/group/${group_id}/game/${object.uuid}`}>
            <Button type="primary" disabled={object.status === "Completado"}>Jugar</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="subtitle">Lista de Tareas</h2>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <>
          {user && user.role !== "Alumno" && (
            <>
              <Link to="./assignment/add" className="button is-primary mb-2">
                + Crear Tarea
              </Link>
              <Table columns={columns_nonStudent} dataSource={groups} />
            </>
          )}
          {user && user.role === "Alumno" && <Table columns={columns_student} dataSource={groups} />}
        </>
      )}
    </div>
  );
};

export default ListAssignments;
