import { useState, useRef } from "react";
import { sendQuery, uploadAttachment } from "../services/api";
import BotAvatar from "./BotAvatar";
import Message from "./Message";
import "../styles/chat.css";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fileInputRef = useRef(null);

  function handleAttachClick() {
    fileInputRef.current.click();
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    setAttachment(file);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `📎 ${file.name}` }
    ]);
  }

  async function handleSend() {
    if (!input.trim() && !attachment) return;

    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: input }
      ]);
    }

    setInput("");
    setIsSpeaking(true);

    try {
      if (attachment) {
        await uploadAttachment({
          file: attachment,
          text: input
        });
      }

      const queryText =
        input || "Process the uploaded content and summarize it";

      const data = await sendQuery(queryText);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.answer }
      ]);

      setAttachment(null);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong while processing your request."
        }
      ]);
    } finally {
      setIsSpeaking(false);
    }
  }

  return (
    <div className="chat-container">
      <BotAvatar speaking={isSpeaking} />

      <div className="messages">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}
      </div>

      <div className="input-box">
        <span className="attach-icon" onClick={handleAttachClick}>
          📎
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.mp3,.wav"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something or upload a file..."
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
