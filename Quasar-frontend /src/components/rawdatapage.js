import React, { Component } from 'react';
import { Layout } from 'antd';
import '.././css/signalvisualizationpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Image} from 'react-bootstrap';
import { ListGroup} from 'react-bootstrap';
import DataService from '.././services/DataService.js';
import ReactAudioPlayer from 'react-audio-player';

const { Content, Sider } = Layout;

class rawdatapage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      type: "",
    };
  }

  componentDidMount(){
    DataService.getRawData(this.props.location.state.username).then(response => {
          if(response.data) {
            console.log(response);
            this.setState({image: URL.createObjectURL(response.data)});
            this.setState({type: response.headers["content-type"].split("/")[0]});
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

  handleDecoded = (event) => {
    this.props.history.push({
      pathname: '/decodeddata',
      state:{
        username: this.props.location.state.username,
        location: this.props.location.state.location,
        email: this.props.location.state.email,
        image: this.props.location.state.image
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
                    <Nav.Link onClick={this.handleProfile}>profile</Nav.Link>
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
                <Nav variant="tabs" defaultActiveKey="/rawdata">
                  <Nav.Item>
                    <Nav.Link onClick={this.handleData}>data</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/rawdata">Raw data</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={this.handleDecoded}>Decoded data</Nav.Link>
                  </Nav.Item>
                </Nav>
                <div className="display">
                  <Display type={this.state.type} content={this.state.image}/>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

function Display(prop) {
  console.log(prop.type)
  if (prop.type === "image") {
    return <Image className="data-img" src={prop.content}/>;
  }
  else if (prop.type === "audio") {
    return <ReactAudioPlayer
            className="data-aud"
            src={prop.content}
            controls
          />
  }
  else {
    return <h1> </h1>;
  }
}

export default rawdatapage;
