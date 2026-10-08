class ImageSlider {
    constructor(selector) {
        this.slider = typeof selector === 'string' ? document.querySelector(selector) : selector;

        if (!this.slider) return;

        this.track = this.slider.querySelector('.slider-track');
        this.slides = Array.from(this.track.children);
        this.prevBtn = this.slider.querySelector('.prev');
        this.nextBtn = this.slider.querySelector('.next');
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        this.currentIndex = 0;
        this.autoSlide = null;
        this.themeColors = ['#ff7f50', '#6a5acd', '#32cd32', '#ff1493', '#00bcd4'];
        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateSliderPosition();
        this.startAutoSlide();
    }

    createDots() {
        this.slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to image ${index + 1}`);
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSliderPosition();
            });
            this.dotsContainer.appendChild(dot);
        });
    }

    updateTheme() {
        const color = this.themeColors[this.currentIndex % this.themeColors.length];
        document.body.style.background = `linear-gradient(135deg, ${color}, #111827)`;
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        const activeColor = this.themeColors[this.currentIndex % this.themeColors.length];

        dots.forEach((dot, index) => {
            const isActive = index === this.currentIndex;
            dot.classList.toggle('active', isActive);
            dot.style.backgroundColor = isActive ? activeColor : 'rgba(255,255,255,0.7)';
            dot.style.boxShadow = isActive ? `0 0 0 2px ${activeColor}` : 'none';
        });
    }

    updateSliderPosition() {
        const viewport = this.slider.querySelector('.slider-viewport');
        const offset = this.currentIndex * viewport.offsetWidth;
        this.track.style.transform = `translateX(-${offset}px)`;
        this.updateTheme();
        this.updateDots();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSliderPosition();
    }

    previousSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex -= 1;
        } else {
            this.currentIndex = this.slides.length - 1;
        }
        this.updateSliderPosition();
    }

    startAutoSlide() {
        this.autoSlide = setInterval(() => {
            this.nextSlide();
        }, 3000);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlide);
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    if (slider) {
        new ImageSlider('.slider');
    }
});