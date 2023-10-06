import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nombre(s)</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Nombre(s)"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Apellidos</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Apellidos"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Correo</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Contraseña</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirmar Contraseña</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tipo de Usuario</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Administrador</option>
                      <option value="professor">Profesor</option>
                      <option value="user">Alumno</option>
                    </select>
                  </div>
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

export default FormAddUser;
