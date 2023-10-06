import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`);
    console.log(response.data)
    setGroups(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/groups/${productId}`);
    getGroups();
  };

  return (
    <div>
      <h1 className="title">Grupos</h1>
      <h2 className="subtitle">Lista de Grupos</h2>
      <Link to="/groups/add" className="button is-primary mb-2">
        + Crear Grupo
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Grupo</th>
            <th>Maestro Asignado</th>
            <th>Alumnos Inscritos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={group.uuid}>
              <td>{index + 1}</td>
              <td>{group.group_name}</td>
              <td>{group.Professor.first_name} {group.Professor.last_name}</td>
              <td>0</td>
              <td>
                <Link
                  to={`/groups/edit/${group.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(group.uuid)}
                  className="button is-small is-danger"
                >
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

export default GroupList;
