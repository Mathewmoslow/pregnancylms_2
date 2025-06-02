import React, { useState, useRef } from "react";

const AudioPlayer = ({ audioFile, transcript, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="bg-indigo-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-indigo-700 mb-3">{title}</h3>
      <audio
        ref={audioRef}
        src={audioFile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={togglePlay}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
        <span className="text-sm text-gray-600">
          {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')} / 
          {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}
        </span>
      </div>
      {transcript && (
        <div>
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-indigo-600 hover:text-indigo-800 text-sm mb-2"
          >
            {showTranscript ? "Hide" : "Show"} Transcript
          </button>
          {showTranscript && (
            <div className="bg-white p-3 rounded border text-sm text-gray-700">
              {transcript}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
