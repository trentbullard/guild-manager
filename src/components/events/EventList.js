import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EventList extends React.Component {
  renderAdmin = event => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return (
        <div className="right floated content">
          <Link
            to={`/events/delete/${event.id}`}
            className="button ui negative"
          >
            Abandon
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    return this.props.events.map(event => {
      return (
        <div className="item" key={event.id}>
          {this.renderAdmin(event)}
          <i className="large middle aligned icon calendar outline" />
          <div className="content">
            <Link to={`/events/${event.id}`} className="header">
              {event.name}
            </Link>
            <div className="description">{event.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate = () => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return (
        <Link to="/events/new" className="ui green label">
          <i className="plus icon" /> New
        </Link>
      );
    }
  };

  renderListHeader = () => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return "Upcoming Events";
    } else {
      return "Upcoming Events";
    }
  };

  render() {
    return (
      <div>
        <h3 className="ui header">
          {this.renderListHeader()}
          {/* {this.renderCreate()} */}
        </h3>
        {/* <div className="ui celled list">{this.renderList()}</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  null
)(EventList);
