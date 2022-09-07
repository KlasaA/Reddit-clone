import { Api } from "./";
import axios from "axios";

class CommentRouteService extends Api {
  constructor(endpoint) {
    super(endpoint);
  }
  async delete(payload) {
    const { commentId, replyId, postId } = payload;
    const baseUrl = `${this.baseUrl}${commentId}/${replyId}/${postId}`;
    return await axios.delete(baseUrl, payload);
  }
}

export default CommentRouteService;
