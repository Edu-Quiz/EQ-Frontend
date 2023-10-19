import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { React, useState, useEffect } from "react";
import { App, Form, Select, Button, Input, Upload } from "antd"
const { Option } = Select

const FormAddGroup = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { notification } = App.useApp();
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  const [base64Image, setBase64Image] = useState('');

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64Image(e.target.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    } else if (info.file.status === 'error') {
    }
  };

  const beforeUpload = (file) => {
    if (file.type.startsWith('image/')) {
      setFileList([file]);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getProfessors();
    getStudents();
  }, []);

  const showNotification = (e) => {
    notification.success({
      message: `Grupo Creado Existosamente!`,
      description: `El Grupo: ${e.group_name} se ha creado exitosamente`,
      placement: 'topRight',
    });
  };

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
        image: base64Image
      });
      showNotification(e);
      navigate("/groups");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const customRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
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
              <Form.Item name="image" label="Imagen de Fondo" rules={[ { required: true, message: 'Porfavor, carga una imagen', }, ]}>
                <Upload customRequest={customRequest} showUploadList={false} fileList={fileList} onChange={handleUpload} beforeUpload={beforeUpload}>
                  <Button icon={<UploadOutlined/>}>Upload Image</Button>
                </Upload>
              </Form.Item>
              {base64Image && (
                <div>
                  <img src={base64Image} alt="Uploaded" style={{ maxWidth: '60%' }} />
                </div>
              )}
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
