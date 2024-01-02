import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../actions/blogActions";
import "../css/ViewPost.css";

const ViewPost = ({ posts, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id === parseInt(id, 10));

  const [likes, setLikes] = useState(
    parseInt(localStorage.getItem(`post_${id}_likes`) || "0", 10)
  );

  useEffect(() => {
    localStorage.setItem(`post_${id}_likes`, likes.toString());
  }, [id, likes]);

  const handleDeletePost = () => {
    deletePost(post.id);
    navigate("/");
  };

  if (!post) {
    return (
      <div>
        <h2>Post not found.</h2>
        <Link to="/">Back to Blog List</Link>
      </div>
    );
  }

  const handleLikePost = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="post-view-container">
      <div className="button-container">
        <Link id="back" className="back-button" to="/">
          Back to Blog List
        </Link>
        <Link className="edit-link" to={`/edit/${post.id}`}>
          Edit Post
        </Link>
        <div className="like-container">
          <button className="like-button" onClick={handleLikePost}>
            <span role="img" aria-label="Thumbs Up" className="like-icon">
              👍
            </span>{" "}
            Like
          </button>
          <p className="like-count">Likes: {likes}</p>
        </div>
        <button className="delete-button" onClick={handleDeletePost}>
          Delete Post
        </button>
      </div>
      <div className="content-container">
        <h2 className="post-title"> {post.title}</h2>
        <div className="table-contents">
          <div className="post-box">
            <p className="box-label">'Category'</p>&nbsp;
            <p className="box-content">{post.category}</p>
          </div>
          <div className="post-box">
            <p className="box-label">'Content'</p>&nbsp;
            <p className="box-content">{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.blog.posts,
});

export default connect(mapStateToProps, { deletePost })(ViewPost);
