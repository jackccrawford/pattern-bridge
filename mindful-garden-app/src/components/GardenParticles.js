import React, { useEffect, useRef, useCallback } from 'react';

const GardenParticles = ({ emotionalState = 'peaceful' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Get particle config based on emotional state
  const getParticleConfig = useCallback((state) => {
    const configs = {
      peaceful: {
        count: 50,
        speedMultiplier: 0.5,
        sizeMultiplier: 1,
        opacity: { min: 0.2, max: 0.7 },
        leafRatio: 0.5
      },
      anxious: {
        count: 80,
        speedMultiplier: 1.2,
        sizeMultiplier: 0.8,
        opacity: { min: 0.1, max: 0.5 },
        leafRatio: 0.3
      },
      reflective: {
        count: 40,
        speedMultiplier: 0.7,
        sizeMultiplier: 1.2,
        opacity: { min: 0.3, max: 0.8 },
        leafRatio: 0.6
      },
      overwhelmed: {
        count: 30,
        speedMultiplier: 0.4,
        sizeMultiplier: 1.5,
        opacity: { min: 0.2, max: 0.6 },
        leafRatio: 0.7
      },
      hopeful: {
        count: 60,
        speedMultiplier: 0.8,
        sizeMultiplier: 1.1,
        opacity: { min: 0.3, max: 0.9 },
        leafRatio: 0.5
      },
      uncertain: {
        count: 45,
        speedMultiplier: 0.6,
        sizeMultiplier: 0.9,
        opacity: { min: 0.15, max: 0.5 },
        leafRatio: 0.4
      },
      grateful: {
        count: 55,
        speedMultiplier: 0.7,
        sizeMultiplier: 1.2,
        opacity: { min: 0.25, max: 0.8 },
        leafRatio: 0.8
      },
      processing: {
        count: 35,
        speedMultiplier: 0.9,
        sizeMultiplier: 1,
        opacity: { min: 0.2, max: 0.7 },
        leafRatio: 0.5
      }
    };
    return configs[state] || configs.peaceful;
  }, []);

  // Create particle factory with emotional state configuration
  const createParticle = useCallback((canvas, config) => {
    const isLeaf = Math.random() < config.leafRatio;
    return {
      canvas,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: (Math.random() * 3 + 1) * config.sizeMultiplier,
      speedX: (Math.random() * 0.5 - 0.25) * config.speedMultiplier,
      speedY: (Math.random() * 0.5 - 0.25) * config.speedMultiplier,
      opacity: Math.random() * (config.opacity.max - config.opacity.min) + config.opacity.min,
      type: isLeaf ? 'leaf' : 'light',
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() * 0.02 - 0.01) * config.speedMultiplier,

      reset(newConfig) {
        const isLeaf = Math.random() < newConfig.leafRatio;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = (Math.random() * 3 + 1) * newConfig.sizeMultiplier;
        this.speedX = (Math.random() * 0.5 - 0.25) * newConfig.speedMultiplier;
        this.speedY = (Math.random() * 0.5 - 0.25) * newConfig.speedMultiplier;
        this.opacity = Math.random() * (newConfig.opacity.max - newConfig.opacity.min) + newConfig.opacity.min;
        this.type = isLeaf ? 'leaf' : 'light';
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.02 - 0.01) * newConfig.speedMultiplier;
      },

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.rotationSpeed;

        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;

        if (this.type === 'light') {
          this.opacity += Math.random() * 0.02 - 0.01;
          this.opacity = Math.max(config.opacity.min, Math.min(config.opacity.max, this.opacity));
        }
      },

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        if (this.type === 'leaf') {
          ctx.beginPath();
          ctx.fillStyle = '#4CAF50';
          ctx.ellipse(
            0, 
            0, 
            this.size * 2, 
            this.size, 
            0, 
            0, 
            Math.PI * 2
          );
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.fillStyle = '#FFF9C4';
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    };
  }, []);

  // Since Particle is a class and doesn't change during component lifecycle,
  // we can safely disable the exhaustive-deps rule
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let currentConfig = getParticleConfig(emotionalState);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      handleResize();
      particlesRef.current = Array(currentConfig.count)
        .fill()
        .map(() => createParticle(canvas, currentConfig));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [emotionalState, createParticle, getParticleConfig]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default GardenParticles;
