import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { Comment } from "@/models/Comment.js";


class CommentsService {
  async createComment(commentData) {
    const res = await api.post(`api/comments`, commentData);
    logger.log('created comment', res.data);
    const comment = new Comment(res.data);
    AppState.comments.push(comment);
  }

  async getCommentsByEventId(eventId) {
    AppState.comments = [];
    const res = await api.get(`api/events/${eventId}/comments`);
    logger.log('got comments!', res.data);
    const comments = res.data.map((pojo) => new Comment(pojo));
    AppState.comments = comments;
  }
}

export const commentsService = new CommentsService();