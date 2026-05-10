import { useState } from "react";
import { askDocuments } from "../api/client";
import MessageBox from "../components/ui/MessageBox";

const exampleQuestions = [
  "What is this document mainly about?",
  "Summarize the key ideas from my documents.",
  "What does the document say about authentication?",
  "Which parts mention databases or storage?",
];

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

      {message && <MessageBox type="error">{message}</MessageBox>}

      {answer && (
        <section
          style={{
            marginTop: "2rem",
            padding: "1.25rem",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "12px",
          }}
        >
          <h2>Answer</h2>

          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
            }}
          >
            {answer}
          </div>
        </section>
      )}

      {answer && sources.length === 0 && (
        <MessageBox type="warning">
          No sources were returned. The answer may indicate that there was not
          enough information in your documents.
        </MessageBox>
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
          <h2>Sources used</h2>

          <p style={{ color: "#666" }}>
            These are the chunks retrieved from your documents and used as
            context.
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
                  {source.content.length > 600
                    ? `${source.content.slice(0, 600)}...`
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