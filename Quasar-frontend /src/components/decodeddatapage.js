import React, { Component } from 'react';
import { Layout } from 'antd';
import '.././css/signalvisualizationpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Image} from 'react-bootstrap';
import { ListGroup} from 'react-bootstrap';
import DataService from '.././services/DataService.js';

const { Content, Sider } = Layout;

class decodeddatapage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      image: []
    };
  }

  componentDidMount(){
    DataService.getDecodedData().then(response => {
          if(response.data) {
            console.log(response);
            this.setState({image: URL.createObjectURL(response.data)});
          }
    });
  }

  handleProfile = (event) => {
    this.props.history.push({
      pathname: '/profile',
      state:{
        username: this.props.location.state.username,
        location: this.props.location.state.location,
        email: this.props.location.state.email,
        image: this.props.location.state.image
      }
    });
  }

  handleUpload = (event) => {
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

  handleRaw = (event) => {
    this.props.history.push({
      pathname: '/rawdata',
      state:{
        username: this.props.location.state.username,
        location: this.props.location.state.location,
        email: this.props.location.state.email,
        image: this.props.location.state.image
      }
    });
  }

  handleData = (event) => {
    this.props.history.push({
      pathname: '/data',
      state:{
        username: this.props.location.state.username,
        location: this.props.location.state.location,
        email: this.props.location.state.email,
        image: this.props.location.state.image
      }
    });
  }

  handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  render(){
    return (
      <div>
        <Layout>
          <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
            <Navbar.Brand className="navbar-brand">Quasar</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="mr-auto">
                    <Nav.Link  onClick={this.handleProfile}>profile</Nav.Link>
                    <Nav.Link onClick={this.handleUpload}>upload file</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={this.handleLogout}>Log out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
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
                  padding: '0% 5%',
                  margin: 0,
                  minHeight: 580,
                }}
              >
                <Nav variant="tabs" defaultActiveKey="/decodeddata">
                  <Nav.Item>
                    <Nav.Link onClick={this.handleData}>data</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={this.handleRaw}>Raw data</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/decodeddata">Decoded data</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Image className="data-img" src={this.state.image} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default decodeddatapage;
