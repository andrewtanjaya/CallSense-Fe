import { getOngoingCall } from "../../integration/ApiClient";
import SentimentCard from "../SentimentCard/SentimentCard";
import "./OngoingCall.css";
import React, { useEffect, useState } from "react";

function OngoingCall() {
  const [data, setData] = useState([]);

  function fetchOngoingCallData() {
    getOngoingCall()
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((error) =>
        console.error("Error fetching ongoing call data:", error)
      );
  }

  useEffect(() => {
    fetchOngoingCallData()
    setInterval(fetchOngoingCallData, 10000);
  }, []);

  return (
    <div className="ongoing-call-container">
      {data != null ? (
        data.map((d) => (
          <SentimentCard
            key={d.id}
            sentiment={
              d.latest_call_detail == null
                ? "netral"
                : d.latest_call_detail.sentiment == null
                ? "netral"
                : d.latest_call_detail.sentiment <= -0.3
                ? "negative"
                : d.latest_call_detail.sentiment >= 0.3
                ? "positive"
                : "netral"
            }
            name={d.agent_name}
          />
        ))
      ) : (
        <></>
      )}
      {/* <SentimentCard sentiment="positive" name="AGENT-1" />
      <SentimentCard sentiment="negative" name="AGENT-2" />
      <SentimentCard sentiment="positive" name="AGENT-1" />
      <SentimentCard sentiment="netral" name="AGENT-2" />
      <SentimentCard sentiment="negative" name="AGENT-1" />
      <SentimentCard sentiment="netral" name="AGENT-1" /> */}
    </div>
  );
}

export default OngoingCall;
