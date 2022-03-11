import * as postsActions from '../constants'
const actions = postsActions.default
const updateState = (oldState, newState) => {
  return {
    ...oldState,
    ...newState,
  }
}
const initialState = {
  postsList: [],
  singlePost: {},
  isLoading: false,
  isError: false,
}

const startFetching = (state, action) => {
  return updateState(state, {
    postsList: [],
    isLoading: true,
    isError: false,
  })
}

const fetchingSuccess = (state, action) => {
  return updateState(state, {
    isLoading: false,
    postsList: action.posts,
    isError: false,
  })
}

const fetchingFailed = (state, action) => {
  return updateState(state, {
    isLoading: false,
    postsList: [],
    isError: action.error,
  })
}

const getPostDetailsStart = (state, action) => {
  return updateState(state, {
    isLoading: true,
    singlePost: {},
    isError: false,
  })
}

const getPostDetailsSuccess = (state, action) => {
  const id = parseInt(action.id, 10)
  let post = action.posts.find((post) => post.id == id)
  return updateState(state, {
    isLoading: false,
    singlePost: post,
    isError: false,
  })
}
const getPostDetailsFailed = (state, action) => {
  return updateState(state, {
    isLoading: false,
    singlePost: {},
    isError: action.error,
  })
}

const deletePoststart = (state, action) => {
  return updateState(state, {
    isLoading: true,
    isError: false,
  })
}

const deletePostSuccess = (state, action) => {
  const posts = state.postsList.filter((post) => post.id !== action.id)
  return updateState(state, {
    isLoading: false,
    postsList: posts,
    isError: false,
  })
}
const deletePostFailed = (state, action) => {
  return updateState(state, {
    isLoading: false,
    isError: action.error,
  })
}

const updatePostStart = (state, action) => {
  return updateState(state, {
    isLoading: true,
    singlePost: {},
    isError: false,
  })
}

const updatePostSuccess = (state, action) => {
  let post = state.postsList.find((post) => post.id === action.payload.id)
  post.title = action.payload.title
  post.body = action.payload.body
  return updateState(state, {
    isLoading: false,
    singlePost: post,
    isError: false,
  })
}
const updatePostFailed = (state, action) => {
  return updateState(state, {
    isLoading: false,
    singlePost: {},
    isError: action.error,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.POSTS.LOAD:
      return startFetching(state, action)
    case actions.POSTS.LOAD_SUCCESS:
      return fetchingSuccess(state, action)
    case actions.POSTS.LOAD_FAILED:
      return fetchingFailed(state, action)
    case actions.POST_DETAILS.LOAD:
      return getPostDetailsStart(state, action)
    case actions.POST_DETAILS.LOAD_SUCCESS:
      return getPostDetailsSuccess(state, action)
    case actions.POST_DETAILS.LOAD_FAILED:
      return getPostDetailsFailed(state, action)
    case actions.POST_UPDATE.LOAD:
      return updatePostStart(state, action)
    case actions.POST_UPDATE.UPDATE_POST_SUCCESS:
      return updatePostSuccess(state, action)
    case actions.POST_UPDATE.UPDATE_POST_FAILED:
      return updatePostFailed(state, action)
    case actions.POST_DELETE.LOAD:
      return deletePoststart(state, action)
    case actions.POST_DELETE.DELETE_SUCCESS:
      return deletePostSuccess(state, action)
    case actions.POST_DELETE.DELETE_FAILED:
      return deletePostFailed(state, action)

    default:
      return state
  }
}

export default reducer
