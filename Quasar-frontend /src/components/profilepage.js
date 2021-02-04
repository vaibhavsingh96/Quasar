import React, { Component } from 'react';
import { Navbar, Nav, Image, ListGroup } from 'react-bootstrap';

/* CSS */
import '.././css/profilepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class profilepage extends Component {

  handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }
  handleUpload = (event) => {
    this.props.history.push({
      pathname: '/upload',
      state:{
        username: this.props.location.state.username,
        location: this.props.location.state.location,
        enmail: this.props.location.state.email,
        image: this.props.location.state.image
      }
    });
  }
  handleVisualize = (event) => {
    this.props.history.push({
      pathname: '/data',
      state:{
        username: this.props.location.state.username,
        location: this.props.location.state.location,
        enmail: this.props.location.state.email,
        image: this.props.location.state.image
      }
    });
  }
  render() {
      return (
          <div>
               <section id='navbar'>
                  <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
                      <Navbar.Brand className="navbar-brand">Quasar</Navbar.Brand>
                      <Navbar.Toggle />
                      <Navbar.Collapse className="justify-content-end">
                          <Nav className="mr-auto">
                              <Nav.Link onClick={this.handleUpload}>upload file</Nav.Link>
                              <Nav.Link onClick={this.handleVisualize}>visualize data</Nav.Link>
                          </Nav>
                          <Nav>
                              <Nav.Link onClick={this.handleLogout}>Log out</Nav.Link>
                          </Nav>
                      </Navbar.Collapse>
                  </Navbar>
              </section>
              <section id='profile'>
                  <div className="container-fluid">
                      <h4>Profile</h4>
                      <Image className="profile-img" src={`data:image/png;base64, ${this.props.location.state.image}`} roundedCircle />
                      <ListGroup variant="flush">
                          <ListGroup.Item></ListGroup.Item>
                          <ListGroup.Item>username: {this.props.location.state.username}</ListGroup.Item>
                          <ListGroup.Item>email: {this.props.location.state.email}</ListGroup.Item>
                          <ListGroup.Item>location: {this.props.location.state.location}</ListGroup.Item>
                          <ListGroup.Item></ListGroup.Item>
                      </ListGroup>
                  </div>
              </section>
              <section id='functionalities'>
                  <div className="container-fluid">

                  </div>
              </section>
          </div>
      );
  }
}

export default profilepage;
