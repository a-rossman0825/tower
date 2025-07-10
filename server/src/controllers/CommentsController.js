import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";


export class CommentsController extends BaseController {
  constructor() {
    super('api/comments');
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComment)
    .delete('/:commentId', this.deleteComment)
    
  }

  /**
    @param {import("express").Request} req
    @param {import("express").Response} res
    @param {import("express").NextFunction} next
   */
  async createComment(req, res, next) {
    try {
      const commentData = req.body;
      commentData.creatorId = req.userInfo.id;
      const comment = await commentService.createComment(commentData);
      res.send(comment);
    } catch (error) {
      next(error)
    }
  }

  /**
    @param {import("express").Request} req
    @param {import("express").Response} res
    @param {import("express").NextFunction} next
   */
  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const userInfo= req.userInfo;
      await commentService.deleteComment(commentId, userInfo);
      res.send('Deleted Comment');
    } catch (error) {
      next(error)
    }
  }


}