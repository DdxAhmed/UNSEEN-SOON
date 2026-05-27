// ============================================
// UNSEEN STORE - Dynamic Animations & Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. Dynamic Particles Background ===
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random styles
        const size = Math.random() * 4 + 2; // 2px to 6px
        const xPos = Math.random() * 100; // 0% to 100%
        const yPos = Math.random() * 100; // 0% to 100%
        const opacity = Math.random() * 0.4 + 0.1; // 0.1 to 0.5
        const delay = Math.random() * 10; // 0s to 10s
        const duration = Math.random() * 15 + 10; // 10s to 25s

        // Apply styles to particle
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = '#c9a45c'; // gold tone
        particle.style.borderRadius = '50%';
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        particle.style.opacity = opacity;
        particle.style.boxShadow = '0 0 8px rgba(201, 164, 92, 0.6)';
        
        // Keyframe animation dynamically
        particle.style.animation = `floatUp ${duration}s linear infinite`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }

    // Inject float keyframe style dynamically
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100px) scale(0.8);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);


    // === 2. Premium Custom Cursor ===
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Ambient Background Glow Mouse Parallax
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        const glow1 = document.querySelector('.bg-glow-1');
        const glow2 = document.querySelector('.bg-glow-2');
        if (glow1) glow1.style.transform = `translate(${x * 60}px, ${y * 60}px) scale(1.05)`;
        if (glow2) glow2.style.transform = `translate(${x * -40}px, ${y * -40}px) scale(1.05)`;
    });

    // Lerp (Linear Interpolation) for smooth lagging effect
    function animateCursor() {
        // Smooth cursor border delay
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Tiny delay for the dot itself (very subtle)
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect class additions
    const interactables = document.querySelectorAll('a, button, input, .tilt-target');
    interactables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            document.body.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovered');
        });
    });


    // === 3. 3D Card Tilt Interaction ===
    const tiltTargets = document.querySelectorAll('.tilt-target');

    tiltTargets.forEach(target => {
        target.addEventListener('mousemove', (e) => {
            const rect = target.getBoundingClientRect();
            
            // Mouse coordinate relative to the element (from -1 to 1)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Rotate intensity (max 8 degrees)
            const rotateX = -y * 8;
            const rotateY = x * 8;

            target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Subtle offset glow positioning (if target has a card-glow overlay)
            const glow = target.querySelector('.card-glow');
            if (glow) {
                const glowX = (e.clientX - rect.left) / rect.width * 100;
                const glowY = (e.clientY - rect.top) / rect.height * 100;
                glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(201, 164, 92, 0.12) 0%, transparent 60%)`;
            }
        });

        target.addEventListener('mouseleave', () => {
            target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            const glow = target.querySelector('.card-glow');
            if (glow) {
                glow.style.background = 'transparent';
            }
        });
    });


    // === 4. Magnetic Micro-interactions ===
    const magneticItems = document.querySelectorAll('.magnetic-target');

    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Pull element slightly towards the mouse (max 12px)
            item.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        item.style.transition = 'transform 0.3s ease';

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0px, 0px)';
        });
    });


    // === 5. Interactive 3D Carousel Rotation ===
    const carouselScene = document.querySelector('.carousel-3d-scene');
    const carouselTrack = document.querySelector('.carousel-3d-track');
    
    if (carouselScene && carouselTrack) {
        carouselScene.addEventListener('mousemove', (e) => {
            const rect = carouselScene.getBoundingClientRect();
            // Calculate horizontal offset from center (-0.5 to 0.5)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            
            // Map offset to rotation angle (-120 to 120 degrees)
            const rotateYOffset = x * -240; 
            carouselTrack.style.transform = `rotateY(${rotateYOffset}deg)`;
        });

        carouselScene.addEventListener('mouseleave', () => {
            carouselTrack.style.transform = '';
        });
    }


    // === 6. Target Countdown Date Calculation ===
    // Target Launch Date: 3 Days from now (saved in localStorage so it doesn't reset on refresh)
    let targetDate = localStorage.getItem('unseen_launch_target');
    if (!targetDate) {
        targetDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
        localStorage.setItem('unseen_launch_target', targetDate);
    } else {
        targetDate = parseInt(targetDate);
    }

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(countdownInterval);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);
});

