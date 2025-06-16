import React, { useEffect, useState } from 'react';

interface TextBoxProps {
  staticText: string;
  cueText?: string | null;
  speed?: number; // milliseconds per character
}

const TextBox: React.FC<TextBoxProps> = ({ staticText, cueText = null, speed = 40 }) => {
  const [index, setIndex] = useState(0);

  // Reset index when staticText changes
  useEffect(() => {
    setIndex(0);
  }, [staticText]);

  // Increment index over time to simulate typing
  useEffect(() => {
    if (!staticText) return;

    if (index >= staticText.length) return;

    const interval = setInterval(() => {
      setIndex((i) => {
        if (i >= staticText.length) {
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [index, staticText, speed]);

  return (
    <div className="textbox retro-text relative select-none" role="dialog" aria-live="polite">
      <pre>{staticText.slice(0, index)}</pre>

      {cueText && (
        <div className="absolute top-2 right-4 text-yellow-400 font-bold text-lg select-none pointer-events-none">
          {cueText}
        </div>
      )}
    </div>
  );
};

export default TextBox;
