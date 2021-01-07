import { FETCH_TODOS, NEW_TODO } from "./types";

export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: FETCH_TODOS, payload: posts.data });
};

export const newTodo = () => async (dispatch) => {
  dispatch({ type: NEW_TODO, payload: response.data });
};
