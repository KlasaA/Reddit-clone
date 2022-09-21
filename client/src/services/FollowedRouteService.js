import { Api } from "./";
import axios from "axios";

class FollowedRouteService extends Api {
  constructor(endpoint) {
    super(endpoint);
  }

  async deleteFollowedUser(payload) {
    const { userId, followedUserId } = payload;
    const baseUrl = `${this.baseUrl}/${userId}/${followedUserId}`;
    return await axios.delete(baseUrl, payload);
  }

  async getFollowingList(payload) {
    const userId = payload;
    return await axios.get(`${this.baseUrl}/${userId}`);
  }
  async getFollowedPosts(payload) {
    const userId = payload;
    return await axios.get(`${this.baseUrl}/followed-posts/${userId}`);
  }
}

export default FollowedRouteService;
