import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class CommentService {
  
  
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData);
    await comment.populate('creator', 'name picture');
    return comment;
  }

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId}).populate('creator', 'name picture');
    return comments;
  }

  async deleteComment(commentId, userInfo) {
    const comment = await dbContext.Comments.findById(commentId);

    if (!comment) {
      throw new BadRequest(`Invalid Id: ${commentId}`);
    }

    if (userInfo.id != comment.creatorId) {
      throw new Forbidden(`This Aint Yo Comment, bro! Go Straight to Jail ${userInfo.nickname.toUpperCase()}!`);
    }

    await comment.deleteOne();
  }

}

export const commentService = new CommentService();