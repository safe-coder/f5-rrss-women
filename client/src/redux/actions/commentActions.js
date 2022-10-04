import {
  patchDataApi,
  postDataApi,
  deleteDataApi,
} from "../../utils/fetchDataApi";
import { POST_TYPES } from "./postActions";
import { EditData, DeleteData } from "./alertActions";

/// Crear Comentario

export const createComment =
  ({ pos, newComment, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...pos, commentss: [...pos.commentss, newComment] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = { ...newComment, postId: pos._id, postUserId: pos.user._id };

      const res = await postDataApi("comment", data, auth.token);
      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...pos, commentss: [...pos.commentss, newData] };

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

      socket.emit("createComment", newPost);
      console.log(newPost);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

/// Actualizar Comentario

export const updateComment =
  ({ comment, content, pos, auth }) =>
  async (dispatch) => {
    const newComment = EditData(pos.commentss, comment._id, {
      ...comment,
      content,
    });
    console.log(newComment);
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newComment });
    try {
      await patchDataApi(`comment/${comment._id}`, { content }, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

/// Like Comentario

export const likecomment =
  ({ comment, pos, auth }) =>
  async (dispatch) => {
    console.log({ comment, pos, auth });

    const newcomment = { ...comment, likes: [...comment.likes, auth.user] };

    const newComments = EditData(pos.commentss, comment._id, newcomment);

    const newPost = { ...pos, commentss: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      const res = await patchDataApi(
        `comment/${comment._id}/like`,
        null,
        auth.token
      );
      console.log(res);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

  /// Dislike Comentario

export const unlikecomment =
  ({ comment, pos, auth }) =>
  async (dispatch) => {
    console.log({ comment, pos, auth });
    const newcomment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };

    const newComments = EditData(pos.commentss, comment._id, newcomment);

    const newPost = { ...pos, commentss: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchDataApi(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

/// Borrar Comentario

export const deleteComment =
  ({ comment, pos, auth, socket }) =>
  async (dispatch) => {
    const deleteArr = [
      ...pos.commentss.filter((cm) => cm.reply === comment._id),
      comment,
    ];
    const newPost = {
      ...pos,
      commentss: pos.commentss.filter(
        (cm) => !deleteArr.find((da) => cm._id === da._id)
      ),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      deleteArr.forEach((item) => {
        deleteDataApi(`comment/${item._id}`, auth.token);
        socket.emit("deleteComment", newPost);
      });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
