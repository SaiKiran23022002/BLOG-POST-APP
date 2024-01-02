// src/components/EditPost.js
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../actions/blogActions";
import "../css/EditPost.css";

const EditPost = ({ posts, updatePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id === parseInt(id, 10));

  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [content, setContent] = useState(post.content);

  const handleEditPost = () => {
    const updatedPost = {
      ...post,
      title,
      category,
      content,
    };

    updatePost(updatedPost);
    navigate(`/view/${post.id}`);
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <div className="edit-inputs">
        <input
          type="text"
          placeholder="Edit post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Edit post category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          placeholder="Edit post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleEditPost}>Save Changes</button>
        <Link to="/" class="cancel-link">
          Cancel
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.blog.posts,
});

export default connect(mapStateToProps, { updatePost })(EditPost);
