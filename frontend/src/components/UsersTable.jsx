import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';


const UsersTable = (props) => {

  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [search, setSearch] = useState('');

  const findUser = ((e) => {
    let getFindUser = e.target.value;
    let lowerGetFindUser = getFindUser.toLowerCase();
    setSearch(lowerGetFindUser)
  })



  const getUser = (e) => setEditUser(prevState => ({
    ...prevState,
    [e.target.name]: e.target.value,
    [e.target.city]: e.target.value,
    [e.target.course]: e.target.value
  }))

  const handleClose = () => setShow(false);

  const handleShow = (user) => {
    setEditUser(user);
    setShow(true);
  };

  const updateUser = async (user) => {
    const userEdit = await axios.put('http://localhost:8000/user/edit/' + user._id,
      {
        _id: user._id,
        name: editUser.name,
        city: editUser.city,
        course: editUser.course
      })
    setEditUser(userEdit);
    props.getUsers();
    setShow(false);
  }


  const clear = (() => {
    setSearch('');
    document.getElementById("formSearch").reset();
  })



  return (
    <div className="containerTable">
      <Container>
        <Table variant="dark" className="tableSearch">
          <thead>
            <tr>
              <th className="thSearch">
                <div className="searchText col-lg-4">Wyszukaj : </div>
                <div className="inputDiv  col-lg-8">
                  <form id="formSearch" className="form-reset">
                    <input type="text" className="input-search"
                      name="inputSearch"
                      id="inputSearch"
                      onChange={findUser}
                    />
                    <Button type="reset" variant="outline-success" className="btnReset" onClick={clear}>Reset</Button>
                  </form>
                </div>
              </th>
            </tr>
          </thead>
        </Table>

        <Table variant="dark" className="tableUs  table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">IMIĘ NAZWISKO
                <i onClick={props.sortNameUp} className="fa-solid fa-arrow-up"></i>
                <i onClick={props.sortNameDown} className="fa-solid fa-arrow-down"></i>
              </th>
              <th scope="col">MIASTO
                <i onClick={props.sortCityUp} className="fa-solid fa-arrow-up"></i>
                <i onClick={props.sortCityDown} className="fa-solid fa-arrow-down"></i>
              </th>
              <th scope="col">KURS
                <i onClick={props.sortCourseUp} className="fa-solid fa-arrow-up"></i>
                <i onClick={props.sortCourseDown} className="fa-solid fa-arrow-down"></i>
              </th>
              <th scope="col">Usuń</th>
              <th scope="col">Edytuj</th>
            </tr>
          </thead>
          <tbody>
            {props.dataUsers.filter((user) => {
              return search.toLowerCase() === '' ? user :
                user.name.toLowerCase().includes(search) ||
                user.city.toLowerCase().includes(search) ||
                user.course.toLowerCase().includes(search)
            }).map((user, index) => (
              <tr key={index} >
                <td className="marg m-3" onClick={() => handleShow(user)}>{user.name}</td>
                <td onClick={() => handleShow(user)}>{user.city}</td>
                <td onClick={() => handleShow(user)}>{user.course}</td>
                <td>
                  {/* tu bedzie usuwanie  */}
                </td>
                <td><Button variant="outline-warning" onClick={() => handleShow(user)}>Edytuj</Button> </td>
              </tr>
            ))
            }

          </tbody>
        </Table>
      </ Container>


      <Modal show={show} onHide={handleClose}   >
        <Modal.Header closeButton className="modalHeaderColor">
          <Modal.Title>Edycja uczestnika</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBodyColor">
          <div className="row">
            <div className="col-lg-12">
              <label htmlFor="name" className="form-label">Wpisz imię i nazwisko</label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12"><input type="text" className="form-control"
              defaultValue={editUser.name}
              name="name"
              id="name"
              onChange={getUser}></input>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <Form.Label>Wybierz miasto</Form.Label>
              <Form.Control
                as="select"
                name="city"
                id="city"
                onChange={getUser}
              >
                <option value={editUser.city} name="city"  >{editUser.city}</option>
                <option value="Wrocław" name="city">Wrocław</option>
                <option value="Kraków" name="city">Kraków</option>
                <option value="Warszawa" name="city">Warszawa</option>
                <option value="Zielona Góra" name="Zielona Góra">Zielona Góra</option>
              </Form.Control>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Form.Label >Wybierz kurs</Form.Label>
              <Form.Control
                as="select"
                name="course"
                onChange={getUser}
              >
                <option value={editUser.course} name="course" >{editUser.course}</option>
                <option value="Front End Developer" name="course">Front End Developer</option>
                <option value="Back End Developer" name="course">Back End Developer</option>
                <option value="Full Stack Developer" name="course">Full Stack Developer</option>
                <option value="Zaawansowany kurs Reacta" name="course">Zaawansowany kurs Reacta</option>
              </Form.Control><br />

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="outline-secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="outline-success" onClick={() => { updateUser(editUser) }}>
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}
export default UsersTable;
