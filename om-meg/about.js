const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let currentLanguage = 'no';

function closeMobileMenu() {
    mobileMenu.classList.remove('mobile-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-open');
    mobileMenuBtn.setAttribute('aria-expanded', String(mobileMenu.classList.contains('mobile-open')));
});

document.addEventListener('click', (event) => {
    if (mobileMenu.classList.contains('mobile-open') && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

function switchLanguage() {
    currentLanguage = currentLanguage === 'no' ? 'en' : 'no';
    document.querySelectorAll('[data-no][data-en]').forEach((element) => {
        element.textContent = element.getAttribute(`data-${currentLanguage}`);
    });
    document.querySelectorAll('#language-toggle').forEach((button) => {
        button.textContent = currentLanguage === 'no' ? 'English' : 'Norsk';
    });
    document.documentElement.lang = currentLanguage;
}

document.getElementById('language-toggle').addEventListener('click', switchLanguage);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const slides = [...gallery.querySelectorAll('[data-slide]')];
    const count = gallery.querySelector('[data-gallery-count]');
    const dots = gallery.querySelector('.gallery-dots');
    let activeIndex = 0;

    slides.forEach(() => dots.insertAdjacentHTML('beforeend', '<i></i>'));
    const indicators = [...dots.children];

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });
        indicators.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeIndex));
        count.textContent = `${activeIndex + 1} / ${slides.length}`;
    }

    gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => showSlide(activeIndex - 1));
    gallery.querySelector('[data-gallery-next]').addEventListener('click', () => showSlide(activeIndex + 1));
    showSlide(0);
});
