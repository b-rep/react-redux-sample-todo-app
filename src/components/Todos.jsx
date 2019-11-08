import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';

import '../style/Todos.css';

import CreateTodoForm from './CreateTodoForm';
import EditTodoForm from './EditTodoForm';

import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleEditTodoModal
} from '../redux/actions/todoActions';

class Todos extends React.Component {
  componentDidMount() {
    this.props.getTodos();
  }

  deleteTodo(id) {
    this.props.deleteTodo(id);
  }

  renderEditTodoModal(editTodo) {
    return (
      <Popup
        closeOnEscape={false}
        closeOnDocumentClick={false}
        open={true}
      >
        <EditTodoForm
          editTodo={editTodo}
        />
      </Popup>
    );
  }

  openEditTodoModal(todo) {
    this.props.toggleEditTodoModal(true, todo);
  }

  toggleCompletion(isCompleted, id) {
    console.log(isCompleted);
    console.log(id);
  }

  render() {
    const {showEditTodoModal, editTodo, todos} = this.props.todos;
    const mappedTodos = todos.map(todo => 
      <li className="todos" key={todo.id}>
        <div className={todo.isCompleted ? "todo-complete" : 'todo-not-complete'}>
          {todo.description}
          <button key={`delete-todo-${todo.id}`} onClick={() => this.deleteTodo(todo.id)}>
            Delete
          </button>
          <button key={`edit-todo-${todo.id}`} onClick={() => this.openEditTodoModal(todo)}>
            Edit
          </button>
          {todo.isCompleted ? 
            <button 
              key={`mark-incomplete-${todo.id}`} 
              onClick={() => this.toggleCompletion(false, todo.id)}
            >
              Mark Incomplete
            </button> 
            : 
            <button 
              key={`mark-complete-${todo.id}`} 
              onClick={() => this.toggleCompletion(true, todo.id)}
            >
              Mark Complete
            </button>
          }
        </div>
      </li>
    );

    return(
      <>
        <div style = {{color: 'black'}}>
        </div>
        <CreateTodoForm/>
        <ul>
          {mappedTodos}
        </ul>
        
        {showEditTodoModal && this.renderEditTodoModal(editTodo)}
      </>
    );
  }
}

Todos.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = {
  createTodo,
  getTodos,
  deleteTodo,
  toggleEditTodoModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
