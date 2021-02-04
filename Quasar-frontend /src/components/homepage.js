import React, { Component } from 'react';
/* CSS */
import '.././css/homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
/* Awesome Fonts */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroadcastTower, faUpload, faChartBar } from '@fortawesome/free-solid-svg-icons'
/* React-Bootstrap Components */
import { Navbar, Nav } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

class homepage extends Component {
  render(){
    return (
      <div>
        <section id='navbar'>
          <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
            <Navbar.Brand className="navbar-brand">Quasar</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="/join/signup">Sign up</Nav.Link>
                <Nav.Link href="/join/signin">Sign In</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </section>

        <section id="title">
          <Row className="container-fluid">
            <Col lg={5}>
              <h1>Quasar</h1>
              <h1>Community driven ground stations from satellite signal reception</h1>
            </Col>
            <Col lg={7}>
            </Col>
          </Row>
        </section>

        <section id="features">
          <div className="container-fluid">
            <h1>Our Project</h1>
            <Row>
              <Col sm={12} md={12} lg={4} >
                <FontAwesomeIcon className="fa-4x" icon={faBroadcastTower} />
                <h3>Processed Signal</h3>
                <p>Get processed signal from subscribed satellites</p>
              </Col>
              <Col sm={12} md={12} lg={4} >
                <FontAwesomeIcon className="fa-4x" icon={faUpload} />
                <h3>Upload Data</h3>
                <p>Upload statellite data to cloud server</p>
              </Col>
              <Col sm={12} md={12} lg={4} >
                <FontAwesomeIcon className="fa-4x" icon={faChartBar} />
                <h3>Visualize Data</h3>
                <p>Visualize stream of data from edge devices</p>
              </Col>
            </Row>
          </div>
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

export default homepage;
