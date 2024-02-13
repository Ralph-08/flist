import { useState } from "react";
import "./MessagePromptModal.scss";

const MessagePromptModal = ({ text }) => {
  const [promptTimer, setPromptTimer] = useState(true);

  setTimeout(() => setPromptTimer(false), 5000);

  return (
    <section className={`message ${!promptTimer ? "message--fade-out" : ""}`}>
      <section className="message__card">
        <section className="nessage__container">
          <h3 className="message__text">{text}</h3>
        </section>
        <div className="message__loader-line"></div>
      </section>
    </section>
  );
};

export default MessagePromptModal;
