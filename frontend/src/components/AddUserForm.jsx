import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

import picture from './img/picture.svg';


const AddUserForm = (props) => {




  const add = async () => {
    const message = document.getElementById('name').value;
    console.log(message)

    if (message === '') {
      let errors = document.getElementById('val');
      let liError = document.createElement('p');
      liError.innerText = 'Wpisz Imię';
      errors.appendChild(liError);

    } else {

      const post = { name: props.formData.name, city: props.formData.city, course: props.formData.course }
      await axios.post('http://localhost:8000/user/addUser/', post)
      document.getElementById('name').value = "";
      document.getElementById('cityAdd').value = "----- Wybierz miasto-----";
      document.getElementById('courseAdd').value = "------ Wybierz kurs------";
      props.getUsers();


    }
  }

  return (
    <div className="containerForm">

      <Container >

        <form>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-lg-12 formElement">
                  <label id="val" htmlFor="name" className="form-label">Wpisz imię i nazwisko</label>
                </div>
              </div>
              <div className="row" /* id="val" */>
                <div className="col-lg-12 formElement" ><input type="text" className="form-control"
                  name="name" id="name" onChange={props.getValue} required ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 formElement">
                  <Form.Label>Wybierz miasto</Form.Label>
                  <Form.Control
                    name="city"
                    as="select"
                    id="cityAdd"
                    onChange={props.getValue} required
                  >
                    <option >----- Wybierz miasto-----</option>
                    <option value="Wrocław" name="city">Wrocław</option>
                    <option value="Kraków" name="city">Kraków</option>
                    <option value="Warszawa" name="city">Warszawa</option>
                    <option value="Zielona Góra" name="Zielona Góra">Zielona Góra</option>
                  </Form.Control>

                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 formElement">
                  <Form.Label>Wybierz kurs</Form.Label>
                  <Form.Control
                    as="select"
                    name="course"
                    id="courseAdd"
                    onChange={props.getValue} required
                  >
                    <option   >------ Wybierz kurs------</option>
                    <option value="Front End Developer" name="course">Front End Developer</option>
                    <option value="Back End Developer" name="course">Back End Developer</option>
                    <option value="Full Stack Developer" name="course">Full Stack Developer</option>
                    <option value="Zaawansowany kurs Reacta" name="course">Zaawansowany kurs Reacta</option>
                  </Form.Control>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 formElement">
                  <Button type="submit" variant="outline-success" className="btn m-3"
                    onClick={add}
                  >Dodaj</Button>
                </div>

              </div>
            </div>
            <div className="col">
              <img src={picture} className="App-logo" alt="logo" />
            </div>
          </div>
        </form>
      </Container>


      
    </div>
  )
}
export default AddUserForm;

