import axios from 'axios';

class DataService {
  getData(username) {
    return axios({
      method: 'get',
      url: "http://localhost:8080/data?username=" + username,
      responseType: 'blob',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authorization"),
      }
    });
  }

  getRawData(username) {
    return axios({
      method: 'get',
      url: "http://localhost:8080/rawdata?username=" + username,
      responseType: 'blob',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authorization"),
      }
    });
  }

  getDecodedData() {
    return axios({
      method: 'get',
      url: "http://localhost:8080/decodeddata",
      responseType: 'blob',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authorization"),
      }
    });
  }
}

export default new DataService()
