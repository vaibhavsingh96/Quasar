import axios from 'axios';

class UserService {

  createUser(formData){
    return axios.post("http://localhost:8080/signup", formData);
  }

  signin(user){
    return axios.post("http://localhost:8080/signin" ,user);
  }

  getUserDetail(username){
    console.log('local storage jwt: ', localStorage.getItem("authorization"));
    const options = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authorization"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        'Access-Control-Allow-Credentials' : 'true'
      }
    };
    return axios.post("http://localhost:8080/user-detail", {"username": username}, options);
  }
}

export default new UserService()
