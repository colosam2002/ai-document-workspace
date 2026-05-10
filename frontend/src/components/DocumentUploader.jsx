import { useState } from "react";
import { uploadDocument } from "../api/client";
import Card from "./ui/Card";
import MessageBox from "./ui/MessageBox";

function DocumentUploader({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      setIsUploading(true);
      setMessage("");

      await uploadDocument(selectedFile);

      setMessage("Document uploaded successfully.");
      setSelectedFile(null);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      setMessage("Document upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Card>
      <h2>Upload document</h2>

      <p style={{ color: "#666" }}>
        Upload a .txt or PDF file. The system will extract its text and prepare
        it for AI search.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => setSelectedFile(event.target.files[0])}
        />

        {selectedFile && (
          <p>
            Selected: <strong>{selectedFile.name}</strong>
          </p>
        )}

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && (
        <MessageBox type={message.includes("successfully") ? "success" : "error"}>
          {message}
        </MessageBox>
      )}
    </Card>
  );
}

export default DocumentUploader;