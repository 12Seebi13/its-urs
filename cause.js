const music = document.getElementById('bg-music');
const musicToggleBtn = document.getElementById('music-toggle');
const musicOverlay = document.getElementById('music-overlay');
const musicOnBtn = document.getElementById('music-on');
const musicOffBtn = document.getElementById('music-off');

// Disable page interaction initially
document.body.style.overflow = 'hidden';

// MUSIC ON
musicOnBtn.addEventListener('click', () => {
    music.volume = 0.6;
    music.play().catch(() => {});
    sessionStorage.setItem('bgMusicPlaying', 'true');

    musicToggleBtn.textContent = '🔇 Pause Music';
    closeMusicOverlay();
});

// MUSIC OFF
musicOffBtn.addEventListener('click', () => {
    sessionStorage.setItem('bgMusicPlaying', 'false');
    musicToggleBtn.textContent = '🔊 Play Music';
    closeMusicOverlay();
});

function closeMusicOverlay() {
    gsap.to(musicOverlay, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
            musicOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

if (musicToggleBtn && music) {

    // Restore previous state
    if (sessionStorage.getItem('bgMusicPlaying') === 'true') {
        music.volume = 0.6;
        music.play().catch(() => {});
        musicToggleBtn.textContent = '🔇 Pause Music';
    }

    musicToggleBtn.addEventListener('click', () => {
        if (music.paused) {
            music.volume = 0.6;
            music.play().then(() => {
                sessionStorage.setItem('bgMusicPlaying', 'true');
                musicToggleBtn.textContent = '🔇 Pause Music';
            }).catch(() => {
                console.log("Autoplay blocked");
            });
        } else {
            music.pause();
            sessionStorage.setItem('bgMusicPlaying', 'false');
            musicToggleBtn.textContent = '🔊 Play Music';
        }

        // Button animation
        gsap.fromTo(musicToggleBtn,
            { scale: 0.9 },
            { scale: 1, duration: 0.2 }
        );
    });
}


// Reasons database
 const reasons = [
    { 
        text: "You’re such a kind and wonderful person, and ofc meri fav  I feel lucky to share such a good bond with you. 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "May your day be filled with love, laughter, and endless joy. 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "Wishing you success, happiness, and everything your heart desires. ✨ ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Stay the amazing girl you are—always spreading positivity around. Have the happiest year ahead! 🥳 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);