import './App.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddUserForm from './components/AddUserForm';
import UsersTable from './components/UsersTable';

function App(props) {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    course: ""
  });

  const getValue = (e) => {

    let name = e.target.name

    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  }


  const getUsers = async () => {
    const users = await axios.get('http://localhost:8000/user/');
    setUsers(users.data);

  }


  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [])



  return (
    <div className="App">
      <AddUserForm
        getUsers={getUsers}
        getValue={getValue}
        formData={formData}
      />

      <UsersTable
        getUsers={getUsers}
        dataUsers={users}
      />
    </div>
  );
}

export default App;
