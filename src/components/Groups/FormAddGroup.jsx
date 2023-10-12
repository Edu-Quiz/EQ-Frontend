import axios from "axios";
import { Form, Select, Button, Input } from "antd"
import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
const { Option } = Select

const FormAddGroup = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getProfessors();
    getStudents();
  }, []);

  const getProfessors = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/professors`);
    setProfessors(response.data);
  };

  const getStudents = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
    setStudents(response.data);
  };

  const createGroup = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/groups`, {
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

  return (
    <div>
      <h1 className="title">Grupos</h1>
      <h2 className="subtitle">Crear un Grupo</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <Form onFinish={createGroup} name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item name="group_name" label="Nombre del Grupo" rules={[{ required: true, message: "Porfavor, escribe un nombre para el grupo" }]}>
                <Input placeholder="Nombre del Grupo"/>
              </Form.Item>
              <Form.Item name="professor_id" label="Profesor" rules={[{ required: true, message: "Porfavor, selecciona un profesor para el grupo" }]}>
                <Select showSearch placeholder="Selecciona a un Profesor" optionFilterProp="children">
                  {professors.map((professor) => <Option key={professor.id} value={professor.id}>{professor.first_name} {professor.last_name}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item name="student_ids" label="Estudiantes">
                <Select mode="multiple" placeholder="Selecciona a los alumnos a ingresar">
                  {students.map((student) => <Option key={student.id} value={student.id}>{student.first_name} {student.last_name}</Option>)}
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

export default FormAddGroup;
