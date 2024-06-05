import "./Agent.css";
import React, { useEffect, useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { chat, endCall, startCall } from "../../integration/ApiClient";

function Agent() {
  const [isTyping, setIsTyping] = useState(false);
  const path = window.location.pathname;
  const customerStreamingUrl = process.env.REACT_APP_CUSTOMER_STREAMING_URL;
  const agentStreamingUrl = process.env.REACT_APP_AGENT_STREAMING_URL;

  const [messages, setMessages] = useState([
    {
      message: "Halo Ada yang bisa saya bantu?",
      direction: "incoming",
    },
  ]);

  const startAgentCall = () => {
    startCall(
      path.substring(1, path.length).toUpperCase(),
      customerStreamingUrl,
      agentStreamingUrl
    ).then((data) => {
      alert(data.message);
    });
  };

  const endAgentCall = () => {
    endCall(path.substring(1, path.length).toUpperCase()).then((data) => {
      alert("Call Ended");
    });
  };

  const onChangeMessage = (m) => {
    setIsTyping(true);
    let temp = [...messages];
    temp.push({
      message: m,
    });
    setMessages(temp);
    chat(m).then((data) => {
      temp.push({
        message: data.data.answer,
        direction: "incoming",
      });
      setMessages(temp);
      setIsTyping(false);
    });
  };

  return (
    <div className="agent-container">
      <div className="call-member-container">
        <div className="caller-container">
          <p>
            <b>{path.substring(1, path.length).toUpperCase()}</b>
          </p>
          <audio src={agentStreamingUrl} id="receiver-audio" controls />
          <input
            className="input-stream-url"
            type="text"
            name=""
            id=""
            disabled
            value={agentStreamingUrl}
          />
        </div>

        <div className="caller-container">
          <p>
            <b>CUSTOMER</b>
          </p>
          <audio src={customerStreamingUrl} id="caller-audio" controls />
          <input
            className="input-stream-url"
            type="text"
            name=""
            id=""
            disabled
            value={customerStreamingUrl}
          />
        </div>
        <div className="call-button">
          <div className="start-call-button">
            <button onClick={startAgentCall}>Start Call</button>
          </div>
          <div className="end-call-button">
            <button onClick={endAgentCall}>End Call</button>
          </div>
        </div>
      </div>

      <div className="chat-box-container">
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Chat Bot Is Typing.." />
                ) : null
              }
            >
              {messages.map((m, idx) => (
                <Message className={m.direction != null && m.direction === "incoming" ? "message-bubble left-align" : "message-bubble right-align"}  key={idx} model={m} />
              ))}
            </MessageList>
            <MessageInput
              attachButton={false}
              placeholder="Type message here"
              onSend={onChangeMessage}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Agent;
