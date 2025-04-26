// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');
const menuItems = document.querySelectorAll('.menu-nav a');
const particlesContainer = document.getElementById('particles-js');

// Toggle menu
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  menuOverlay.classList.toggle('active');
});

// Close menu when clicking on a menu item
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
  });
});

// Particles system
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 0.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
    this.color = this.getRandomColor();
    this.opacity = Math.random() * 0.5 + 0.2;
    this.velocityX = Math.random() * 0.4 - 0.2;
    this.velocityY = Math.random() * 0.4 - 0.2;
    this.shape = Math.random() > 0.8 ? 'shuriken' : 'circle';
    this.rotation = 0;
    this.rotationSpeed = Math.random() * 0.1 - 0.05;
  }

  getRandomColor() {
    const colors = [
      'rgba(255, 120, 0, 0.7)',  // Naruto Orange
      'rgba(10, 23, 78, 0.7)',   // Naruto Blue
      'rgba(255, 208, 70, 0.7)'  // Naruto Yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    
    if (this.shape === 'shuriken' && this.size > 2) {
      // Draw shuriken
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);
      
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      
      // Draw the cross shape
      this.ctx.fillRect(-this.size/2, -this.size/6, this.size, this.size/3);
      this.ctx.fillRect(-this.size/6, -this.size/2, this.size/3, this.size);
      
      this.ctx.fill();
    } else {
      // Draw circle
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
    
    this.ctx.restore();
  }

  update(mouse, lastMouse) {
    // Rotate shuriken
    if (this.shape === 'shuriken') {
      this.rotation += this.rotationSpeed;
    }
    
    // Move particles slightly
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Bounce off edges
    if (this.x < 0 || this.x > this.canvas.width) {
      this.velocityX *= -1;
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.velocityY *= -1;
    }

    // Mouse interaction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;
    const staticity = 50;
    const ease = 50;

    if (distance < maxDistance) {
      const force = -maxDistance / distance;
      const directionX = dx / distance;
      const directionY = dy / distance;
      const forceX = (directionX * force) / staticity;
      const forceY = (directionY * force) / staticity;

      this.x += forceX;
      this.y += forceY;
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / ease;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / ease;
      }
    }
  }
}

class ParticleSystem {
  constructor(containerId, quantity = 30) {
    this.container = document.getElementById(containerId);
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.quantity = quantity;
    this.mouse = { x: 0, y: 0 };
    this.lastMouse = { x: 0, y: 0 };
    this.mouseIsMoving = false;

    this.resizeCanvas();
    this.initParticles();
    this.setupEventListeners();
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.quantity; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());
    
    window.addEventListener('mousemove', (e) => {
      this.lastMouse.x = this.mouse.x;
      this.lastMouse.y = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouseIsMoving = true;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update(this.mouse, this.lastMouse);
      particle.draw();
    });
    
    this.mouseIsMoving = false;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem('particles-js', 70);
  
  // Add chakra energy animation
  animateChakraEnergy();
});

// Chakra energy animation
function animateChakraEnergy() {
  const headbandSymbol = document.querySelector('.headband-symbol');
  
  // Pulse animation for the symbol
  setInterval(() => {
    headbandSymbol.style.textShadow = '0 0 20px rgba(255, 120, 0, 0.9), 0 0 30px rgba(255, 120, 0, 0.7)';
    
    setTimeout(() => {
      headbandSymbol.style.textShadow = '0 0 10px rgba(255, 120, 0, 0.7)';
    }, 500);
  }, 2000);
  
  // Random chakra bursts
  setInterval(() => {
    createChakraBurst();
  }, 3000);
}

// Create chakra burst effect
function createChakraBurst() {
  const burst = document.createElement('div');
  burst.className = 'chakra-burst';
  
  // Random position
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  
  // Style the burst
  burst.style.position = 'absolute';
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  burst.style.width = '10px';
  burst.style.height = '10px';
  burst.style.borderRadius = '50%';
  burst.style.backgroundColor = 'rgba(255, 120, 0, 0.7)';
  burst.style.boxShadow = '0 0 20px 10px rgba(255, 120, 0, 0.3)';
  burst.style.zIndex = '1';
  burst.style.pointerEvents = 'none';
  
  // Add to body
  document.body.appendChild(burst);
  
  // Animate and remove
  let size = 10;
  let opacity = 0.7;
  
  const animate = setInterval(() => {
    size += 5;
    opacity -= 0.02;
    
    burst.style.width = `${size}px`;
    burst.style.height = `${size}px`;
    burst.style.marginLeft = `-${size/2}px`;
    burst.style.marginTop = `-${size/2}px`;
    burst.style.opacity = opacity;
    
    if (opacity <= 0) {
      clearInterval(animate);
      document.body.removeChild(burst);
    }
  }, 20);
}
