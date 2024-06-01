import "./CallDetail.css"
import React, { useEffect, useRef } from 'react'
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";

function CallDetail() {
    const audioUrl = 'https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/sample-call.mp3?alt=media&token=468e1b49-5ea8-453d-8164-265dfadc9410';

    return (
        <div className="detail-container">
      <AudioPlayer audioUrl={audioUrl} />
    </div>
    )
}

export default CallDetail