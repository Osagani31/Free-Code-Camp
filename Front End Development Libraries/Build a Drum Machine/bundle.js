import React, { useState, useEffect } from "https://esm.sh/react";
import './App.css';

const App = () => {
  const [displayText, setDisplayText] = useState('');
  
  const drumPads = [
    {
      id: 'Heater-1',
      key: 'Q',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      id: 'Heater-2',
      key: 'W',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      id: 'Heater-3',
      key: 'E',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      id: 'Heater-4',
      key: 'A',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      id: 'Clap',
      key: 'S',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      id: 'Open-HH',
      key: 'D',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      id: 'Kick-n\'-Hat',
      key: 'Z',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      id: 'Kick',
      key: 'X',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      id: 'Closed-HH',
      key: 'C',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

  const playSound = (key, id) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    setDisplayText(id);
  };

  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    const pad = drumPads.find(pad => pad.key === key);
    if (pad) {
      playSound(pad.key, pad.id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine" className="drum-machine">
      <div id="display" className="display">
        {displayText || 'Drum Machine'}
      </div>
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <div
            key={pad.key}
            id={pad.id}
            className="drum-pad"
            onClick={() => playSound(pad.key, pad.id)}
          >
            {pad.key}
            <audio
              id={pad.key}
              className="clip"
              src={pad.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;