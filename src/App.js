import React from 'react';

import './style/App.css';
import './style/Todos.css';

import About from './components/About';
import Todos from './components/Todos';

import {Provider} from 'react-redux';
import store from './redux/stores/store';

const todos = [
  {
    description: "Go to the grocery store",
    id: "1a9d6acd-bcfd-4a2d-9b5a-ab8dfbbd4dbc",
    isCompleted: true,
    notes: [
      {
        id: "129d6ecd-bcf2-4a2f-9b5b-ab8dfbbd4dec",
        text: "Buy milk, eggs, and bread"
      }, {
        id: "122d6ecd-bc22-4adf-9b5b-ab8ffbbd4dec",
        text: "Do not spend over 10 dollars"
      }
    ]
  }
];
  
class App extends React.Component {
  componentDidMount() {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Todos/>
        </div>
      </Provider>
    );
  }
}

export default App;