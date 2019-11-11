import {
  GET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  TOGGLE_EDIT_TODO_MODAL,
  EDIT_TODO,
  TOGGLE_TODO_COMPLETION,
  TOGGLE_NOTES_MODAL
} from './types';

export const getTodos = () => dispatch => {
  dispatch({
    type: GET_TODOS,
    payload: JSON.parse(window.localStorage.getItem('todos'))
  });
}

export const createTodo = todo => dispatch => {
  dispatch({
    type: CREATE_TODO,
    payload: todo
  });
}

export const deleteTodo = id => dispatch => {
  dispatch({
    type: DELETE_TODO,
    payload: id
  });
}

export const toggleEditTodoModal = (bool, todo) => dispatch => {
  dispatch({
    type: TOGGLE_EDIT_TODO_MODAL,
    payload: {bool, todo}
  });
}

export const editTodo = (id, description) => dispatch => {
  dispatch({
    type: EDIT_TODO,
    payload: {id, description}
  });
}

export const toggleTodoCompletion = (isCompleted, id) => dispatch => {
  dispatch({
    type: TOGGLE_TODO_COMPLETION,
    payload: {isCompleted, id}
  });
}

export const toggleNotesModal = (bool, todo) => dispatch => {
  dispatch({
    type: TOGGLE_NOTES_MODAL,
    payload: {bool, todo}
  });
}