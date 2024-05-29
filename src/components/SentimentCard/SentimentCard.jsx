import "./SentimentCard.css";
import React from "react";

function SentimentCard(props) {
  const { sentiment, name } = props;
  return (
    <div
      className={
        sentiment === "positive"
          ? "sentiment-card-container positive-sentiment-card"
          : sentiment === "negative"
          ? "sentiment-card-container negative-sentiment-card"
          : "sentiment-card-container netral-sentiment-card"
      }
    >
      <b>{name}</b>
    </div>
  );
}

export default SentimentCard;
