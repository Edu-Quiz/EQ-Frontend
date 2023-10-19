import axios from "axios";
import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Form, Button, Input, Card, Col, Row, Select } from "antd"

const FormAddAssignment = () => {
  const navigate = useNavigate();
  const { group_id } = useParams();
  const [msg, setMsg] = useState("");
  const { notification } = App.useApp();

  const showNotification = (e) => {
    notification.success({
      message: `Tarea Actualizada Existosamente!`,
      description: `La Tarea: ${e.assignment_name} se ha editado exitosamente`,
      placement: 'topRight',
    });
  };

  const createGroup = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/assignments`, {
        title: e.assignment_name,
        category: e.category,
        group_uuid: group_id,
        questions: e.questions,
      });
      showNotification(e)
      navigate(`/group/${group_id}`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Tareas</h1>
      <h2 className="subtitle">Crear una Tarea</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <Form onFinish={createGroup} name="dynamic_form_complex" layout="vertical" autoComplete="off">
              <Form.Item name="assignment_name" label="Nombre de la Tarea" rules={[{ required: true, message: "Porfavor, escribe un nombre para la tarea" }]}>
                <Input placeholder="Nombre de la Tarea"/>
              </Form.Item>
              <Form.Item name="category" label="Categoria" rules={[{ required: true, message: "Porfavor, escribe una categoria para la Tarea" }]}>
                <Input placeholder="Categoria"/>
              </Form.Item>
              <Form.Item label="Preguntas" rules={[{ required: true, message: "Porfavor, escribe una categoria para la Tarea" }]}>
                <Form.List name="questions">
                  {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: "column", }}>
                      {fields.map((field) => ( 
                        <Card style={{ maxWidth: 600, marginBottom: "15px" }} headStyle={{backgroundColor: 'rgba(26, 112, 232)', color: "white"}} size="small" title={`Pregunta ${field.name + 1}`} key={field.key} extra={ <CloseOutlined style={{color: "white"}} onClick={() => { remove(field.name); }}/>}>
                          <Form.Item name={[field.name, `question_${field.name + 1}`]}>
                            <Input />
                          </Form.Item>
                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item label="Respuesta 1" name={[field.name, `answer1_${field.name + 1}`]}>
                                <Input />
                              </Form.Item></Col>
                            <Col span={12}>
                              <Form.Item label="Respuesta 2" name={[field.name, `answer2_${field.name + 1}`]}>
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item label="Respuesta 3" name={[field.name, `answer3_${field.name + 1}`]}>
                                <Input />
                              </Form.Item>
                              </Col>
                            <Col span={12}>
                              <Form.Item label="Respuesta 4" name={[field.name, `answer4_${field.name + 1}`]}>
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item label="Respuesta Correcta" name={[field.name, `correctAnswer_${field.name + 1}`]}>
                            <Select>
                              <Select.Option value={1}></Select.Option>
                              <Select.Option value={2}></Select.Option>
                              <Select.Option value={3}></Select.Option>
                              <Select.Option value={4}></Select.Option>
                            </Select>
                          </Form.Item>
                        </Card>
                      ))}
                      <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                        Agregar Pregunta
                      </Button>
                    </div>
                  )}
                </Form.List>
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

export default FormAddAssignment;
