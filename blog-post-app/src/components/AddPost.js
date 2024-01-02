import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addPost as addPostAction } from "../actions/blogActions";
import { useFormContext } from "../context/FormContext";
import "../css/AddPost.css";

const AddPost = ({ addPost }) => {
  const navigate = useNavigate();
  const { formState, updateFormState } = useFormContext();
  const [errors, setErrors] = useState({ title: "", category: "", content: "" });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (formState.title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (formState.category.trim() === "") {
      newErrors.category = "Category is required";
      valid = false;
    }

    if (formState.content.trim() === "") {
      newErrors.content = "Content is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddPost = () => {
    if (!validateForm()) {
      return; // Don't submit if the form is invalid
    }

    const newPost = {
      id: Date.now(),
      ...formState,
    };

    addPost(newPost);

    updateFormState({ title: "", category: "", content: "" });

    navigate("/");
  };

  return (
    <div className="add-post-container">
      <h2 className="add-post-title">Add a New Post</h2>
      <input
        type="text"
        className="input-field"
        placeholder="Enter post title"
        value={formState.title}
        onChange={(e) => {
          updateFormState({ title: e.target.value });
          setErrors({ ...errors, title: "" }); // Clear the error when user starts typing
        }}
      />
      {errors.title && <div className="error-message">{errors.title}</div>}
      <input
        type="text"
        className="input-field"
        placeholder="Enter post category"
        value={formState.category}
        onChange={(e) => {
          updateFormState({ category: e.target.value });
          setErrors({ ...errors, category: "" }); // Clear the error when user starts typing
        }}
      />
      {errors.category && <div className="error-message">{errors.category}</div>}
      <textarea
        className="textarea-field"
        placeholder="Enter post content"
        value={formState.content}
        onChange={(e) => {
          updateFormState({ content: e.target.value });
          setErrors({ ...errors, content: "" }); // Clear the error when user starts typing
        }}
      />
      {errors.content && <div className="error-message">{errors.content}</div>}
      <div className="button-container">
        <button className="add-button" onClick={handleAddPost}>
          Add Post
        </button>
        <Link to="/" className="cancel-link">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { addPost: addPostAction })(AddPost);
