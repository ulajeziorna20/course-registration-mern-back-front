import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import ModalDelete from './modals/ModalDelete';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'



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
      {/* <FontAwesomeIcon icon={faCoffee} /> */}
      <Container>
        <Table variant="dark" className="tableSearch">
          <thead>
            <tr className='trHead'>
              <th className="thSearch">
                <form id="formSearch" className="form-reset">
                  <label className="searchText col-lg-4">Wyszukaj : </label>
                  <input type="text" className="input-search"
                    name="inputSearch"
                    id="inputSearch"
                    onChange={findUser}
                  />
                  <Button type="reset" variant="outline-success" className="btnReset" onClick={clear}>Reset</Button>
                </form>

              </th>
            </tr>
          </thead>
        </Table>

        <Table variant="dark" className="tableUs  table-hover align-middle">
          <thead>
            <tr className='userTableHeadRow'>
              <th scope="col">
                <p>IMIĘ NAZWISKO</p>


                <FontAwesomeIcon onClick={props.sortNameUp} icon={faArrowUp} className='fa-arrow-up' />
                <FontAwesomeIcon onClick={props.sortNameDown} icon={faArrowDown} className='fa-arrow-down' />
              </th>
              <th scope="col">
                <p>MIASTO</p>
                <FontAwesomeIcon onClick={props.sortCityUp} icon={faArrowUp} className='fa-arrow-up' />
                <FontAwesomeIcon onClick={props.sortCityDown} icon={faArrowDown} className='fa-arrow-down' />
              </th>
              <th scope="col" className='courseHead'>
                <p>KURS</p>
                <FontAwesomeIcon onClick={props.sortCourseUp} icon={faArrowUp} className='fa-arrow-up' />
                <FontAwesomeIcon onClick={props.sortCourseDown} icon={faArrowDown} className='fa-arrow-down' />
              </th>
              <th scope="col" className='deleteOption'>Usuń</th>
              <th scope="col" className='editOption'>Edytuj</th>
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
                <td onClick={() => handleShow(user)} className='cityTd'>{user.city}</td>
                <td onClick={() => handleShow(user)}>{user.course}</td>
                <td>
                  <ModalDelete post={user} getUsers={props.getUsers} />
                </td>
                <td><Button variant="outline-warning" onClick={() => handleShow(user)}>Edytuj</Button> </td>
              </tr>
            ))
            }

          </tbody>
        </Table>
      </ Container>


      <Modal show={show} onHide={handleClose} className='modal-body'  >
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
