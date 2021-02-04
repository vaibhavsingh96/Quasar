import React, { Component } from 'react';
/* CSS */
import '.././css/signuppage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
/* React-Bootstrap Components */
import { Navbar, Nav, Image, Alert } from 'react-bootstrap';
import { Form, Row, Col} from 'react-bootstrap';
import { Button } from 'react-bootstrap'

import { Formik } from 'formik';
import * as Yup from 'yup';

import UserService from '.././services/UserService.js';

import { Base64 } from 'js-base64';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is Required'),
  email: Yup.string().email('Invalid email').required('email is Required'),
  password: Yup.string().min(3, 'Password at lest 3 length').required('Password is Required'),
  location: Yup.string().required('Location is Required'),
});

class signuppage extends Component{

  constructor(props) {
    super(props);

    this.state = {
        username: "",
        email: "",
        password: "",
        location: "",
        submitted_success: false,
        submitted_fail: false,
        message: "",
        image: "https://images.hdrsoft.com/images/lighthouse/thumbs/hdr-vibrant.jpg",
        file: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.AlertButtonClicked_success = this.AlertButtonClicked_success.bind(this);
    this.AlertButtonClicked_fail = this.AlertButtonClicked_fail.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  AlertButtonClicked_success = (event) => {
    this.setState({
      submitted_success: false
    });
    this.props.history.push("/join/signin");
  }


  AlertButtonClicked_fail = (event) => {
    this.setState({
      submitted_fail: false
    });
    this.props.history.push("/join/signup");
  }

  handleSubmit = async (event) => {
     const isValid = await SignupSchema.validate(event);
     if (!isValid) {
       return;
     }
     let encryptedPassword = Base64.encode(this.state.password);
     let user = {
       username: this.state.username,
       email: this.state.email,
       password: encryptedPassword,
       location: this.state.location
     }
     var formData = new FormData();
     formData.append("user", JSON.stringify(user));
     formData.append("file", this.state.file);
     UserService.createUser(formData).then((res, fail) => {
       console.log(res.status);
       if(res.status === 200) {
         this.setState({
           submitted_success: true,
           message: res.data.message
         });
       }
     }).catch((error) => {
       if(error.response) {
         this.setState({
           submitted_fail: true,
           message: "username has already existed!"
         });
        }
     });
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  setImage(event) {
    this.setState({
      image: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    })
  }

  render(){
    return (
      <div>
        <section id='navbar'>
          <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
            <Navbar.Brand className="navbar-brand">Quasar</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/join/signin">Sign in</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </section>

        <Alert className="alert" show={this.state.submitted_success} variant="success">
          <Alert.Heading>{this.state.message}</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={this.AlertButtonClicked_success} variant="outline-success">
              Yes
            </Button>
          </div>
        </Alert>

        <Alert className="alert" show={this.state.submitted_fail} variant="danger">
          <Alert.Heading>{this.state.message}</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={this.AlertButtonClicked_fail} variant="outline-danger">
              Yes
            </Button>
          </div>
        </Alert>

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            location: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={this.handleSubmit}
        >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="signup-form"
            >
              <Row>

                <Col lg={6} className="center">
                  <h5>Choose a photo</h5>
                  <input type="file" onChange={this.setImage}/>
                  <Image className="profile-img" src={this.state.image} roundedCircle />
                </Col>

                <Col lg={6}>
                  <Form.Group className="left" controlId="validationFormik01">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onInput={this.handleChange}
                      isInvalid={touched.username && errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="left" controlId="validationFormik02">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onInput={this.handleChange}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="left"  controlId="validationFormik03">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onInput={this.handleChange}
                      isInvalid={touched.password && errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="left" controlId="validationFormik04">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      onInput={this.handleChange}
                      isInvalid={touched.location && errors.location}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button className="form-btn" variant="dark" type="submit" size="lg">
                    Sign up
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>

        <footer id="footer">
          <div className="container-fluid">
            <p>© Copyright 2020 WiTech Lab</p>
            <p>Carnegie Mellon University</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default signuppage;
