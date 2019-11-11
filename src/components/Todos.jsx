import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';

import CreateTodoForm from './CreateTodoForm';
import EditTodoForm from './EditTodoForm';

import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleEditTodoModal,
  toggleNotesModal,
  toggleTodoCompletion
} from '../redux/actions/todoActions';

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showIncompleteTodos: true
    };
  }

  componentDidMount() {
    this.props.getTodos();
  }

  deleteTodo(evt, id) {
    evt.stopPropagation();
    this.props.deleteTodo(id);
  }

  openEditTodoModal(evt, todo) {
    evt.stopPropagation();
    this.props.toggleEditTodoModal(true, todo);
  }

  openNotesModal(todo) {
    this.props.toggleNotesModal(true, todo);
  }

  renderEditTodoModal(todo) {
    return (
      <Popup
        closeOnEscape={false}
        closeOnDocumentClick={false}
        open={true}
      >
        <EditTodoForm
          todo={todo}
        />
      </Popup>
    );
  }

  toggleCompletion(evt, isCompleted, id) {
    evt.stopPropagation();
    this.props.toggleTodoCompletion(isCompleted, id);
  }

  toggleVisibleTodos() {
    this.setState({
      showIncompleteTodos: !this.state.showIncompleteTodos
    });
  }

  render() {
    const {showIncompleteTodos} = this.state;
    const {
      todo,
      showEditTodoModal,
      todos
    } = this.props.todos;

    const toggleLabel = showIncompleteTodos ? "Hide Incomplete Todos" : "Show Incomplete Todos";
    const filteredTodos = showIncompleteTodos ? todos : todos.filter(i => i.isCompleted);
    const hasIncompleteTodos = Boolean(todos.filter(i => !i.isCompleted).length);

    const mappedTodos = filteredTodos.map(todo => 
      <li
        className="todos"
        key={todo.id}
        onClick={() => this.openNotesModal(todo)}
      >
        <div className={todo.isCompleted ? "todo-complete" : 'todo-not-complete'}>
          {`${todo.description.slice(0, 40).trim()}…`}
          <div style = {{margin: '0 auto', width: '50%'}}>
            <button
              key={`delete-todo-${todo.id}`} 
              onClick={(evt) => this.deleteTodo(evt, todo.id)}
            >
              Delete
            </button>
            <button
              key={`edit-todo-${todo.id}`} 
              onClick={(evt) => this.openEditTodoModal(evt, todo)}
            >
              Edit
            </button>
            {todo.isCompleted ? 
              <button 
                key={`mark-incomplete-${todo.id}`} 
                onClick={(evt) => this.toggleCompletion(evt, false, todo.id)}
              >
                Mark Incomplete
              </button> 
              : 
              <button 
                key={`mark-complete-${todo.id}`} 
                onClick={(evt) => this.toggleCompletion(evt, true, todo.id)}
              >
                Mark Complete
              </button>
            }
          </div>
        </div>
      </li>
    );

    return(
      <>
        <div style = {{width: '475px'}}>
          <CreateTodoForm/>
          <ul>
            {mappedTodos}
          </ul>
        </div>
        {hasIncompleteTodos ? 
          <button
            onClick={() => this.toggleVisibleTodos()}
          >
            {toggleLabel}
          </button>
          : null
        }
        {showEditTodoModal && this.renderEditTodoModal(todo)}
      </>
    );
  }
}

Todos.propTypes = {
  createTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  getTodos: PropTypes.func.isRequired,
  todos: PropTypes.object.isRequired,
  toggleEditTodoModal: PropTypes.func.isRequired,
  toggleNotesModal: PropTypes.func.isRequired,
  toggleTodoCompletion: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = {
  createTodo,
  getTodos,
  deleteTodo,
  toggleEditTodoModal,
  toggleNotesModal,
  toggleTodoCompletion
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
