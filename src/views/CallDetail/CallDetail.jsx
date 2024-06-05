import "./CallDetail.css";
import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import { getCallDetail } from "../../integration/ApiClient";

function CallDetail() {
  const [data, setData] = useState({})
  const path = window.location.pathname;
  useEffect(() => {
    getCallDetail(path.substring(8, path.length)).then((data) => {
      console.log(data.data)
      setData(data.data)
    });
  }, []);

  return (
    <div className="detail-container">
     {data && data.details ?  <AudioPlayer audioData={data} audioUrl={data.url} /> : <></>}
    </div>
  );
}

export default CallDetail;
