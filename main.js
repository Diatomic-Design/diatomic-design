import './style.css';
import logo from '/logo-diatomic__icon--color.png';

document.querySelector('#app').innerHTML = `
  <div class="logo-container">
    <img src="${logo}" class="logo" alt="Logo" />
    <div class="logo-background"></div>
  </div>
`;

const logoElement = document.querySelector('.logo');
let isHovered = false;
let rotation = 0;
let velocity = 0;
let animationFrame;

const updateRotation = () => {
    velocity = Math.max(-10, Math.min(10, velocity));
    rotation += velocity;
    velocity *= 0.95; // friction
    if (!isHovered) {
        // Spring back to 0
        const springForce = -rotation * 0.02;
        velocity += springForce;
    }
    logoElement.style.transform = `rotate(${rotation}deg)`;
    animationFrame = requestAnimationFrame(updateRotation);
};

logoElement.addEventListener('mouseover', () => {
    isHovered = true;
    velocity += 3;
});

logoElement.addEventListener('mouseout', () => {
    isHovered = false;
});

animationFrame = requestAnimationFrame(updateRotation);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrame);
});
