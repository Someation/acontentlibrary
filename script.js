// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(245, 241, 235, 0.98)';
    } else {
        header.style.background = 'rgba(245, 241, 235, 0.95)';
    }
});

// Instagram Stories-style Video Player
document.addEventListener('DOMContentLoaded', function() {
    console.log('A Content Library website loaded successfully!');
    
    const videos = [
        { src: 'Media/Hunter Douglas_1.mov', username: 'Hunter Douglas' },
        { src: 'Media/HBIC.mp4', username: 'Head Bartender in Charge' },
        { src: 'Media/Hunter Douglas_2.mov', username: 'Hunter Douglas' }
    ];
    
    let currentVideoIndex = 0;
    const videoElement = document.getElementById('story-video');
    const usernameElement = document.getElementById('story-username');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function updateProgressBars() {
        progressBars.forEach((bar, index) => {
            bar.classList.remove('active', 'completed');
            // Remove any existing progress animation
            bar.style.animation = 'none';
            bar.style.width = '';
            
            if (index < currentVideoIndex) {
                bar.classList.add('completed');
                bar.style.width = '100%';
            } else if (index === currentVideoIndex) {
                bar.classList.add('active');
                bar.style.width = '0%';
            }
        });
    }
    
    function updateCurrentProgress(progress) {
        const currentBar = progressBars[currentVideoIndex];
        if (currentBar) {
            currentBar.style.width = `${progress}%`;
        }
    }
    
    function loadVideo(index) {
        if (videoElement && videos[index]) {
            console.log('Loading video:', videos[index].src, 'Username:', videos[index].username);
            
            // Update video source - need to update both source elements
            const sources = videoElement.querySelectorAll('source');
            sources.forEach(source => {
                source.src = videos[index].src;
            });
            
            // Alternative: set src directly on video element
            videoElement.src = videos[index].src;
            videoElement.load();
            
            // Update username
            if (usernameElement) {
                usernameElement.textContent = videos[index].username;
            }
            
            // Update progress bars
            updateProgressBars();
            
            // Play video
            videoElement.play().catch(e => console.log('Auto-play prevented:', e));
        }
    }
    
    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        loadVideo(currentVideoIndex);
    }
    
    // Initialize first video
    loadVideo(0);
    
    // Auto-advance when video ends
    if (videoElement) {
        videoElement.addEventListener('ended', () => {
            console.log('Video ended, advancing to next');
            nextVideo();
        });
        
        // Update progress bar as video plays
        videoElement.addEventListener('timeupdate', () => {
            if (videoElement.duration) {
                const progress = (videoElement.currentTime / videoElement.duration) * 100;
                updateCurrentProgress(progress);
            }
        });
        
        // Also advance after a set duration (in case video doesn't fire 'ended' event)
        let videoTimer;
        
        videoElement.addEventListener('loadedmetadata', () => {
            // Clear any existing timer
            if (videoTimer) clearTimeout(videoTimer);
            
            // Set timer for video duration + 1 second buffer
            const duration = videoElement.duration || 15;
            videoTimer = setTimeout(() => {
                console.log('Timer triggered, advancing to next video');
                nextVideo();
            }, (duration + 1) * 1000);
        });
        
        // Additional fallback: advance every 15 seconds regardless
        setInterval(() => {
            console.log('15-second fallback check');
            if (videoElement.ended || videoElement.paused) {
                nextVideo();
            }
        }, 15000);
    }
});

// Add subtle animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-item, .feature-item, .team-member').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
