import { useEffect, useState } from "react";
import { askDocuments, getDocuments } from "../api/client";
import MessageBox from "../components/ui/MessageBox";
import Card from "../components/ui/Card";

const exampleQuestions = [
  "What is this document mainly about?",
  "Summarize the key ideas from my documents.",
  "What does the document say about authentication?",
  "Which parts mention databases or storage?",
];

function ChatPage() {
  const [question, setQuestion] = useState("");
  const [topK, setTopK] = useState(5);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState("");
  const [documentsError, setDocumentsError] = useState("");
  const [messages, setMessages] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!question.trim()) {
      setMessage("Please write a question first.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const data = await askDocuments(
        question,
        topK,
        selectedDocumentId || null
        );

        const newMessage = {
        id: Date.now(),
        question,
        answer: data.answer || "No answer was generated.",
        sources: data.sources || [],
        };

        setMessages((previousMessages) => [
        ...previousMessages,
        newMessage,
        ]);
    } catch (error) {
      setMessage(
        "Something went wrong while searching your documents. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadDocuments() {
        try {
        const data = await getDocuments();

        const processedDocuments = data.filter(
            (document) => document.processing_status === "processed"
        );

        setDocuments(processedDocuments);
        } catch (error) {
        setDocumentsError("Could not load documents for chat.");
        }
    }

    loadDocuments();
    }, []);

  return (
    <section>
      <h1>Chat with your documents</h1>

      <p>
        Ask questions about the documents you have uploaded to your workspace.
      </p>

      <section
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <h2>Example questions</h2>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {exampleQuestions.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setQuestion(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </section>

        {documentsError && (
        <MessageBox type="error">
            {documentsError}
        </MessageBox>
        )}

        {messages.length > 0 && (
        <button
            type="button"
            onClick={() => setMessages([])}
            style={{ marginTop: "1rem" }}
        >
            Clear chat
        </button>
        )}

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <label>
          <strong>Your question</strong>
        </label>

        <br />

        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows="5"
          placeholder="Ask something about your uploaded documents..."
          style={{
            width: "100%",
            marginTop: "0.5rem",
            padding: "0.75rem",
            boxSizing: "border-box",
          }}
        />

        <p style={{ color: "#666", marginTop: "0.5rem" }}>
          The assistant will answer using only your uploaded and processed
          documents.
        </p>

        <label>
            <strong>Search scope</strong>
        </label>

        <br />

        <select
        value={selectedDocumentId}
        onChange={(event) => setSelectedDocumentId(event.target.value)}
        style={{ marginTop: "0.5rem", padding: "0.5rem" }}
        >
        <option value="">All documents</option>

        {documents.map((document) => (
            <option key={document.id} value={document.id}>
            {document.filename}
            </option>
        ))}
        </select>

        <p style={{ color: "#666", marginTop: "0.5rem" }}>
        Choose whether to search across all documents or only one document.
        </p>
        <label>
          <strong>Number of sources</strong>
        </label>

        <br />

        <select
          value={topK}
          onChange={(event) => setTopK(Number(event.target.value))}
          style={{ marginTop: "0.5rem", padding: "0.5rem" }}
        >
          <option value={3}>3 sources</option>
          <option value={5}>5 sources</option>
          <option value={8}>8 sources</option>
        </select>

        <br />
        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Ask"}
        </button>

        {isLoading && (
          <MessageBox type="info">
            Searching your documents and generating an answer...
          </MessageBox>
        )}
      </form>

      {messages.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
            <h2>Conversation</h2>

            <div style={{ display: "grid", gap: "1rem" }}>
            {messages.map((message) => (
                <Card key={message.id}>
                <p>
                    <strong>You:</strong>
                </p>

                <div
                    style={{
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.6",
                    }}
                >
                    {message.question}
                </div>

                <p style={{ marginTop: "1rem" }}>
                    <strong>Assistant:</strong>
                </p>

                <div
                    style={{
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.6",
                    }}
                >
                    {message.answer}
                </div>

                {message.sources.length === 0 && (
                    <MessageBox type="warning">
                    No sources were returned for this answer.
                    </MessageBox>
                )}

                {message.sources.length > 0 && (
                    <details style={{ marginTop: "1rem" }}>
                    <summary>
                        Sources used ({message.sources.length})
                    </summary>

                    <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                        {message.sources.map((source) => (
                        <li
                            key={source.chunk_id}
                            style={{
                            marginTop: "1rem",
                            padding: "1rem",
                            border: "1px solid #e5e5e5",
                            borderRadius: "8px",
                            backgroundColor: "#fafafa",
                            }}
                        >
                            <strong>{source.filename}</strong>

                            <p style={{ margin: "0.5rem 0", color: "#555" }}>
                            Chunk {source.chunk_index} · Score{" "}
                            {Number(source.score).toFixed(3)}
                            </p>

                            <p style={{ whiteSpace: "pre-wrap" }}>
                            {source.content.length > 500
                                ? `${source.content.slice(0, 500)}...`
                                : source.content}
                            </p>
                        </li>
                        ))}
                    </ul>
                    </details>
                )}
                </Card>
            ))}
            </div>
        </section>
        )}

      {selectedDocumentId ? (
            <MessageBox type="info">
                The assistant will search only within the selected document.
            </MessageBox>
            ) : (
            <MessageBox type="info">
                The assistant will search across all processed documents.
            </MessageBox>
        )}

      {message && <MessageBox type="error">{message}</MessageBox>}
    </section>
  );
}

export default ChatPage;