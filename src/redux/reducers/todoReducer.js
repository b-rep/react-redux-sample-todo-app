import {
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  TOGGLE_EDIT_TODO_MODAL,
  EDIT_TODO,
  TOGGLE_TODO_COMPLETION
} from '../actions/types';

const initialTodos = JSON.parse(window.localStorage.getItem('todos'));

const initialState = {
  editTodo: {},
  showEditTodoModal: false,
  todos: initialTodos
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_TODO:
      let {todos} = state;
      const index = todos.findIndex(i => i.id === action.payload.id);
      todos[index].description = action.payload.description;
      return {
        ...state,
        editTodo: {},
        showEditTodoModal: false,
        todos
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case DELETE_TODO: 
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case TOGGLE_EDIT_TODO_MODAL: 
      return {
        ...state,
        showEditTodoModal: action.payload.bool,
        editTodo: action.payload.todo
      }
    case TOGGLE_TODO_COMPLETION: {
      let {todos} = state;
      const index = todos.findIndex(i => i.id === action.payload.id);
      console.log(index);
      break;
    }
    default:
      return state;    
  }
}