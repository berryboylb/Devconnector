import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { addLike, removeLike } from "../../actions/post";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comment, date },
  auth,
  addLike, removeLike
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to="/">
        <img className="round-img" src={avatar} alt="" />
        <h4>{name && name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
        <FontAwesomeIcon icon={faThumbsUp} />
        {likes.length > 0 && <span>{likes.length}</span>}
      </button>
      <button onClick={() => removeLike(_id)} type="button" className="btn btn-light">
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
      <Link to={`/post/${_id}`} className="btn btn-primary">
        Discussion{" "}
        {comment.length > 0 && (
          <span className="comment-count">{comment.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button type="button" className="btn btn-danger">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
