import React from 'react';
import './css/App.css';
import HomePage from './components/homepage';
import SignInPage from './components/signinpage';
import SignUpPage from './components/signuppage';
import UploadFilePage from './components/uploadfilepage';
import DataPage from './components/datapage';
import RawDataPage from './components/rawdatapage';
import DecodedDataPage from './components/decodeddatapage';
import ProfilePage from './components/profilepage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/join/signup' component={SignUpPage}/>
          <Route path='/join/signin' component={SignInPage}/>
          <ProtectedRoute path='/upload' component={UploadFilePage} />
          <ProtectedRoute path='/data' component={DataPage}/>
          <ProtectedRoute path='/rawdata' component={RawDataPage}/>
          <ProtectedRoute path='/decodeddata' component={DecodedDataPage}/>
          <ProtectedRoute path='/profile' component={ProfilePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
