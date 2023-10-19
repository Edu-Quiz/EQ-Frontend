import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Form, Button, Input, Card, Col, Row, Select, Skeleton } from "antd";

const FormEditAssignment = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();  
  const { notification } = App.useApp();
  const { group_id, assignment_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [assignmentData, setAssignmentData] = useState({ assignment_name: "", category: "", questions: [], });

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/assignments/${assignment_id}`
        );
        const assignment = response.data;

        setAssignmentData({
          assignment_name: assignment.title,
          category: assignment.category,
          questions: assignment.AssignmentQuestions.map((question) => ({
            question: question.question,
            answer1: question.answer1,
            answer2: question.answer2,
            answer3: question.answer3,
            answer4: question.answer4,
            correctAnswer: question.correctAnswer,
          })),
        });
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    }

    fetchAssignment();
  }, [assignment_id]);

  const showNotification = (e) => {
    notification.success({
      message: `Tarea Actualizada Existosamente!`,
      description: `La Tarea: ${e.assignment_name} se ha editado exitosamente`,
      placement: 'topRight',
    });
  };

  const updateAssignment = async (e) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/assignments/${assignment_id}`, {
        title: e.assignment_name,
        category: e.category,
        group_uuid: group_id,
        questions: e.questions,
      });
      showNotification(e)
      navigate(`/group/${group_id}`);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1 className="title">Tareas</h1>
      <h2 className="subtitle">
        Editar la Tarea: {assignmentData.assignment_name}
      </h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            {isLoading ? (
              <Skeleton active />
            ) : (
              <Form form={form} onFinish={updateAssignment} name="dynamic_form_complex" layout="vertical" autoComplete="off" initialValues={assignmentData}>
                <Form.Item name="assignment_name" label="Nombre de la Tarea" rules={[ { required: true, message: "Por favor, escribe un nombre para la tarea" }, ]}>
                  <Input placeholder="Nombre de la Tarea" />
                </Form.Item>
                <Form.Item name="category" label="Categoría" rules={[ { required: true, message: "Por favor, escribe una categoría para la Tarea" }, ]}>
                  <Input placeholder="Categoría" />
                </Form.Item>
                <Form.List name="questions" initialValue={assignmentData.questions} rules={[ { required: true, message: "Por favor, escribe una categoría para la Tarea" }, ]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Card style={{ maxWidth: 600, marginBottom: "15px" }} headStyle={{ backgroundColor: "rgba(26, 112, 232)", color: "white" }} size="small" title={`Pregunta ${key + 1}`} key={key} extra={ <CloseOutlined style={{ color: "white" }} onClick={() => { remove(name); }} /> }>
                          <Form.Item {...restField} name={[name, "question"]} rules={[ { required: true, message: "Por favor, escribe una pregunta" }, ]}>
                            <Input />
                          </Form.Item>
                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item {...restField} name={[name, "answer1"]} rules={[ { required: true, message: "Por favor, escribe una respuesta" }, ]} label="Respuesta 1">
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item {...restField} name={[name, "answer2"]} rules={[ { required: true, message: "Por favor, escribe una respuesta" }, ]} label="Respuesta 2">
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item {...restField} name={[name, "answer3"]} rules={[ { required: true, message: "Por favor, escribe una respuesta" }, ]} label="Respuesta 3">
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item {...restField} name={[name, "answer4"]} rules={[ { required: true, message: "Por favor, escribe una respuesta" }, ]} label="Respuesta 4">
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item {...restField} name={[name, "correctAnswer"]} rules={[ { required: true, message: "Por favor, selecciona una respuesta correcta" }, ]} label="Respuesta Correcta">
                            <Select>
                              <Select.Option value={1}>1</Select.Option>
                              <Select.Option value={2}>2</Select.Option>
                              <Select.Option value={3}>3</Select.Option>
                              <Select.Option value={4}>4</Select.Option>
                            </Select>
                          </Form.Item>
                        </Card>
                      ))}
                      <Form.Item>
                        <Button style={{ marginBottom: "15px" }} type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                          Agregar Pregunta
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Actualizar
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditAssignment;
