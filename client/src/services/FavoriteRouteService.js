import { Api } from "./";
import axios from "axios";

class FavoriteRouteService extends Api {
  constructor(endpoint) {
    super(endpoint);
  }

  async deletePostFromFavorites(payload) {
    const { userId, postId } = payload;
    const baseUrl = `${this.baseUrl}/${userId}/${postId}`;
    return await axios.delete(baseUrl, payload);
  }

  async getFavoriteList(payload) {
    const userId = payload;
    return await axios.get(`${this.baseUrl}/${userId}`);
  }

  async getFavoritePosts(payload) {
    const userId = payload;
    return await axios.get(`${this.baseUrl}/favorite-posts/${userId}`);
  }
}

export default FavoriteRouteService;
