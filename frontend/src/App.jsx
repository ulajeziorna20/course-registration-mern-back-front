import './App.css';
import axios from 'axios';
import { useState } from 'react';
import AddFormUser from './components/AddFormUser';



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
    const users = await axios.get('http://localhost:8080/user/');
    setUsers(users.data);

  }
  return (
    <div className="App">
      <AddFormUser
        getUsers={getUsers}
        getValue={getValue}
        formData={formData}
      />
    </div>
  );
}

export default App;
