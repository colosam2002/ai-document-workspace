import { useState } from "react";
import { uploadDocument } from "../api/client";

function DocumentUploader({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      await uploadDocument(selectedFile);
      setMessage("Document uploaded successfully.");
      setSelectedFile(null);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      setMessage("Document upload failed.");
    }
  }

  return (
    <section
      style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <h2>Upload document</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => setSelectedFile(event.target.files[0])}
        />

        <br />
        <br />

        <button type="submit">Upload</button>
      </form>

      {selectedFile && <p>Selected: {selectedFile.name}</p>}
      {message && <p>{message}</p>}
    </section>
  );
}

export default DocumentUploader;