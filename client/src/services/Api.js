import axios from "axios";
import uritemplate from "uritemplate";

class Api {
  baseUrl = "http://localhost:2000/";

  constructor(endpoint) {
    this.baseUrl = this.baseUrl + endpoint;
  }

  async get(params) {
    return await axios.get(
      uritemplate.parse(this.baseUrl + "/{?page,pageSize}").expand(params)
    );
  }

  async put(payload) {
    return await axios.put(this.baseUrl, payload);
  }

  async post(payload) {
    return await axios.post(this.baseUrl, payload);
  }

  async delete(params) {
    const baseUrl = this.baseUrl + params;
    return await axios.delete(baseUrl, params);
  }
}

export default Api;
