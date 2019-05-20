import React from "react";
import { connect } from "react-redux";
import { alert } from "../actions";

class Alert extends React.Component {
  renderAlerts = alerts => {
    return (
      <ul className="list">
        {alerts.map(a => {
          return <li key="a">{a.statusText}</li>;
        })}
      </ul>
    );
  };

  clickClose = () => {
    this.props.alert(null);
  };

  render() {
    if (this.props.alerts.length > 0) {
      return (
        <div className="ui error message">
          <i className="close icon" onClick={this.clickClose} />
          <div className="header">
            There were some errors with the last request
          </div>
          {this.renderAlerts(this.props.alerts)}
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    alerts: state.alerts
  };
};

export default connect(
  mapStateToProps,
  { alert }
)(Alert);
