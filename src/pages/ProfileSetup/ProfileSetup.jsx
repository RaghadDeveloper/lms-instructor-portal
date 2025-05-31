import "./ProfileSetup.css";
import UploadProfileImage from "../../components/UploadProfileImage/UploadProfileImage";
import TextInput from "../../components/TextInput/TextInput";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Option from "../../components/Option/Option";
import Button from "../../components/Button/Button";

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
          <div className="d-flex justify-content-between align-items-center gap-5 mb-4">
            <UploadProfileImage />
            <div className="w-100 d-flex flex-column gap-3">
              <TextInput id="user-name" type="text" label={"User Name"} />
              <TextInput id="headline" type="text" label={"Headline"} />
            </div>
          </div>

          <h2>Specialization</h2>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            {allSpecializations.map((spec) => (
              <Option key={spec} text={spec} />
            ))}
          </div>
        </AuthForm>
        <div className="button-container">
          <Button>Continue</Button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ProfileSetup;
