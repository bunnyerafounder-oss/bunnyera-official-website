// 初始化所有功能
document.addEventListener('DOMContentLoaded', function () {
    setupHeroSlider();
    // 移除不必要的动画初始化，保持微软风格的简洁
    setupSmoothScrolling();

    // 添加載入動畫
    document.body.classList.add('loaded');
});

function setupHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');
    const pauseBtn = document.querySelector('.control-btn.pause');
    let current = 0;
    let autoSlideInterval;
    let isPaused = false;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        if (index >= slides.length) current = 0;
        else if (index < 0) current = slides.length - 1;
        else current = index;

        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    function nextSlide() {
        showSlide(current + 1);
    }

    function prevSlide() {
        showSlide(current - 1);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            if (isPaused) {
                clearInterval(autoSlideInterval);
                pauseBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'; // Play icon
            } else {
                startTimer();
                pauseBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'; // Pause icon
            }
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetTimer();
        });
    });

    function startTimer() {
        if (slides.length > 1 && !isPaused) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    }

    function resetTimer() {
        if (!isPaused) {
            clearInterval(autoSlideInterval);
            startTimer();
        }
    }

    startTimer();
}

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
