import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App, Form, Select, Button, Input } from "antd"
const { Option } = Select

const FormAddUser = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { notification } = App.useApp();

  const showNotification = (e) => {
    notification.success({
      message: `Usuario Creado Existosamente!`,
      description: `El Usuario: ${e.first_name} ${e.last_name} se ha creado exitosamente`,
      placement: 'topRight',
    });
  };

  const createUser = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
        first_name: e.first_name,
        last_name: e.last_name,
        email: e.email,
        password: e.password,
        confPassword: e.confPassword,
        role: e.role,
      });
      showNotification(e);
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Usuarios</h1>
      <h2 className="subtitle">Crear un Usuario</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <Form onFinish={createUser} name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item name="first_name" label="Nombre(s)" rules={[{ required: true, message: "Porfavor, escribe un nombre para el Usuario" }]}>
                <Input placeholder="Nombre(s)"/>
              </Form.Item>
              <Form.Item name="last_name" label="Apellidos" rules={[{ required: true, message: "Porfavor, escribe los apellidos para el Usuario" }]}>
                <Input placeholder="Apellidos"/>
              </Form.Item>
              <Form.Item name="email" label="Correo" rules={[{ required: true, message: "Porfavor, escribe un correo para el Usuario" }]}>
                <Input placeholder="Correo"/>
              </Form.Item>
              <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: "Porfavor, escribe una contraseña para el Usuario" }]}>
                <Input.Password placeholder="Contraseña"/>
              </Form.Item>
              <Form.Item name="confPassword" label="Confirmar Contraseña" rules={[{ required: true, message: "Porfavor, confirma la contraseña para el Usuario" }]}>
                <Input.Password placeholder="Confirmar Contraseña"/>
              </Form.Item>
              <Form.Item name="role" label="Tipo de Usuario" rules={[{ required: true, message: "Porfavor, selecciona el tipo de Usuario" }]}>
                <Select placeholder="Selecciona el tipo de Usuario">
                  <Option key="Administrador" value="admin">Administrador</Option>
                  <Option key="Profesor" value="Profesor">Profesor</Option>
                  <Option key="Alumno" value="Alumno">Alumno</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Crear
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;