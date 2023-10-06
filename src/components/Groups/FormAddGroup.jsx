import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddGroup = () => {
  const [name, setName] = useState("");
  const [professor_id, setProfessorID] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    getProfessors();
  }, []);

  const getProfessors = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/professors`);
    setProfessors(response.data);
  };

  const createGroup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/groups`, {
        group_name: name,
        professor_id: professor_id,
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
            <form onSubmit={createGroup}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del Grupo"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Maestro</label>
                <div className="control">
                  <select
                    type="text"
                    className="input"
                    // value={price}
                    onChange={(e) => setProfessorID(e.target.value)}
                    placeholder="Maestros"
                  >
                    <option value="Selecciona a un Maestro" selected disabled>-- Selecciona a un Maestro --</option>
                    {professors.map((professor) => <option value={professor.id}>{professor.first_name} {professor.last_name}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddGroup;
