import "./Agent.css"
import React, { useEffect, useState } from "react";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';


function Agent() {
  const path = window.location.pathname;
  const [messages, setMessages] = useState(
    [{
      message: "Halo Ada yang bisa saya bantu?",
      direction: "incoming"
    }]);



  const onChangeMessage = (m) => {
    let temp = [...messages]
    temp.push({
      message: m
    })
    temp.push({
      message: "AI current not available",
      direction: "incoming"
    })
    // setMessages({messages : [...messages, {message: m}]})
    setMessages(temp)
  }

  return <div className="agent-container">
    <div className="call-member-container">
      <div className="caller-container">
        <p><b>{path.substring(1, path.length).toUpperCase()}</b></p>
        <audio src="http://localhost:8888/stream" id="caller-audio" controls />
        <input className="input-stream-url" type="text" name="" id="" disabled value="http://localhost:8888/stream" />
      </div>

      <div className="caller-container">
        <p><b>CUSTOMER</b></p>
        <audio src="http://localhost:8888/stream" id="receiver-audio" controls />
        <input className="input-stream-url" type="text" name="" id="" disabled value="http://localhost:8888/stream" />
      </div>
      <div className="end-call-button">
        <button>End Call</button>
      </div>
    </div>

    <div className="chat-box-container">

      <MainContainer>
        <ChatContainer>
          <MessageList typingIndicator={true ? <TypingIndicator content="Chat Bot Is Typing" /> : null}>
            {
              messages.map((m, idx) => <Message key={idx} model={m} />)
            }
            {/* <Message model={{
              direction: 'incoming',
              message: "Baca Sendiri"
            }} /> */}
          </MessageList>
          <MessageInput attachButton={false} placeholder="Type message here" onSend={onChangeMessage} />
        </ChatContainer>
      </MainContainer>
    </div>
  </div>;
}

export default Agent;
