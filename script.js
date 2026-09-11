// Mobile menu toggle
//
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-open');
    const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', String(!expanded));
});

function closeMobileMenu() {
    mobileMenu.classList.remove('mobile-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', (event) => {
    if (mobileMenu.classList.contains('mobile-open') && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

function showView(viewName, updateUrl = true) {
    const requested = document.querySelector(`[data-view="${viewName}"]`);
    const target = requested || document.querySelector('[data-view="hjem"]');
    const activeName = target.dataset.view;

    document.querySelectorAll('[data-view]').forEach(panel => {
        const isActive = panel === target;
        panel.classList.toggle('view-active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
    });

    document.querySelectorAll('[data-view-link]').forEach(link => {
        const isActive = link.dataset.viewLink === activeName;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });

    if (updateUrl) history.pushState(null, '', `#${activeName}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    closeMobileMenu();
}

document.querySelectorAll('[data-view-link]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        showView(link.dataset.viewLink);
    });
});

window.addEventListener('popstate', () => showView(location.hash.slice(1) || 'hjem', false));

// Language switching functionality
let currentLanguage = 'no';

const pageMetadata = {
    no: {
        title: 'Nithusan Krishnasamymudali | Backendutvikler',
        description: 'Jeg er backendutvikler med bachelor fra UiO. Her finner du prosjektene mine i Kotlin, Spring Boot, PostgreSQL, Swift og SwiftUI.',
        ogLocale: 'nb_NO',
        ogTitle: 'Nithusan Krishnasamymudali | Backendutvikler',
        ogDescription: 'Se prosjektene mine innen backend- og apputvikling.',
        ogImageAlt: 'Portrett av Nithusan Krishnasamymudali'
    },
    en: {
        title: 'Nithusan Krishnasamymudali | Backend Developer',
        description: 'I am a backend developer with a bachelor\'s degree from the University of Oslo. Explore my projects in Kotlin, Spring Boot, PostgreSQL, Swift and SwiftUI.',
        ogLocale: 'en_GB',
        ogTitle: 'Nithusan Krishnasamymudali | Backend Developer',
        ogDescription: 'Explore my backend and app development projects.',
        ogImageAlt: 'Portrait of Nithusan Krishnasamymudali'
    }
};

function updateMetadata() {
    const metadata = pageMetadata[currentLanguage];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', metadata.ogLocale);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.ogTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.ogDescription);
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', metadata.ogImageAlt);
}

function switchLanguage() {
    currentLanguage = currentLanguage === 'no' ? 'en' : 'no';

    // Update all elements with language data
    document.querySelectorAll('[data-no][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });

    ['aria-label', 'alt'].forEach(attribute => {
        document.querySelectorAll(`[data-no-${attribute}][data-en-${attribute}]`).forEach(element => {
            element.setAttribute(attribute, element.getAttribute(`data-${currentLanguage}-${attribute}`));
        });
    });

    // Update language toggle buttons
    const toggleButtons = document.querySelectorAll('#language-toggle');
    toggleButtons.forEach(button => {
        button.textContent = currentLanguage === 'no' ? 'English' : 'Norsk';
    });

    // Update document language
    document.documentElement.lang = currentLanguage;
    updateMetadata();

    if (activeProjectId) renderProjectModal(activeProjectId);
}

// Add event listeners to language toggle buttons
document.getElementById('language-toggle')?.addEventListener('click', switchLanguage);
showView(location.hash.slice(1) || 'hjem', false);

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// Hobby galleries on the About view. Clicking the left or right half of an
// image moves through the stack without adding visible arrow controls.
document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const slides = [...gallery.querySelectorAll('[data-slide]')];
    const count = gallery.querySelector('[data-gallery-count]');
    const dots = gallery.querySelector('.gallery-dots');
    let activeIndex = 0;

    slides.forEach(() => dots?.insertAdjacentHTML('beforeend', '<i></i>'));
    const indicators = dots ? [...dots.children] : [];

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });
        indicators.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeIndex));
        if (count) count.textContent = `${activeIndex + 1} / ${slides.length}`;
    }

    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showSlide(activeIndex - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => showSlide(activeIndex + 1));
    showSlide(0);
});

// Project modal functionality
const projectData = {
    webapp: {
        title: {
            no: "LiftOff",
            en: "LiftOff"
        },
        description: {
            no: "I IN2000 laget gruppen min LiftOff, en Android-app for å sjekke værforhold før en rakettoppskytning. Du velger sted og tidspunkt, og appen henter værdataene som er relevante for oppskytningen.",
            en: "For the IN2000 course, my group built LiftOff, an Android app for checking weather conditions before a rocket launch. You choose a place and time, and the app retrieves the weather data relevant to the launch."
        },
        features: {
            no: [
                "Visualiserer værdata relevant for rakettoppskytninger",
                "Søk, resultater, kart, oppskytningsvinduer og favoritter",
                "Lagre favorittsteder og oppskytningsvinduer",
                "Bygget med Jetpack Compose og Material 3",
                "Lokal lagring med Room"
            ],
            en: [
                "Visualizes weather data relevant for rocket launches",
                "Search, results, maps, launch windows and saved locations",
                "Save favourite locations and launch windows",
                "Built with Jetpack Compose and Material 3",
                "Local storage with Room"
            ]
        },
        technologies: [
            "Kotlin", "Jetpack Compose", "Navigation Compose", "Coil", "Room", "Ktor", "Retrofit",
            "Google Play Services Maps", "Coroutines", "Jetpack ViewModel", "Mockito",
            "Kotlin Serialization", "Material Design 3"
        ],
        challenges: {
            no: "Den vanskeligste delen var å hente værdata fra flere kilder og presentere dem på en måte som er lett å forstå. Vi bygget appen i Kotlin og brukte Jetpack Compose til grensesnittet.",
            en: "The hardest part was retrieving weather data from several sources and presenting it in a way that is easy to understand. We built the app in Kotlin and used Jetpack Compose for the interface."
        },
        outcome: {
            no: "Prosjektet ga meg erfaring med å utvikle en Android-app i gruppe, koble til eksterne API-er og lagre data lokalt.",
            en: "The project gave me experience developing an Android app in a team, connecting to external APIs and storing data locally."
        },
        screenshots: [
            "assets/RakettApp_SearchScreen.webp",
            "assets/RakettApp_Resultscreen.webp",
            "assets/RakettApp_Map.webp",
            "assets/RakettApp_LaunchWindows.webp"
        ],
        demoUrl: "https://github.com/Nithusan2002/LiftOff"
    },
            sporOkonomi: {
            title: {
                no: "Spor økonomi",
                en: "Spor økonomi"
            },
            description: {
                no: "Spor økonomi er en iOS-app jeg lager for å gjøre personlig økonomi enklere å følge. Målet er at du raskt skal kunne se hva du har igjen denne måneden, uten å måtte sette opp et komplisert budsjettsystem.",
                en: "Spor økonomi is an iOS app I am building to make personal finances easier to follow. The goal is to show you what you have left this month without making you set up a complicated budgeting system."
            },
            features: {
                no: [
                    "Budsjettplanlegging med inntekter og utgifter",
                    "Automatisk månedlig oppretting av faste poster",
                    "Investeringsoversikt med snapshots",
                    "Import og eksport av data",
                    "Kan brukes lokalt uten konto"
                ],
                en: [
                    "Budget planning with income and expenses",
                    "Automatic monthly creation of recurring expenses",
                    "Investment overview with snapshots",
                    "Import and export of data",
                    "Can be used locally without an account"
                ]
            },
            technologies: ["Swift", "SwiftUI", "SwiftData", "Supabase", "iOS"],
            challenges: {
                no: "Jeg ville at appen skulle fungere uten konto og internett. Derfor lagres data på telefonen med SwiftData, mens Supabase bare brukes av dem som velger å opprette konto.",
                en: "I wanted the app to work without an account or internet connection. Data is therefore stored on the phone with SwiftData, while Supabase is only used by people who choose to create an account."
            },
            outcome: {
                no: "Jeg jobber fortsatt med appen. Repoet har over 490 commits og mer enn 140 enhets- og UI-tester. Personvernside og vilkår er klare før publisering i App Store.",
                en: "I am still working on the app. The repository has 490+ commits and more than 140 unit and UI tests. The privacy policy and terms are ready ahead of an App Store release."
            },
            demoUrl: "https://github.com/Nithusan2002/spor-okonomi"
        },
        jobTracker: {
            title: {
                no: "JobTracker",
                en: "JobTracker"
            },
            description: {
                no: "Jeg laget JobTracker fordi jeg ville ha ett sted å holde oversikt over jobbsøknadene mine. Samtidig fikk jeg øvd på å bygge en backend med Kotlin, Spring Boot og PostgreSQL.",
                en: "I built JobTracker because I wanted one place to keep track of my job applications. It also gave me a chance to practise building a backend with Kotlin, Spring Boot and PostgreSQL."
            },
            features: {
                no: [
                    "Registrering av jobbsøknader med bedrift, stilling, dato, status, lenke og notater",
                    "Søk og filtrering på status",
                    "Redigering og sletting fra webgrensesnittet",
                    "REST-API med validering og tydelige 400/404-feilsvar",
                    "Dockerfile og Render-oppsett følger med i repoet"
                ],
                en: [
                    "Register applications with company, role, date, status, link, and notes",
                    "Search and status filtering",
                    "Edit and delete applications from the web interface",
                    "REST API with validation and clear 400/404 error responses",
                    "The repository includes a Dockerfile and Render setup"
                ]
            },
            technologies: ["Kotlin", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Gradle", "Docker", "HTML", "CSS", "JavaScript"],
            challenges: {
                no: "Jeg holdt prosjektet bevisst lite nok til at jeg kunne jobbe med hele flyten selv. Frontend sender forespørsler til REST-API-et, som validerer dataene og lagrer dem i PostgreSQL.",
                en: "I deliberately kept the project small enough to work on the entire flow myself. The frontend sends requests to the REST API, which validates the data and stores it in PostgreSQL."
            },
            outcome: {
                no: "Resultatet er en fungerende webapp med fem REST-endepunkter for å opprette, hente, endre og slette jobbsøknader. Koden og oppsettet ligger på GitHub.",
                en: "The result is a working web app with five REST endpoints for creating, retrieving, editing and deleting job applications. The code and setup are available on GitHub."
            },
            screenshots: ["assets/jobtracker-screenshot.webp"],
            screenshotLayout: "wide",
            demoUrl: "https://github.com/Nithusan2002/jobtracker-api"
        },
        };

        let lastFocusedElement = null;
        let activeProjectId = null;

        function renderProjectModal(projectId) {
            const project = projectData[projectId];
            const modalTitle = document.getElementById('modal-title');
            const modalContent = document.getElementById('modal-content');
            const demoLink = document.getElementById('modal-demo-link');
            
            const currentLang = currentLanguage;
            
            modalTitle.textContent = project.title[currentLang];
            demoLink.href = project.demoUrl;
            
        const techTitle = currentLang === 'no' ? 'Teknologier:' : 'Technologies:';
        const challengesTitle = currentLang === 'no' ? 'Slik løste jeg det' : 'How I approached it';
        const outcomeTitle = currentLang === 'no' ? 'Resultat:' : 'Outcome:';
        const screenshotsTitle = currentLang === 'no' ? 'Skjermbilder:' : 'Screenshots:';
        const screenshotsSection = project.screenshots?.length ? `
                <div class="modal-section">
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">${screenshotsTitle}</h3>
                    <div class="modal-shot-grid ${project.screenshotLayout === 'wide' ? 'wide' : ''}">
                        ${project.screenshots.map((imageUrl, index) => `
                            <figure class="modal-shot-card">
                                <img
                                    src="${imageUrl}"
                                    alt="${currentLang === 'no' ? `Skjermbilde ${index + 1} fra ${project.title[currentLang]}` : `Screenshot ${index + 1} from ${project.title[currentLang]}`}"
                                    class="modal-shot-image"
                                    loading="lazy"
                                >
                            </figure>
                        `).join('')}
                    </div>
                </div>
            ` : '';
        
        modalContent.innerHTML = `
                ${screenshotsSection}
                <div class="modal-section">
                    <h3>${currentLang === 'no' ? 'Dette laget jeg' : 'What I built'}</h3>
                    <p class="text-gray-600 leading-relaxed">${project.description[currentLang]}</p>
                </div>
                
                <div class="modal-section">
                    <h3>${techTitle}</h3>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>${challengesTitle}</h3>
                    <p class="text-gray-600 leading-relaxed">${project.challenges[currentLang]}</p>
                </div>
                
                <div class="modal-section">
                    <h3>${outcomeTitle}</h3>
                    <p class="text-gray-600 leading-relaxed">${project.outcome[currentLang]}</p>
                </div>
            `;
        }

        function openProjectModal(projectId) {
            const modal = document.getElementById('project-modal');
            activeProjectId = projectId;
            renderProjectModal(projectId);
            
            lastFocusedElement = document.activeElement;
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            modal.querySelector('.project-dialog').focus();
        }

        function closeProjectModal() {
            const modal = document.getElementById('project-modal');
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
            activeProjectId = null;
            lastFocusedElement?.focus();
        }

        // Close modal when clicking outside
        document.getElementById('project-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeProjectModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
                if (!document.getElementById('project-modal').classList.contains('hidden')) closeProjectModal();
            }

            if (e.key === 'Tab') {
                const modal = document.getElementById('project-modal');
                if (modal.classList.contains('hidden')) return;
                const focusable = [...modal.querySelectorAll('button, a[href]')];
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
