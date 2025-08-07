import "./ScrollToTopButton.css";
import { IoMdArrowUp } from "react-icons/io";

function ScrollToTopButton() {
  return (
    <div
      className="scroll-to-top-btn"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <IoMdArrowUp />
    </div>
  );
}

export default ScrollToTopButton;
