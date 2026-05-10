import { useState } from "react";
import { askDocuments } from "../api/client";

function ChatPage() {
  const [question, setQuestion] = useState("");
  const [topK, setTopK] = useState(5);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!question.trim()) {
      setMessage("Please write a question first.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");
      setAnswer("");
      setSources([]);

      const data = await askDocuments(question, topK);

      setAnswer(data.answer || "No answer was generated.");
      setSources(data.sources || []);
    } catch (error) {
      setMessage(
        "Something went wrong while searching your documents. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <h1>Chat with your documents</h1>

      <p>
        Ask questions about the documents you have uploaded to your workspace.
      </p>

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
          placeholder="Example: What does this document say about authentication?"
          style={{
            width: "100%",
            marginTop: "0.5rem",
            padding: "0.75rem",
            boxSizing: "border-box",
          }}
        />

        <br />
        <br />

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
          <p style={{ marginTop: "1rem", color: "#666" }}>
            Searching your documents and generating an answer...
          </p>
        )}
      </form>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: "#b91c1c",
          }}
        >
          {message}
        </p>
      )}

      {answer && (
        <section
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "12px",
          }}
        >
          <h2>Answer</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
        </section>
      )}

      {sources.length > 0 && (
        <section
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "12px",
          }}
        >
          <h2>Sources</h2>

          <p style={{ color: "#666" }}>
            These are the document chunks used to generate the answer.
          </p>

          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
            {sources.map((source) => (
              <li
                key={source.chunk_id}
                style={{
                  marginBottom: "1rem",
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

                <p
                  style={{
                    whiteSpace: "pre-wrap",
                    marginTop: "0.5rem",
                  }}
                >
                  {source.content.length > 500
                    ? `${source.content.slice(0, 500)}...`
                    : source.content}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}

export default ChatPage;