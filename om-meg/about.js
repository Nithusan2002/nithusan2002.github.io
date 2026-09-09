const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let currentLanguage = 'no';

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
});

document.addEventListener('click', (event) => {
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

function switchLanguage() {
    currentLanguage = currentLanguage === 'no' ? 'en' : 'no';
    document.querySelectorAll('[data-no][data-en]').forEach((element) => {
        element.textContent = element.getAttribute(`data-${currentLanguage}`);
    });
    document.querySelectorAll('#language-toggle, #mobile-language-toggle').forEach((button) => {
        button.textContent = currentLanguage === 'no' ? 'EN' : 'Norsk';
    });
    document.documentElement.lang = currentLanguage;
}

document.getElementById('language-toggle').addEventListener('click', switchLanguage);
document.getElementById('mobile-language-toggle').addEventListener('click', switchLanguage);

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
