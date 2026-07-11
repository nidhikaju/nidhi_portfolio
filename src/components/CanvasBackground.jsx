import React, { useEffect, useRef } from 'react';

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let stars = [];
    let mouse = { x: null, y: null, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1; // 1px to 3px
        this.alpha = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
        this.twinkleSpeed = (Math.random() * 0.01) + 0.005;
        this.growing = Math.random() > 0.5;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.growing) {
          this.alpha += this.twinkleSpeed;
          if (this.alpha >= 0.8) this.growing = false;
        } else {
          this.alpha -= this.twinkleSpeed;
          if (this.alpha <= 0.2) this.growing = true;
        }
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 10;
        // Hacker Green / Cyan mix
        this.color = `hsla(${150 + Math.random() * 50}, 80%, 60%, ${Math.random() * 0.4 + 0.1})`;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * this.density * 0.5;
            this.y -= forceDirectionY * force * this.density * 0.5;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 15;
            }
          }
        }
      }
    }

    const init = () => {
      particles = [];
      stars = [];
      
      // Init Stars
      const numberOfStars = Math.min((canvas.width * canvas.height) / 3000, 400);
      for (let i = 0; i < numberOfStars; i++) {
        stars.push(new Star());
      }

      // Init Mesh Particles
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 8000, 200);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Draw Mesh
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 - (distance/100) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[#0a0a0f]" />;
};

export default CanvasBackground;
