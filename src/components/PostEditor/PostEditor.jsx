import "./PostEditor.css";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/posts/postsSlice";
import {
  createPost,
  getAllPosts,
  updatePost,
} from "../../features/posts/postsThunk";
import { MdOutlineDeleteSweep } from "react-icons/md";

function PostEditor({ editPost, setEditPost }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const { loading } = useSelector((state) => state.posts);
  const { profile } = useSelector((state) => state.profile);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    media_types: "",
    media_url: "",
  });

  useEffect(() => {
    if (editPost) {
      setPostData({
        ...editPost,
        media_types: editPost["App\\Enums\\media_types"],
        media_url: "",
      });
      setPreview(editPost.media_url);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [editPost]);

  const handleChange = (e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;

    let mediaType = "";
    if (fileType.startsWith("image/")) {
      mediaType = "image";
    } else if (fileType.startsWith("video/")) {
      mediaType = "video";
    }

    setPreview(URL.createObjectURL(file));
    setPostData((prev) => ({
      ...prev,
      media_types: mediaType,
      media_url: file,
    }));
  };

  const handleMediaDelete = () => {
    setPreview("");
    setPostData((prev) => ({
      ...prev,
      media_types: "",
      media_url: "",
    }));
    fileInputRef.current.value = "";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let mediaUrl = postData.media_url;
    dispatch(setLoading());
    if (postData.media_types === "image" || postData.media_types === "video") {
      const data = new FormData();
      data.append("file", postData.media_url);
      data.append("upload_preset", "Learning_management_system");
      data.append("cloud_name", "dqtqpsg2m");

      const cloudinaryUrl =
        postData.media_types === "image"
          ? "https://api.cloudinary.com/v1_1/dqtqpsg2m/image/upload"
          : "https://api.cloudinary.com/v1_1/dqtqpsg2m/video/upload";

      try {
        const response = await axios.post(cloudinaryUrl, data);
        if (!response.data.secure_url) {
          alert(`${postData.media_types} upload failed`);
          dispatch(setLoading());

          return;
        }
        mediaUrl = response.data.secure_url;
      } catch (error) {
        alert(`${postData.media_types} upload failed` + error);
        dispatch(setLoading());
        return;
      }
    }

    const finalPostData = {
      title: postData.title,
      content: postData.content,
    };

    if (postData.media_types && mediaUrl) {
      finalPostData.media_types = postData.media_types;
      finalPostData.media_url = mediaUrl;
    } else {
      finalPostData.media_types = "text";
    }

    let resultAction;

    if (editPost) {
      resultAction = await dispatch(
        updatePost({ ...finalPostData, post_id: editPost.id })
      );
    } else resultAction = await dispatch(createPost(finalPostData));

    if (
      createPost.fulfilled.match(resultAction) ||
      updatePost.fulfilled.match(resultAction)
    ) {
      setPostData({
        title: "",
        content: "",
        media_types: "",
        media_url: "",
      });
      setPreview("");
      setEditPost(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      dispatch(getAllPosts({ userId: profile.user_id, page: 1 }));
    }
  }

  // useEffect(() => {
  //   if (error) alert(error);
  // }, [error]);

  return (
    <form
      className={`post-editor ${loading ? "disabled" : ""}`}
      onSubmit={handleSubmit}
    >
      <h2>{editPost ? "Update Post" : "Create Post"}</h2>
      <div className="card">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={postData.title}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <textarea
          name="content"
          placeholder="Post Content"
          value={postData.content}
          onChange={handleChange}
          required
          disabled={loading}
        />

        {postData.media_types === "image" && (
          <img src={preview} alt="uploaded" />
        )}
        {postData.media_types === "video" && <video src={preview} controls />}

        <div className="media-input">
          <input
            type="file"
            accept="video/*, image/*"
            onChange={handleMediaChange}
            disabled={loading}
            ref={fileInputRef}
          />
          <span className="delete-media" onClick={handleMediaDelete}>
            <MdOutlineDeleteSweep />
          </span>
        </div>
        <Button type={"submit"} className={"primary"} disabled={loading}>
          {editPost ? "Update" : "Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostEditor;
