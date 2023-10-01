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



  const sortNameUp = (async () => {
    const res = await axios.get('http://localhost:8080/user/sortUp')
    setUsers(res.data)


  })
  const sortNameDown = (async () => {
    const res = await axios.get('http://localhost:8000/user/sortDown')
    setUsers(res.data)

  })


  const sortCityUp = (async () => {
    const res = await axios.get('http://localhost:8000/user/sortCityUp')
    setUsers(res.data)


  })
  const sortCityDown = (async () => {
    const res = await axios.get('http://localhost:8000/user/sortCityDown')
    setUsers(res.data)

  })

  const sortCourseUp = (async () => {
    const res = await axios.get('http://localhost:8000/user/sortCourseUp')
    setUsers(res.data)


  })
  const sortCourseDown = (async () => {
    const res = await axios.get('http://localhost:8000/user/sortCourseDown')
    setUsers(res.data)

  })



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
        sortNameUp={sortNameUp} sortNameDown={sortNameDown}
        sortCityUp={sortCityUp} sortCityDown={sortCityDown}
        sortCourseUp={sortCourseUp} sortCourseDown={sortCourseDown}
      />
    </div>
  );
}

export default App;
