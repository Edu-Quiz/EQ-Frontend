import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Select, Button, Input, Skeleton } from "antd";
const { Option } = Select;

const FormEditAssignment = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [msg, setMsg] = useState();
  const [group, setGroup] = useState([]);
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    Promise.all([getProfessors(), getStudents(), getGroupById()])
      .then(() => setIsDataFetched(true))
      .catch((error) => {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      });
  }, [form]);

  const getGroupById = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups/${id}`);
    setGroup(response.data);
  };

  const getProfessors = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/professors`);
    setProfessors(response.data);
  };

  const getStudents = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
    setStudents(response.data);
  };

  const updateGroup = async (e) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/groups/${id}`, {
        group_name: e.group_name,
        professor_id: e.professor_id,
        student_ids: e.student_ids,
      });
      navigate("/groups");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  if (!isDataFetched) {
    return(
      <div>
      <h1 className="title">Grupos</h1>
      <h2 className="subtitle">Editar el Grupo: </h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <Skeleton active />
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div>
      <h1 className="title">Grupos</h1>
      <h2 className="subtitle">Editar el Grupo: {group.group_name}</h2>
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
                        <Card style={{ maxWidth: 600, }} size="small" title={`Pregunta ${field.name + 1}`} key={field.key} extra={ <CloseOutlined onClick={() => { remove(field.name); }}/>}>
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
                      <Button type="dashed" onClick={() => add()} block>
                        + Add Item
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

export default FormEditAssignment;
