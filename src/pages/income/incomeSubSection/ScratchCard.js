import React, { useRef, useEffect, useState } from 'react';

const ScratchCard = ({ width, height, imageSrc, onScratch, message }) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const [messageVisible, setMessageVisible] = useState(false);
  const [scratchedArea, setScratchedArea] = useState(0);

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    lastXRef.current = e.clientX - rect.left;
    lastYRef.current = e.clientY - rect.top;
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d');
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 30;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastXRef.current, lastYRef.current);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();

    lastXRef.current = x;
    lastYRef.current = y;

    // Update scratched area and check if the threshold is reached
    setScratchedArea(prev => {
      const newArea = prev + 1; // Increment for each move (you might want to calculate based on the actual area)
      if (newArea >= 100) { // Set a threshold for visibility
        setMessageVisible(true);
      }
      return newArea;
    });

    // Trigger onScratch callback if desired
    if (typeof onScratch === 'function') {
      onScratch();
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;
    
    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [imageSrc, width, height]);

  return (
    <div className='relative'>
      <canvas ref={canvasRef} width={width} height={height}  />
      {messageVisible && <div className="absolute top-12 left-5  !font-bold !text-blue-700" style={{ marginTop: '10px', fontSize: '20px', textAlign: 'center' }}>{message} </div>}
    </div>
  );
};

export default ScratchCard;
