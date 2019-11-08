import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {connect} from 'react-redux';
import {createTodo} from '../redux/actions/todoActions';
import uuidv4 from 'uuid/v4';

const initialValues = {description: ''};
//regex to assert we aren't adding a todo that is an empty string or only has spaces
const validRegex = /^\s*$/;

const isSubmissionValid = (value) => {
  return value === null || value.match(validRegex) !== null;
}

const handleSubmit = (props, resetForm, values) => {
  resetForm(initialValues);
  setTimeout(() => {
    const todo = {
      description: values.description,
      id: uuidv4(),
      isCompleted: false,
      notes: []
    };
    props.dispatch(createTodo(todo));
  }, 500);
}

const handleValidate = (values) => {
  const errors = {};
  if (isSubmissionValid(values.description)) {
    errors.description = "Description is required."
  }
  return errors;
}

const CreateTodoForm = (props) => (
  <>
    <h1>Add Todo</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={(values, {resetForm}) => handleSubmit(props, resetForm, values)}
      validate={handleValidate}
    >
      {({errors, touched}) => (
        <Form>
          <label htmlFor='description'>Description</label>
          <Field name="description" type="text" />
          {errors.description && touched.description ? (
            <div className="error">{errors.description}</div>
          ) : null}
          <button type="submit">Submit</button>
        </Form>    
      )}
    </Formik>
  </>
);

export default connect()(CreateTodoForm);