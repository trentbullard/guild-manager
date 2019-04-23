import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAll } from "../../actions";

class EventList extends React.Component {
  componentDidMount() {
    this.props.fetchAll("event");
  }

  renderAdmin = event => {
    if (this.props.currentUser && this.props.currentUser.id) {
      return (
        <div className="right floated content">
          <Link to={`/events/edit/${event.id}`} className="button ui primary">
            Edit
          </Link>
          <Link
            to={`/events/delete/${event.id}`}
            className="button ui negative"
          >
            Delete
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
          <i className="large middle aligned icon address card outline" />
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
        <div style={{ textAlign: "right" }}>
          <Link to="/events/new" className="ui button positive">
            <i className="plus icon" /> Add Event
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Events</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: Object.values(state.events),
    currentUser: state.auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchAll }
)(EventList);
