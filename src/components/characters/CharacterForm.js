import React from "react";
import { Field, reduxForm } from "redux-form";

class CharacterForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="name" component={this.renderInput} label="Name" />
        <Field
          name="description"
          component={this.renderInput}
          label="2-3 Word Description"
        />
        <Field
          name="locationdata"
          component={this.renderInput}
          label="Server"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "You must enter a name";
  }
  if (!formValues.server) {
    errors.server = "You must enter a server";
  }

  return errors;
};

export default reduxForm({ form: "characterForm", validate })(CharacterForm);
