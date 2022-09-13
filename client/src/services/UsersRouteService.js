import { Api } from "./";
import axios from "axios";

class UserRouteService extends Api {
  constructor(endpoint) {
    super(endpoint);
  }
  async postSignIn(payload) {
    return await axios.post(`${this.baseUrl}/signIn`, payload);
  }
  async postSignUp(payload) {
    return await axios.post(`${this.baseUrl}/signUp`, payload);
  }
}

export default UserRouteService;


