import React, { Component } from 'react';
/* CSS */
import '.././css/signinpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
/* React-Bootstrap Components */
import { Navbar, Nav } from 'react-bootstrap';
import { Form, Button, Image, Alert} from 'react-bootstrap';

import UserService from '.././services/UserService.js';

import { Base64 } from 'js-base64';

class signinpage extends Component{
  constructor(props) {
    super(props);

    this.state = {
        username: "",
        password: "",
        submitted_fail: false,
        message: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.AlertButtonClicked_fail = this.AlertButtonClicked_fail.bind(this);
  }

  AlertButtonClicked_fail = (event) => {
    this.setState({
      submitted_fail: false
    });
    this.props.history.push("/join/signin");
  }

  handleSubmit = async (event) => {
     event.preventDefault();
     let encryptedPassword = Base64.encode(this.state.password);
     const user = {
       username: this.state.username,
       password: encryptedPassword,
     }
     UserService.signin(user).then(res => {
       if(res.data){
        localStorage.setItem("authorization", res.data.jwt);
        UserService.getUserDetail(res.data.username).then(request => {
          if(request.data){
            this.props.history.push({
              pathname: '/profile',
              state:{
                jwt: res.data.jwt,
                username: this.state.username,
                email: request.data.email,
                location: request.data.location,
                image: request.data.image
              }
            });
          }
        });
       }
     }).catch(error => {
       if(error.response) {
         this.setState({
           submitted_fail: true,
           message: "Username or password is incorrect"
         });
        }
     });
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
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
                <Nav.Link href="/join/signup">Sign up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </section>

        <Alert className="alert" show={this.state.submitted_fail} variant="danger">
          <Alert.Heading>{this.state.message}</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={this.AlertButtonClicked_fail} variant="outline-danger">
              Yes
            </Button>
          </div>
        </Alert>

        <section id="signinform">
          <Form
            className="form-signin"
            onSubmit={this.handleSubmit}
            noValidate
          >
            <div className="bcg">
            <h1 className="h3 mb-3 font-weight-normal white">Welcome to Quasar</h1>
            <h1 className="h3 mb-3 font-weight-normal white">Please sign in</h1>
            </div>
            <Form.Group controlId="formGroupEmail" className="upper">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value = {this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value = {this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button className="form-btn" variant="dark" type="submit" size="lg">
              Sign in
            </Button>
          </Form>
        </section>

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

export default signinpage;
