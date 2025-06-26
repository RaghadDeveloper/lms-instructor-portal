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
    <FormLayout>
      <div className="profile-setup">
        <FormHeader title="Profile Setup" />
        <h2>Your Profile</h2>
        <FormBody>
          <div className="row">
            <UploadImage image={profileImg} Icon={IoIosCamera} />
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
        </FormBody>
        <div className="button-container">
          <Button type={"submit"} className={"primary"}>
            Continue
          </Button>
        </div>
      </div>
    </FormLayout>
  );
}

export default ProfileSetup;
