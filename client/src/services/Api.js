import axios from "axios";

class Api {
  baseUrl = "http://localhost:2000/";

  constructor(endpoint) {
    this.baseUrl = this.baseUrl + endpoint;
  }

  async get() {
    return await axios.get(this.baseUrl);
  }

  async update(payload) {
    return await axios.put(this.baseUrl, payload);
  }

  async post(payload) {
    return await axios.post(this.baseUrl, payload);
  }

  async delete(payload) {
    return await axios.delete(this.baseUrl, payload);
  }
}

export default Api;
