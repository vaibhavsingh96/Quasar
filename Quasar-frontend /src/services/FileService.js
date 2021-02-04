import axios from 'axios';

class FileService {
  uploadFile(files) {
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
    return axios.post("http://localhost:8080/upload", files, options);
  }
}

export default new FileService()
