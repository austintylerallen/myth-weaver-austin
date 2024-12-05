import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const app = {
      ctx,
      width: canvas.width,
      height: canvas.height,
      particles: [],
      grid: [],
    };

    const setup = () => {
      app.xC = app.width / 2;
      app.yC = app.height / 2;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animate);
    };

    setup();
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <canvas ref={canvasRef} className="background-canvas" />;
};

export default BackgroundAnimation;
