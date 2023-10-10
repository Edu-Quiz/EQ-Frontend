import axios from "axios";
import React, { useState, useEffect } from "react";
import { App, Form, Select, Button, Input } from "antd"
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select

const FormEditUser = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [msg, setMsg] = useState("");
  const { notification } = App.useApp();

  useEffect(() => {
    getUserById();
  }, [form]);

  const showNotification = (e) => {
    notification.success({
      message: `Usuario Editado Existosamente!`,
      description: `El Usuario: ${e.first_name} ${e.last_name} se ha modificado exitosamente`,
      placement: 'topRight',
    });
  };

  const getUserById = async () => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((response) => {
        const data = response.data;
        form.setFieldsValue({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          role: data.role,
        });
        setName(`${data.first_name} ${data.last_name}`)
      })
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const updateUser = async (e) => {
    console.log(e.first_name)
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
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
      <h2 className="subtitle">Actualizar Usuario: {name}</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <Form form={form} onFinish={updateUser} name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item name="first_name" label="Nombre(s)" rules={[{ required: true, message: "Porfavor, escribe un nombre para el Usuario" }]}>
                <Input placeholder="Nombre(s)"/>
              </Form.Item>
              <Form.Item name="last_name" label="Apellidos" rules={[{ required: true, message: "Porfavor, escribe los apellidos para el Usuario" }]}>
                <Input placeholder="Apellidos"/>
              </Form.Item>
              <Form.Item name="email" label="Correo" rules={[{ required: true, message: "Porfavor, escribe un correo para el Usuario" }]}>
                <Input placeholder="Correo"/>
              </Form.Item>
              <Form.Item name="password" label="Contraseña">
                <Input.Password placeholder="Contraseña"/>
              </Form.Item>
              <Form.Item name="confPassword" label="Confirmar Contraseña">
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
                  Actualizar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;
