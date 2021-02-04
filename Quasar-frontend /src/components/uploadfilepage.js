import React, { Component } from 'react';
import { Layout } from 'antd';
import '.././css/uploadfilepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Alert} from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { ListGroup} from 'react-bootstrap';
import { Form, Row, Col} from 'react-bootstrap';
import { Button as SubmitButton } from 'react-bootstrap'

import { Button } from 'antd';

import { DatePicker, Space } from 'antd';

import FileService from '.././services/FileService.js';

const { Content, Sider } = Layout;

class uploadfilepage extends Component{
  constructor(props) {
    super(props);

    this.state = {
      metas: [
        {
          longitude: 0,
          latitude: 0,
          altitude: 0,
          satellite: "",
          frequency: 0,
          rate: 0,
          time: "",
        }
      ],
      files: [],
      submitted_success: false,
      submitted_fail: false,
      message: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.AlertButtonClicked_success = this.AlertButtonClicked_success.bind(this);
    this.AlertButtonClicked_fail = this.AlertButtonClicked_fail.bind(this);
  }

  // Check form
  AlertButtonClicked_success = (event) => {
    this.setState({
      submitted_success: false
    });
    this.props.history.push({
      pathname: '/upload',
      state:{
        username: this.props.location.state.username,
        location: this.props.location.state.location,
        email: this.props.location.state.email,
        image: this.props.location.state.image
      }
    });
  }


  AlertButtonClicked_fail = (event) => {
    this.setState({
      submitted_fail: false
    });
    this.props.history.push({
      pathname: '/upload',
      state:{
        username: this.props.location.state.username,
        location: this.props.location.state.location,
        email: this.props.location.state.email,
        image: this.props.location.state.image
      }
    });
  }

  // Page jump
  handleProfile = (event) => {
    this.props.history.push({
      pathname: '/profile',
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

  handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  // Set state
  onFileChange = (e) => {
    let files = [...this.state.files]
    files[e.target.name] = e.target.files[0]
    this.setState({files: files})
  };

  onTimeChange = (value, dateString, id) => {
    let metas = [...this.state.metas]
    metas[id.index]["time"] = dateString
    this.setState({["time"]: dateString})
  }

  handleChange = (e) => {
    if (["longitude", "latitude", "altitude", "satellite", "frequency", "rate"].includes(e.target.name)) {
      let metas = [...this.state.metas]
      metas[e.target.dataset.id][e.target.name] = e.target.value
      this.setState({[e.target.name]: e.target.value})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }

  addFile = (e) => {
    this.setState((prevState) => ({
      metas: [...prevState.metas, {
        longitude: 0,
        latitude: 0,
        altitude: 0,
        satellite: "",
        frequency: 0,
        rate: 0,
        time: "",
      }],
      files:[...prevState.files, null],
    }));
  }

  removeFile = (e) => {
     let metas = [...this.state.metas]
     metas.splice(e.target.id, 1)
     this.setState({metas: metas})
     let files = [...this.state.files]
     files.splice(e.target.id, 1)
     this.setState({files: files})
  }

  handleSubmit = async (event) => {
     event.preventDefault();
     console.log(this.state.metas);
     console.log(this.state.files);
     var formData = new FormData();
     //formData.append("files", this.state.files);
     for (const key of Object.keys(this.state.files)) {
       formData.append('files', this.state.files[key])
     }
     formData.append("metas", JSON.stringify(this.state.metas));
     formData.append("username", this.props.location.state.username);
     FileService.uploadFile(formData).then(res => {
       if(res.data){
         console.log("upload success");
         this.setState({
           submitted_success: true,
           message: "upload success"
         });
       }
     }).catch(error => {
       if(error.response) {
          console.log("upload fail");
          this.setState({
            submitted_fail: true,
            message: "upload fail"
          });
       }
     });
  }

  render(){
    let metas = this.state.metas
    return (
      <div>
        <Layout>
          <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
            <Navbar.Brand className="navbar-brand">Quasar</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="mr-auto">
                   <Nav.Link onClick={this.handleProfile}>profile</Nav.Link>
                   <Nav.Link onClick={this.handleVisualize}>visualize data</Nav.Link>
               </Nav>
              <Nav>
                <Nav.Link onClick={this.handleLogout}>Log out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
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
          <Layout>
            <Sider width={200} style={{ padding: '8% 1%', background: 'white' }}>
              <Image className="profile-img" src={`data:image/png;base64, ${this.props.location.state.image}`} roundedCircle />
              <ListGroup variant="flush">
                <ListGroup.Item></ListGroup.Item>
                <ListGroup.Item>name: {this.props.location.state.username}</ListGroup.Item>
                <ListGroup.Item>location: {this.props.location.state.location}</ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            </Sider>
            <Layout style={{ padding: '8% 0%' }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: '3% 5%',
                  margin: 0,
                  minHeight: 580,
                }}
              >
                <Form
                  className="form-satellite"
                  onSubmit={this.handleSubmit}
                >
                  {
                    metas.map((file, index) => {
                      let latId = `lat-${index}`, LongId = `long-${index}`, altiId = `alti-${index}`
                      let satId = `sat-${index}`, freqId = `freq-${index}`, rateId = `rate-${index}`
                      return (
                        <div key={index}>
                          <Form.Group as={Row} className="left">

                            <Form.Label column sm={2}> File </Form.Label>
                            <Form.File name={index} onChange={this.onFileChange}/>

                            <Form.Group as={Col} className="right" >
                              <Button variant="light"  id={index} name={index} onClick={this.removeFile}>-</Button>
                            </Form.Group>
                          </Form.Group>

                          <Form.Group as={Row} className="left">

                              <Form.Label column sm={2}> Location </Form.Label>

                              <Form.Group as={Col}>
                                <Form.Label>Longitude(degree)</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="longitude"
                                  data-id={index}
                                  id={LongId}
                                  value = {metas.longitude}
                                  onChange={this.handleChange}
                                />
                               </Form.Group>

                              <Form.Group as={Col}>
                                <Form.Label>Latitude(degree)</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="latitude"
                                  data-id={index}
                                  id={latId}
                                  value = {metas.latitude}
                                  onChange={this.handleChange}
                                />
                              </Form.Group>

                              <Form.Group as={Col} >
                                <Form.Label>Altitude(km)</Form.Label>
                                <Form.Control
                                   type="text"
                                   name="altitude"
                                   data-id={index}
                                   id={altiId}
                                   value = {metas.altitude}
                                   onChange={this.handleChange}
                                />
                              </Form.Group>

                          </Form.Group>

                          <Form.Group as={Row} className="left">
                            <Form.Label column sm={2}> Satellite </Form.Label>
                            <Col sm={10}>
                              <Form.Control placeholder="Satellite"
                                type="text"
                                name="satellite"
                                data-id={index}
                                id={satId}
                                value = {metas.satellite}
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row} className="left">
                            <Form.Label column sm={2}> Frequency(Hz) </Form.Label>
                            <Col sm={10}>
                              <Form.Control placeholder="Frequency"
                                type="text"
                                name="frequency"
                                data-id={index}
                                id={freqId}
                                value = {metas.frequency}
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row} className="left">
                            <Form.Label column sm={2}> Rate(ksps) </Form.Label>
                            <Col sm={10}>
                              <Form.Control placeholder="Rate"
                                type="text"
                                name="rate"
                                data-id={index}
                                id={rateId}
                                value = {metas.rate}
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row} className="left">
                            <Form.Label column sm={2}> Time(UTC) </Form.Label>
                            <Col sm={10}>
                              <Space direction="vertical" size={12}>
                                 <DatePicker showTime
                                  onChange={(date, dateString) => this.onTimeChange(date, dateString, {index})}
                                 />
                              </Space>
                            </Col>
                          </Form.Group>
                          <hr />
                        </div>
                      )
                    })
                  }
                  <Form.Group as={Row} className="left">
                    <Col sm={10}>
                      <Button variant="light" onClick={this.addFile}>+</Button>
                    </Col>
                  </Form.Group>
                  <SubmitButton className="form-btn" variant="dark" type="submit">
                    Upload
                  </SubmitButton>
                </Form>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default uploadfilepage;
