import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">
            {text}
        </p>
        <p className="post-date">Posted on <Moment format="YYYY/MM/DD">{date}</Moment></p>
        {!auth.loading && user === auth.user._id && (
            <button
            onClick={() =>  deleteComment(postId, _id)}
            type="button"
            className="btn btn-danger"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment  })(CommentItem);
