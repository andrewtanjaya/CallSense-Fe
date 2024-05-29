import SentimentCard from "../SentimentCard/SentimentCard";
import "./OngoingCall.css";
import React from "react";

function OngoingCall() {
  return (
    <div className="ongoing-call-container">
      <SentimentCard sentiment="positive" name="AGENT-1" />
      <SentimentCard sentiment="negative" name="AGENT-2" />
      <SentimentCard sentiment="positive" name="AGENT-1" />
      <SentimentCard sentiment="netral" name="AGENT-2" />
      <SentimentCard sentiment="negative" name="AGENT-1" />
      <SentimentCard sentiment="netral" name="AGENT-1" />
    </div>
  );
}

export default OngoingCall;
