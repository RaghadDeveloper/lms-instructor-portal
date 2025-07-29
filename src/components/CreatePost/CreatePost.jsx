import "./CreatePost.css";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/posts/postsSlice";
import { createPost } from "../../features/posts/postsThunk";

function CreatePost() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const { loading, error } = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    media_types: "",
    media_url: "",
  });

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
    }

    const resultAction = await dispatch(createPost(finalPostData));

    if (createPost.fulfilled.match(resultAction)) {
      setPostData({
        title: "",
        content: "",
        media_types: "",
        media_url: "",
      });
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <form
      className={`create-post ${loading ? "disabled" : ""}`}
      onSubmit={handleSubmit}
    >
      <h2>CreatePost</h2>
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

        <input
          type="file"
          accept="video/*, image/*"
          onChange={handleMediaChange}
          disabled={loading}
          ref={fileInputRef}
        />
        <Button type={"submit"} className={"primary"} disabled={loading}>
          Post
        </Button>
      </div>
    </form>
  );
}

export default CreatePost;
