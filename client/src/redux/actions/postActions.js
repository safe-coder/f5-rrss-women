import { imageupload } from "../../utils/imageupload";
import {
  getDataApi,
  postDataApi,
  patchDataApi,
  deleteDataApi,
} from "../../utils/fetchDataApi";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  LOADING_POSTS: "LOADING_POSTS",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
};

/// Crear Post

export const createpost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];

    try {
      dispatch({ type: "ALERT", payload: { loading: true } });

      if (images.length > 0) media = await imageupload(images);

      const res = await postDataApi(
        "posts",
        { content, images: media },
        auth.token
      );
      console.log(res);
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });
      dispatch({ type: "ALERT", payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: "Do not",
        },
      });
    }
  };

/// Consumir Post

export const getPost =
  ({ token, id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: POST_TYPES.LOADING_POSTS, payload: true });
      const res = await getDataApi(`posts/${id}`, token);
      dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });
      dispatch({ type: POST_TYPES.LOADING_POSTS, payload: false });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

  /// Actualizar Post

export const updatepost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const newimgUrl = images.filter((img) => !img.secure_url);
    const oldimgUrl = images.filter((img) => img.secure_url);
    console.log({ oldimgUrl, newimgUrl });
    if (
      status.content === content &&
      newimgUrl.length === 0 &&
      oldimgUrl.length === status.images.length
    )
      return;
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });

      if (newimgUrl.length > 0) media = await imageupload(newimgUrl);

      const res = await patchDataApi(
        `post/${status._id}`,
        { content, images: [...oldimgUrl, ...media] },
        auth.token
      );

      dispatch({ type: "ALERT", payload: { success: res.data.msg } });

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
      dispatch({ type: "ALERT", payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: "nothin",
        },
      });
    }
  };

/// Like Post

export const likepost =
  ({ pos, auth, socket }) =>
  async (dispatch) => {
    console.log({ pos, auth, socket });
    const newPost = { ...pos, likes: [...pos.likes, auth.user] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchDataApi(`post/${pos._id}/like`, null, auth.token);
      socket.emit("likePost", newPost);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

/// Unlike Post

export const unlikepost =
  ({ pos, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...pos,
      likes: pos.likes.filter((like) => like._id !== auth.user._id),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchDataApi(`post/${pos._id}/unlike`, null, auth.token);
      socket.emit("unlikePost", newPost);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

/// Eliminar Post

export const deletePost =
  ({ pos, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: pos });
    try {
      await deleteDataApi(`post/${pos._id}`, auth.token);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
