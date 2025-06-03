import React from 'react';

const AudioPlayer = ({ audioFile, title, transcript }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="bg-white rounded p-4">
        <audio controls className="w-full mb-2">
          <source src={audioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <details className="mt-2">
          <summary className="cursor-pointer text-indigo-600 hover:text-indigo-800">View Transcript</summary>
          <p className="mt-2 text-sm text-gray-600">{transcript}</p>
        </details>
      </div>
    </div>
  );
};

export default AudioPlayer;
