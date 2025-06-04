import React, { useState, useEffect } from "react";

const AudioPlayer = ({ audioFile, transcriptFile, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transcriptFile && showTranscript && !transcript) {
      setLoading(true);
      fetch(transcriptFile)
        .then(response => response.text())
        .then(text => {
          setTranscript(text);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error loading transcript:", error);
          setLoading(false);
        });
    }
  }, [transcriptFile, showTranscript, transcript]);

  const togglePlay = () => {
    const audio = document.getElementById(`audio-${title}`);
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mb-4">
      <audio id={`audio-${title}`} src={audioFile} onEnded={() => setIsPlaying(false)} />
      
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
        >
          {isPlaying ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              Play Audio
            </>
          )}
        </button>
        
        <span className="text-sm text-gray-600">{title}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;