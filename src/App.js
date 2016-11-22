import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  getFormSyncErrors,
  reduxForm,
} from 'redux-form';

import logo from './logo.svg';

import './App.css';


function validate(values) {
  return {
    lastName: 'Stupid name',
  };
}

function mapStateToProps(state) {
  return {
    errors: getFormSyncErrors('App')(state),
  };
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      renderLastName: false,
    };
  }

  render() {
    const {
      errors,
    } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p>
          <input
            type="checkbox"
            checked={this.state.renderLastName}
            onChange={() => this.setState({ renderLastName: !this.state.renderLastName })}
          />
        </p>
        {_.size(errors) && (
          <div>
            {_.map(errors, (value, key) => <div key={key}>{key}: {value}</div>)}
          </div>
        )}
        <p>
          <Field name="firstName" component="input" type="text" />
        </p>
        {this.state.renderLastName && (
          <p>
            <Field name="lastName" component="input" type="text" />
          </p>
        )}
      </div>
    );
  }

}

App = reduxForm({
  form: 'App',
  initialValues: {
    firstName: 'Ruben',
    lastName: 'Grill',
  },
  validate,
})(App);

App = connect(mapStateToProps)(App);

export default App;
