import { Api } from "./";
import axios from "axios";

class PostRouteService extends Api {
  constructor(endpoint) {
    super(endpoint);
  }

  async postFavoritePosts(payload) {
    return await axios.post(`${this.baseUrl}/favorites`, payload);
  }

  async deletePostFromFavorites(payload) {
    const { userId, postId } = payload;
    const baseUrl = `${this.baseUrl}/favorites/${userId}/${postId}`;
    return await axios.delete(baseUrl, payload);
  }

  async getUser(payload) {
    const userId = payload;
    return await axios.get(`${this.baseUrl}/favorites/${userId}`);
  }

  async getFavoritePosts(payload) {
    const userId = payload;
    return await axios.get(`${this.baseUrl}/favorites/${userId}`);
  }
}

export default PostRouteService;
