import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { useState } from 'react';


function ModalDelete(post) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userDelete = async () => {
    await axios.delete('http://localhost:8000/user/delete/' + post.post._id);
    setShow(false);
    post.getUsers();

  }
  return (
    <div>
      <Button variant="outline-danger" onClick={() => { handleShow(false) }} >Usuń</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuwanie użytkowników</Modal.Title>
        </Modal.Header>
        <Modal.Body>Czy napewno chcesz usunąć tego użytkownika</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="outline-danger" onClick={() => userDelete()} >
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


export default ModalDelete