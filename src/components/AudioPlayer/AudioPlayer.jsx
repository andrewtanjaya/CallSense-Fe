import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import './AudioPlayer.css'
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';

const AudioPlayer = ({ audioUrl }) => {
    const waveformRef = useRef(null);
    const [waveSurfer, setWaveSurfer] = useState(null);

    useEffect(() => {
        if (waveformRef.current && !waveSurfer) {
            console.log('Initializing WaveSurfer...');
            const ws = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#ddd',
                progressColor: '#000000',
                hideScrollbar: true,
                minPxPerSec: 10,
                plugins: [TimelinePlugin.create()],
                autoScroll: true,
                autoCenter: true,
                barRadius: 30,
                barHeight: 2,
            });
            setWaveSurfer(ws);

            ws.on('ready', () => {
                console.log('WaveSurfer is ready');
            });

            ws.on('error', (e) => {
                console.error('WaveSurfer error:', e);
            });
            const wsRegions = ws.registerPlugin(RegionsPlugin.create())

            for (let timer = 0; timer < 540; timer = timer + 10) {
                let label = timer % 3 === 0 ? "Positive" : "Negative";
                let color = timer % 3 === 0 ? "rgb(75, 181, 67, 0.25)" : "rgb(237, 67, 55, 0.25)";
                ws.on('decode', () => {
                    wsRegions.addRegion({
                        start: timer,
                        end: timer + 10,
                        content: label,
                        color: color,
                        drag: false,
                        resize: false,
                    })
                })
            }
            ws.once('decode', () => {
                document.querySelector('input[type="range"]').oninput = (e) => {
                    const minPxPerSec = Number(e.target.value)
                    ws.zoom(minPxPerSec)
                }
            })
        }



        return () => {
            if (waveSurfer) {
                waveSurfer.destroy();
            }
        };
    }, [waveformRef, waveSurfer]);

    useEffect(() => {
        if (waveSurfer && audioUrl) {
            console.log('Loading audio:', audioUrl);
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
                    console.error('Failed to load audio file:', error);
                });
        }
    }, [waveSurfer, audioUrl]);

    const handlePlayPause = () => {
        if (waveSurfer) {
            waveSurfer.isPlaying() ? waveSurfer.pause() : waveSurfer.play();
        }
    };

    return (
        <div className='wave-container'>
            <div className='waveaudio-container' ref={waveformRef}></div>

            <div className='controls'>
                zoom<input type="range" name="zoom" id="" />
                <button onClick={handlePlayPause} className='button-play'>
                    Play / Pause
                </button>
            </div>
        </div>
    );
};

export default AudioPlayer;