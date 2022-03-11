import axios from "axios";
import * as postsActions from "../constants";

const startFetching = () => {
	return {
		type: postsActions.default.POSTS.LOAD,
	};
};

const fetchingSuccess = (posts) => {
	return {
		type: postsActions.default.POSTS.LOAD_SUCCESS,
		posts: posts,
	};
};
const fetchingFailed = (error) => {
	return {
		type: postsActions.default.POSTS.LOAD_FAILED,
		error: error,
	};
};

const getPostDetailsStart = () => {
	return {
		type: postsActions.default.POST_DETAILS.LOAD,
	};
};

const getPostDetailsSuccess = (id, posts) => {
	return {
		type: postsActions.default.POST_DETAILS.LOAD_SUCCESS,
		id,
		posts,
	};
};
const getPostDetailsFailed = (error) => {
	return {
		type: postsActions.default.POST_DETAILS.LOAD_FAILED,
		error: error,
	};
};

const deletePostsStart = () => {
	return {
		type: postsActions.default.POST_DELETE.LOAD,
	};
};

const deletePostsSuccess = (id) => {
	return {
		type: postsActions.default.POST_DELETE.DELETE_SUCCESS,
		id,
	};
};
const deletePostsFailed = (error) => {
	return {
		type: postsActions.default.POST_DELETE.DELETE_FAILED,
		error: error,
	};
};

const updatePostStart = () => {
	return {
		type: postsActions.default.POST_UPDATE.LOAD,
	};
};

const updatePostSuccess = (id, title, body) => {
	return {
		type: postsActions.default.POST_UPDATE
			.UPDATE_POST_SUCCESS,
		payload: {
			id: id,
			title: title,
			body: body,
		},
	};
};
const updatePostFailed = (error) => {
	return {
		type: postsActions.default.POST_UPDATE
			.UPDATE_POST_FAILED,
		error: error,
	};
};

export const requestPosts = () => async (dispatch) => {
	dispatch(startFetching());
	try {
		// const json = await axios.get("../../data.json"); // Static JSON
		const json = await axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		);
		dispatch(fetchingSuccess(json.data));
	} catch (e) {
		dispatch(fetchingFailed(e));
	}
};

export const requestPostDetails =
	(id, posts) => async (dispatch) => {
		dispatch(getPostDetailsStart());

		try {
			if (!posts.length > 0) {
				// const json = await axios.get("../../data.json"); // Static JSON
				const json = await axios.get(
					"https://jsonplaceholder.typicode.com/posts"
				);
				const posts = json.data;
				dispatch(getPostDetailsSuccess(id, posts));
			} else {
				dispatch(getPostDetailsSuccess(id, posts));
			}
		} catch (e) {
			dispatch(getPostDetailsFailed(e));
		}
	};

export const deletePost = (id) => async (dispatch) => {
	dispatch(deletePostsStart());
	try {
		dispatch(deletePostsSuccess(id));
	} catch (e) {
		dispatch(deletePostsFailed(e));
	}
};

export const updatePostData =
	(id, title, body) => async (dispatch) => {
		dispatch(updatePostStart());
		try {
			dispatch(updatePostSuccess(id, title, body));
		} catch (e) {
			dispatch(updatePostFailed(e));
		}
	};
