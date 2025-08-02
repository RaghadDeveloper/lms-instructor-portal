import "./ProfileSetup.css";
import { IoIosCamera } from "react-icons/io";
import UploadImage from "../../components/UploadImage/UploadImage";
import TextInput from "../../components/TextInput/TextInput";
import FormBody from "../../components/FormBody/FormBody";
import FormLayout from "../../components/FormLayout/FormLayout";
import FormHeader from "../../components/FormHeader/FormHeader";
import Option from "../../components/Option/Option";
import Button from "../../components/Button/Button";
import profileImg from "./../../assets/images/profileImg.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  storeUserCategories,
} from "../../features/profile/profileThunks";
import { fetchCategories } from "../../features/categories/categoriesThunk";
import { useNavigate } from "react-router-dom";
import SquareLoader from "../../components/SquareLoader/SquareLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function ProfileSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category_ids, setUserCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const { status, categories } = useSelector((state) => state.categories);
  const { loading, error } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    avatar_url: "",
    birth_date: "",
    bio: "",
  });

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, avatar_url: file }));
    }
  };

  const addUserCategory = (category) => {
    setUserCategories((prev) => [...prev, category]);
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
    }

    const finalFormData = {
      ...formData,
      avatar_url: imageUrl,
    };

    try {
      const resultAction1 = await dispatch(createProfile(finalFormData));
      const resultAction2 = await dispatch(
        storeUserCategories({ category_ids })
      );

      if (
        createProfile.fulfilled.match(resultAction1) &&
        storeUserCategories.fulfilled.match(resultAction2)
      )
        navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || status === "loading" || isLoading) return <SquareLoader />;

  return (
    <FormLayout>
      <div className="profile-setup">
        <FormHeader title="Profile Setup" />
        <h2>Your Profile</h2>
        <FormBody onSubmit={handleSubmit}>
          <div className="row">
            <UploadImage
              image={profileImg}
              Icon={IoIosCamera}
              preview={preview}
              handleImageChange={handleImageChange}
              disabled={isLoading}
            />
            <div className="column">
              <TextInput
                id="headline"
                type="text"
                name={"bio"}
                label={"Headline"}
                value={formData.bio}
                onChange={handleChange}
                disabled={isLoading}
              />
              <div className="date-field">
                <label htmlFor="birth_date">Birth date</label>
                <input
                  id="birth_date"
                  type="date"
                  name="birth_date"
                  onChange={handleChange}
                />
              </div>
            </div>
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
          <div className="button-container">
            <Button type={"submit"} className={"primary"} disabled={isLoading}>
              Continue
            </Button>
          </div>
          {error && <ErrorMessage error={error} />}
        </FormBody>
      </div>
    </FormLayout>
  );
}

export default ProfileSetup;
