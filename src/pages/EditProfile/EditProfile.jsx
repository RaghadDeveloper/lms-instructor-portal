import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "./../../assets/images/profileImg.jpg";
import { MdOutlineModeEdit } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import UploadImage from "../../components/UploadImage/UploadImage";
import TextInput from "../../components/TextInput/TextInput";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import {
  storeUserCategories,
  updateProfile,
} from "../../features/profile/profileThunks";
import { GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Option from "../../components/Option/Option";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const { profile, error, loading } = useSelector((state) => state.profile);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    avatar_url: profile?.avatar_url,
    birth_date: profile?.birth_date,
    bio: profile?.bio || "",
  });
  const [category_ids, setUserCategories] = useState([]);

  const addUserCategory = (category) => {
    setUserCategories((prev) => [...prev, category]);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, avatar_url: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.avatar_url;

    if (formData.avatar_url instanceof File) {
      const data = new FormData();
      data.append("file", formData.avatar_url);
      data.append("upload_preset", "Learning_management_system");
      data.append("cloud_name", "dqtqpsg2m");

      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dqtqpsg2m/image/upload",
          data
        );

        if (!response.data.secure_url) {
          alert("Image upload failed");
          return;
        }

        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Image upload failed");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
    const finalFormData = {
      ...formData,
      avatar_url: imageUrl,
    };

    try {
      let resultAction2;
      const resultAction1 = await dispatch(updateProfile(finalFormData));
      if (category_ids.length > 0) {
        resultAction2 = await dispatch(storeUserCategories({ category_ids }));
      }

      if (
        (updateProfile.fulfilled.match(resultAction1) &&
          category_ids.length > 0 &&
          storeUserCategories.fulfilled.match(resultAction2)) ||
        (updateProfile.fulfilled.match(resultAction1) &&
          category_ids.length === 0)
      )
        navigate("/profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-card edit">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <GrFormPrevious />
      </button>
      <h2>Edit your profile </h2>
      <form onSubmit={handleSubmit}>
        <div className={`profile-img ${isLoading ? "disable" : ""}`}>
          <UploadImage
            image={profile?.avatar_url || profileImg}
            Icon={MdOutlineModeEdit}
            preview={preview}
            handleImageChange={handleImageChange}
            disabled={loading || isLoading}
          />
        </div>
        <TextInput
          id="name"
          type="text"
          name={"username"}
          label={"User Name"}
          value={formData.username}
          onChange={handleChange}
          disabled={loading || isLoading}
        />
        <TextArea
          id="bio"
          type="text"
          name={"bio"}
          label={"Bio "}
          value={formData.bio}
          onChange={handleChange}
          disabled={loading || isLoading}
          required={false}
        />
        <div className="date-field">
          <label htmlFor="birth_date">Birth date</label>
          <input
            id="birth_date"
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            disabled={loading || isLoading}
          />
        </div>
        <h2>Specialization</h2>
        <div className="row specialization">
          {categories.map((category) => (
            <Option
              key={category.id}
              option={category}
              onSelect={addUserCategory}
            />
          ))}
        </div>
        <Button
          type={"submit"}
          className={"primary"}
          disabled={loading || isLoading}
        >
          Save Edit
        </Button>
        {error && <ErrorMessage error={error} />}
      </form>
    </div>
  );
}

export default EditProfile;
