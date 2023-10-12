import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Select, Button, Input, Skeleton } from "antd";
const { Option } = Select;

const FormEditGroup = () => {
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
            <Form form={form} onFinish={updateGroup} name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item initialValue={group.group_name} name="group_name" label="Nombre del Grupo" rules={[{ required: true, message: "Por favor, escribe un nombre para el grupo" }]}>
                <Input placeholder="Nombre del Grupo" />
              </Form.Item>
              <Form.Item initialValue={group.Professor.id} name="professor_id" label="Profesor" rules={[{ required: true, message: "Por favor, selecciona un profesor para el grupo" }]}>
                <Select showSearch placeholder="Selecciona a un Profesor" optionFilterProp="children">
                  {professors.map((professor) => <Option key={professor.id} value={professor.id}>{professor.first_name} {professor.last_name}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item initialValue={group.Students.map((student) => student.id)} name="student_ids" label="Estudiantes">
                <Select mode="multiple" placeholder="Selecciona a los alumnos a ingresar">
                  {students.map((student) => <Select.Option key={student.id} value={student.id}>{student.first_name} {student.last_name}</Select.Option>)}
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

export default FormEditGroup;
