import "./ProfileSetup.css";
import UploadProfileImage from "../../components/UploadProfileImage/UploadProfileImage";
import TextInput from "../../components/TextInput/TextInput";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Option from "../../components/Option/Option";
import Button from "../../components/Button/Button";
import profileImg from "./../../assets/images/profileImg.jpg";
import { IoIosCamera } from "react-icons/io";

const allSpecializations = [
  "Web Development",
  "Graphic Design",
  "Data Science",
  "Business Management",
  "Machine Learning",
  "Digital Marketing",
];

function ProfileSetup() {
  return (
    <AuthLayout>
      <div className="profile-setup">
        <AuthHeader title="Profile Setup" />
        <h2>Your Profile</h2>
        <AuthForm>
          <div className="row">
            <UploadProfileImage image={profileImg} Icon={IoIosCamera} />
            <div className="column">
              <TextInput id="user-name" type="text" label={"User Name"} />
              <TextInput id="headline" type="text" label={"Headline"} />
            </div>
          </div>

          <h2>Specialization</h2>
          <div className="row specialization">
            {allSpecializations.map((spec) => (
              <Option key={spec} text={spec} />
            ))}
          </div>
        </AuthForm>
        <div className="button-container">
          <Button type={"submit"} className={"primary"}>
            Continue
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ProfileSetup;
