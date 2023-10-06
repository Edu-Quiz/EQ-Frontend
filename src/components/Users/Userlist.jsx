import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`);
    getUsers();
  };

  return (
    <div>
      <h1 className="title">Usuarios</h1>
      <h2 className="subtitle">Lista de Usuarios</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        + Crear Usuario
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nombre(s)</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/edit/${user.uuid}`} className="button is-small is-info">
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.uuid)} className="button is-small is-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
