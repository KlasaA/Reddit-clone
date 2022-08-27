import axios from "axios";

class Api {
  baseUrl = "http://localhost:2000/";

  constructor(endpoint) {
    this.baseUrl = this.baseUrl + endpoint;
  }

  async get() {
    return await axios.get(this.baseUrl);
  }

  async put(payload) {
    return await axios.put(this.baseUrl, payload);
  }

  async post(payload) {
    return await axios.post(this.baseUrl, payload);
  }

  async delete(payload) {
    const baseUrl = this.baseUrl + payload;
    return await axios.delete(baseUrl, payload);
  }
}

export default Api;
