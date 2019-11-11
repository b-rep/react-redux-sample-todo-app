import {
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  TOGGLE_EDIT_TODO_MODAL,
  EDIT_TODO,
  TOGGLE_TODO_COMPLETION,
  TOGGLE_NOTES_MODAL
} from '../actions/types';

const initialTodos = JSON.parse(window.localStorage.getItem('todos'));

const initialState = {
  todo: {},
  showEditTodoModal: false,
  showNotesModal: false,
  todos: initialTodos
};

export default (state = initialState, action) => {
  let {todos} = state;
  let index;

  switch (action.type) {
    case EDIT_TODO:
      index = todos.findIndex(i => i.id === action.payload.id);
      todos[index].description = action.payload.description;
      return {
        ...state,
        todo: {},
        showEditTodoModal: false,
        todos
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...todos, action.payload]
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case DELETE_TODO: 
      return {
        ...state,
        todos: todos.filter(todo => todo.id !== action.payload)
      }
    case TOGGLE_EDIT_TODO_MODAL: 
      return {
        ...state,
        showEditTodoModal: action.payload.bool,
        todo: action.payload.todo
      }
    case TOGGLE_TODO_COMPLETION:
      index = todos.findIndex(i => i.id === action.payload.id);
      todos[index].isCompleted = action.payload.isCompleted;
      return {
        ...state,
        todos
      }
    case TOGGLE_NOTES_MODAL:
      break;
    default:
      return state;    
  }
}