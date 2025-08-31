import { useDispatch, useSelector } from "react-redux";
import "./FileCard.css";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFile } from "../../features/lessonsFiles/lessonsFilesThunk";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { TbTrash } from "react-icons/tb";

function FileCard({ file }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const { loading } = useSelector((state) => state.lessonFiles);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteFile(file.id));
    if (deleteFile.fulfilled.match(result))
      navigate(`/courses/${courseId}/lesson/${lessonId}`);
  };

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDeleteModal]);

  return (
    <>
      <div
        className="file-card"
        onClick={() =>
          navigate(`/courses/${courseId}/lesson/${lessonId}/pdf/${file.id}`, {
            state: { file },
          })
        }
      >
        <img src={file.image_pdf_url} alt="PDF preview" />
        <div className="file-details">
          <h4>{file.title}</h4>
          {/* <p>20 pages</p> */}
        </div>
        <div className="actions">
          <button onClick={handleDeleteClick}>
            <TbTrash />
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="delete-modal">
            <p>Are you sure you want to delete this file?</p>
            <Button
              className={"danger"}
              onClick={handleDelete}
              disabled={loading}
            >
              Yes
            </Button>
            <span onClick={() => setShowDeleteModal(false)}>&times;</span>
          </div>
        </>
      )}
    </>
  );
}

export default FileCard;
