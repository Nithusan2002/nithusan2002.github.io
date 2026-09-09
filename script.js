// Mobile menu toggle
//
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', String(!expanded));
});

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', (event) => {
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const topPosition = target.offsetTop - navHeight + 10;

            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// Language switching functionality
let currentLanguage = 'no';

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

    // Update language toggle buttons
    const toggleButtons = document.querySelectorAll('#language-toggle, #mobile-language-toggle');
    toggleButtons.forEach(button => {
        button.textContent = currentLanguage === 'no' ? 'EN' : 'Norsk';
    });

    // Update document language
    document.documentElement.lang = currentLanguage;
}

// Add event listeners to language toggle buttons
document.getElementById('language-toggle').addEventListener('click', switchLanguage);
document.getElementById('mobile-language-toggle').addEventListener('click', switchLanguage);

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 40) {
        nav.classList.add('shadow-xl');
    } else {
        nav.classList.remove('shadow-xl');
    }
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 120;

    let current = 'hjem';
    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            current = section.id;
        }
    });

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

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
                "Save favorite locations and launch windows",
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

        function openProjectModal(projectId) {
            const project = projectData[projectId];
            const modal = document.getElementById('project-modal');
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
                                    alt="${project.title[currentLang]} screenshot ${index + 1}"
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
