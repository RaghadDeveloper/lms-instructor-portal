import { useEffect, useState } from "react";
import "./PdfFileInput.css";
import Button from "../Button/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../features/lessonsFiles/lessonsFilesThunk";

function PdfFileInput() {
  const dispatch = useDispatch();
  const { lessonId } = useParams();
  const { loading } = useSelector((state) => state.lessonFiles);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfData, setPdfData] = useState({
    lesson_id: lessonId,
    title: "",
    pdf_url: "",
  });

  const handlePdfUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPdfData({ ...pdfData, pdf_url: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setPdfFile(null);
    setPdfData({
      lesson_id: lessonId,
      title: "",
      pdf_url: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pdfUrl = pdfData.pdf_url;
    const data = new FormData();
    data.append("file", pdfUrl);
    data.append("upload_preset", "Learning_management_system");
    data.append("cloud_name", "dqtqpsg2m");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqtqpsg2m/auto/upload",
        data
      );
      if (!response.data.secure_url) {
        alert("Image upload failed");
        return;
      }
      pdfUrl = response.data.secure_url;
      console.log(pdfUrl);
    } catch (error) {
      alert("Image upload failed" + error);
      return;
    }

    const finlalPdfData = { ...pdfData, pdf_url: pdfUrl };
    const resultAction = await dispatch(uploadFile(finlalPdfData));

    if (uploadFile.fulfilled.match(resultAction)) {
      handleClear();
    }
  };

  useEffect(() => {
    if (pdfFile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [pdfFile]);

  return (
    <>
      <Button className="border pdf-file" onClick={() => setPdfFile(true)}>
        &#43; Add Pdf file
      </Button>
      {pdfFile && (
        <>
          <div className="overlay" onClick={handleClear} />
          <form className="upload-file" onSubmit={handleSubmit}>
            <h3>Upload pdf file</h3>
            <span onClick={handleClear}>&times;</span>
            <input
              type="text"
              placeholder="Title"
              value={pdfData.title}
              onChange={(e) =>
                setPdfData({ ...pdfData, title: e.target.value })
              }
              required
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              required
            />
            <Button type={"submit"} className={"primary"} disabled={loading}>
              Upload
            </Button>
          </form>
        </>
      )}
    </>
  );
}

export default PdfFileInput;
