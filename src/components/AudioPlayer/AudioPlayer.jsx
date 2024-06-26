import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";
import "./AudioPlayer.css";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";

const AudioPlayer = ({ audioUrl, audioData }) => {
  const waveformRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);

  useEffect(() => {
    if (waveformRef.current && !waveSurfer) {
      console.log("Initializing WaveSurfer...");
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ddd",
        progressColor: "#000000",
        hideScrollbar: true,
        minPxPerSec: 10,
        plugins: [TimelinePlugin.create()],
        autoScroll: true,
        autoCenter: true,
        barRadius: 30,
        barHeight: 2,
      });
      setWaveSurfer(ws);

      ws.on("ready", () => {
        console.log("WaveSurfer is ready");
      });

      ws.on("error", (e) => {
        console.error("WaveSurfer error:", e);
      });
      const wsRegions = ws.registerPlugin(RegionsPlugin.create());

      for (let i = 0; i < audioData.details.length; i++) {
        let color =
          audioData.details[i].sentiment >= 30
            ? "rgb(75, 181, 67, 0.25)"
            : audioData.details[i].sentiment <= -30
            ? "rgb(237, 67, 55, 0.25)"
            : "rgb(238, 238, 238, 0.25)";
        let label =
          audioData.details[i].sentiment >= 30
            ? "Positive"
            : audioData.details[i].sentiment <= -30
            ? "Negative"
            : "Netral";
        ws.on("decode", () => {
          wsRegions.addRegion({
            start: audioData.details[i].started_at,
            end: audioData.details[i].ended_at,
            content: label,
            color: color,
            drag: false,
            resize: false,
          });
        });
      }

      ws.once("decode", () => {
        document.querySelector('input[type="range"]').oninput = (e) => {
          const minPxPerSec = Number(e.target.value);
          ws.zoom(minPxPerSec);
        };
      });
    }

    return () => {
      if (waveSurfer) {
        waveSurfer.destroy();
      }
    };
  }, [waveformRef, waveSurfer]);

  useEffect(() => {
    if (waveSurfer && audioUrl) {
      console.log("Loading audio:", audioUrl);
      fetch(audioUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          waveSurfer.load(url);
        })
        .catch((error) => {
          console.error("Failed to load audio file:", error);
        });
    }
  }, [waveSurfer, audioUrl]);

  const handlePlayPause = () => {
    if (waveSurfer) {
      waveSurfer.isPlaying() ? waveSurfer.pause() : waveSurfer.play();
    }
  };

  return (
    <div className="wave-container">
      <div className="waveaudio-container" ref={waveformRef}></div>

      <div className="controls">
        zoom
        <input type="range" name="zoom" id="" />
        <button onClick={handlePlayPause} className="button-play">
          Play / Pause
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
