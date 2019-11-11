import React from 'react';
import {Formik, Form, Field} from 'formik';
import {connect} from 'react-redux';
import {editTodo, toggleEditTodoModal} from '../redux/actions/todoActions';

//regex to assert we aren't adding a todo that is an empty string or only has spaces
const validRegex = /^\s*$/;

const isSubmissionValid = (value) => {
  return value === null || value.match(validRegex) !== null;
}

class EditTodoForm extends React.Component {
  close() {
    this.props.dispatch(toggleEditTodoModal(false, {}));
  }

  handleSubmit(values, todo) {
    const {id} = todo;
    const {description} = values;
    this.props.dispatch(editTodo(id, description));
  }
  
  handleValidate(values) {
    const errors = {};
    if (isSubmissionValid(values.description)) {
      errors.description = "Description is required."
    }
    return errors;  
  }

  render() {
    const {todo} = this.props;
    const {description} = todo;
    const initialValues = {description};

    return (
      <>
        <h2>Edit Todo</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => this.handleSubmit(values, todo)}
          validate={this.handleValidate}
        >
          {({errors, touched}) => (
            <Form>
              <label htmlFor="description">Description</label>
              <Field name="description" type="text" />
              {errors.description && touched.description ? (
                <div className="error">{errors.description}</div>
              ) : null}
              <br />
              <button type="submit">
                Submit
              </button> 
              <button onClick={() => this.close()} type = "button">
                Close
              </button> 
            </Form>    
          )}
        </Formik>
      </>
    );
  }
}

export default connect()(EditTodoForm);