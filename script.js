// Mobile menu toggle
//
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', String(!expanded));
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
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

// Hero project rotation
const heroProjects = [
    {
        title: { no: 'LiftOff', en: 'LiftOff' },
        desc: { no: 'Android-app for trygg rakettoppskytning basert på sanntids værdata, kart og favorittsteder.', en: 'Android app for safe rocket launch decisions using real-time weather data, maps, and saved locations.' },
        techs: ['Kotlin', 'Jetpack Compose', 'Room', 'Retrofit', 'Material 3']
    },
    {
        title: { no: 'Spor økonomi', en: 'Spor økonomi' },
        desc: { no: 'iOS-app for personlig økonomioppfølging med budsjett, faste poster og investeringsoversikt.', en: 'iOS app for personal finance tracking with budgets, recurring expenses, and investment overview.' },
        techs: ['Swift', 'SwiftUI', 'SwiftData', 'Supabase']
    }
];
let heroProjectIndex = 0;

function setHeroProject(index) {
    heroProjectIndex = index;
    const p = heroProjects[index];
    const lang = currentLanguage;
    document.getElementById('hero-project-title').textContent = p.title[lang];
    document.getElementById('hero-project-desc').textContent = p.desc[lang];
    const techList = document.getElementById('hero-tech-list');
    techList.innerHTML = p.techs.map(t => `<span>${t}</span>`).join('');
    document.querySelectorAll('.hero-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

setInterval(() => setHeroProject((heroProjectIndex + 1) % heroProjects.length), 4000);

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

    // Refresh hero panel text
    setHeroProject(heroProjectIndex);

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
            no: "LiftOff er en Android-applikasjon som gir full oversikt over værforhold på valgt sted og tidspunkt. Appen hjelper brukere med å avgjøre om det er trygt å gjennomføre en rakettoppskytning ved å kombinere sanntids værdata med et moderne, brukervennlig grensesnitt.",
            en: "LiftOff is an Android application that provides a complete overview of weather conditions at a user-specified location and time. The app helps users determine whether it is safe to conduct a rocket launch by combining real-time weather data with a modern, user-friendly interface."
        },
        features: {
            no: [
                "Visualiserer værdata relevant for rakettoppskytninger",
                "Sømløs navigasjon mellom søk, resultater, kartvisning, oppskytningsvinduer og favoritter",
                "Lagre favorittsteder og oppskytningsvinduer",
                "Moderne, responsivt og tilgjengelig grensesnitt",
                "Perfekt prosjekt for å vise Android-utvikling og moderne Kotlin-ferdigheter"
            ],
            en: [
                "Visualizes weather data relevant for rocket launches",
                "Seamless navigation between search, results, map view, launch windows, and favorites",
                "Save favorite locations and launch windows",
                "Modern, responsive, and accessible interface",
                "Perfect project to showcase Android development and modern Kotlin skills"
            ]
        },
        technologies: [
            "Kotlin", "Jetpack Compose", "Navigation Compose", "Coil", "Room", "Ktor", "Retrofit",
            "Google Play Services Maps", "Coroutines", "Jetpack ViewModel", "Mockito",
            "Kotlin Serialization", "Material Design 3"
        ],
        challenges: {
            no: "Utfordringen var å integrere sanntids værdata og samtidig sikre en brukervennlig og moderne opplevelse. Dette ble løst med Kotlin, Jetpack Compose og effektive API-integrasjoner.",
            en: "The challenge was to integrate real-time weather data while ensuring a user-friendly and modern experience. This was solved using Kotlin, Jetpack Compose, and efficient API integrations."
        },
        outcome: {
            no: "Prosjektet ble utviklet som en del av IN2000 ved Universitetet i Oslo og viser ferdigheter innen Android-utvikling, Kotlin og moderne UI/UX-design.",
            en: "The project was developed as part of the IN2000 course at the University of Oslo and showcases skills in Android development, Kotlin, and modern UI/UX design."
        },
        screenshots: [
            "assets/RakettApp_SearchScreen.png",
            "assets/RakettApp_Resultscreen.png",
            "assets/RakettApp_Map.png",
            "assets/RakettApp_LaunchWindows.png"
        ],
        demoUrl: "https://github.com/Nithusan2002/LiftOff"
    },
            sporOkonomi: {
            title: {
                no: "Spor økonomi",
                en: "Spor økonomi"
            },
            description: {
                no: "En iOS-app for personlig økonomioppfølging, designet for brukere som vil vite hva de har igjen av måneden – uten komplisert oppsett. Appen bygger på et offline-first prinsipp med lokal lagring som standard.",
                en: "An iOS app for personal finance tracking, designed for users who want to know what they have left this month – without complicated setup. The app follows an offline-first principle with local storage as default."
            },
            features: {
                no: [
                    "Budsjettplanlegging med inntekter og utgifter",
                    "Automatisk månedlig oppretting av faste poster",
                    "Investeringsoversikt med snapshots",
                    "Import og eksport av data",
                    "Enkel, rask og intuitiv å bruke"
                ],
                en: [
                    "Budget planning with income and expenses",
                    "Automatic monthly creation of recurring expenses",
                    "Investment overview with snapshots",
                    "Import and export of data",
                    "Simple, fast, and intuitive to use"
                ]
            },
            technologies: ["Swift", "SwiftUI", "SwiftData", "Supabase", "iOS"],
            challenges: {
                no: "Utfordringen var å lage en app som er offline-first og rask uten å gå på kompromiss med funksjonalitet. Lokal datalagring via SwiftData sikrer at appen fungerer uten internettilkobling, mens Supabase håndterer valgfri autentisering.",
                en: "The challenge was building an offline-first app that is fast without compromising functionality. Local data storage via SwiftData ensures the app works without internet, while Supabase handles optional authentication."
            },
            outcome: {
                no: "Prosjektet er aktivt under utvikling med over 385 commits. Juridiske dokumenter er på plass for fremtidig App Store-publisering.",
                en: "The project is actively under development with over 385 commits. Legal documents are in place for future App Store publication."
            },
            demoUrl: "https://github.com/Nithusan2002/spor-okonomi"
        },
        jobTracker: {
            title: {
                no: "JobTracker",
                en: "JobTracker"
            },
            description: {
                no: "JobTracker er et backend/API-prosjekt med et enkelt webgrensesnitt for å holde oversikt over jobbsøknader. Prosjektet har Kotlin/Spring Boot REST-API, PostgreSQL-database og støtte for registrering, filtrering, redigering og sletting av søknader.",
                en: "JobTracker is a backend/API project with a simple web interface for tracking job applications. It includes a Kotlin/Spring Boot REST API, a PostgreSQL database, and support for creating, filtering, editing, and deleting applications."
            },
            features: {
                no: [
                    "Registrering av jobbsøknader med bedrift, stilling, dato, status, lenke og notater",
                    "Søk og filtrering på status",
                    "Redigering og sletting fra webgrensesnittet",
                    "REST-API med validering og tydelige 400/404-feilsvar",
                    "Docker- og Render-klargjort deploy-oppsett",
                    "Ikke hostet live ennå; repoet viser kode, arkitektur og lokal kjøring"
                ],
                en: [
                    "Register applications with company, role, date, status, link, and notes",
                    "Search and status filtering",
                    "Edit and delete applications from the web interface",
                    "REST API with validation and clear 400/404 error responses",
                    "Docker and Render-ready deployment setup",
                    "Not hosted live yet; the repository showcases code, architecture, and local setup"
                ]
            },
            technologies: ["Kotlin", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Gradle", "Docker", "HTML", "CSS", "JavaScript"],
            challenges: {
                no: "Hovedutfordringen var å bygge et lite, komplett prosjekt som viser backend-ferdigheter uten å bli unødvendig komplisert. Løsningen ble et tydelig CRUD-API med validering, PostgreSQL og en enkel frontend som bruker samme API.",
                en: "The main challenge was building a small but complete project that demonstrates backend skills without unnecessary complexity. The result is a focused CRUD API with validation, PostgreSQL, and a simple frontend using the same API."
            },
            outcome: {
                no: "Prosjektet viser praktisk erfaring med Kotlin/Spring Boot, databaseintegrasjon, REST-design, frontend-integrasjon, README-dokumentasjon, MIT-lisens og deploy-klargjøring.",
                en: "The project demonstrates practical experience with Kotlin/Spring Boot, database integration, REST design, frontend integration, README documentation, MIT licensing, and deployment preparation."
            },
            screenshots: ["assets/jobtracker-screenshot.png"],
            screenshotLayout: "wide",
            demoUrl: "https://github.com/Nithusan2002/jobtracker-api"
        },
        mobileapp: {
                title: {
                    no: "Mobilapp - FitnessTracker",
                    en: "Mobile App - FitnessTracker"
                },
                description: {
                    no: "En intuitiv mobilapplikasjon som hjelper brukere med å spore treningsaktiviteter, sette mål og følge fremgang. Appen integrerer med populære fitness-enheter og tilbyr personaliserte treningsplaner.",
                    en: "An intuitive mobile application that helps users track workout activities, set goals, and monitor progress. The app integrates with popular fitness devices and offers personalized workout plans."
                },
                features: {
                    no: [
                        "Aktivitetssporing med GPS",
                        "Personaliserte treningsplaner",
                        "Integrasjon med wearables",
                        "Sosiale funksjoner og utfordringer",
                        "Detaljerte statistikker og rapporter",
                        "Offline modus for treningsplaner"
                    ],
                    en: [
                        "Activity tracking with GPS",
                        "Personalized workout plans",
                        "Wearables integration",
                        "Social features and challenges",
                        "Detailed statistics and reports",
                        "Offline mode for workout plans"
                    ]
                },
                technologies: ["Flutter", "Dart", "Firebase", "Google Maps API", "Health Connect", "SQLite"],
                challenges: {
                    no: "Hovedutfordringen var å optimalisere batterilevetiden mens appen sporet aktivitet i bakgrunnen. Dette ble løst gjennom smart bruk av sensorer og effektive algoritmer.",
                    en: "The main challenge was optimizing battery life while the app tracked activity in the background. This was solved through smart sensor usage and efficient algorithms."
                },
                outcome: {
                    no: "Appen har blitt lastet ned over 1000 ganger i testfasen og har en gjennomsnittlig vurdering på 4.7 stjerner. Brukere roser spesielt den intuitive designen og nøyaktige sporingen.",
                    en: "The app has been downloaded over 1000 times in the test phase and has an average rating of 4.7 stars. Users especially praise the intuitive design and accurate tracking."
                },
                demoUrl: "#"
            },
            aiproject: {
                title: {
                    no: "AI-prosjekt - SmartRecommend",
                    en: "AI Project - SmartRecommend"
                },
                description: {
                    no: "Et maskinlæringsprosjekt som analyserer brukeratferd og preferanser for å gi personaliserte anbefalinger. Systemet bruker avanserte algoritmer for å forbedre nøyaktigheten over tid.",
                    en: "A machine learning project that analyzes user behavior and preferences to provide personalized recommendations. The system uses advanced algorithms to improve accuracy over time."
                },
                features: {
                    no: [
                        "Personaliserte anbefalinger basert på brukeratferd",
                        "Sanntids læring og tilpasning",
                        "A/B testing for algoritmeoptimalisering",
                        "Skalerbar arkitektur for store datasett",
                        "Visualisering av anbefalingsmønstre",
                        "API for integrasjon med andre systemer"
                    ],
                    en: [
                        "Personalized recommendations based on user behavior",
                        "Real-time learning and adaptation",
                        "A/B testing for algorithm optimization",
                        "Scalable architecture for large datasets",
                        "Visualization of recommendation patterns",
                        "API for integration with other systems"
                    ]
                },
                technologies: ["Python", "TensorFlow", "Pandas", "NumPy", "Scikit-learn", "FastAPI", "PostgreSQL"],
                challenges: {
                    no: "Den største utfordringen var å håndtere store mengder data effektivt og sikre at anbefalingene forble relevante. Dette ble løst ved å implementere distribuert databehandling og kontinuerlig læring.",
                    en: "The biggest challenge was handling large amounts of data efficiently and ensuring recommendations remained relevant. This was solved by implementing distributed data processing and continuous learning."
                },
                outcome: {
                    no: "Prosjektet oppnådde 85% nøyaktighet i anbefalinger og reduserte behandlingstiden med 60%. Systemet håndterer nå over 10,000 anbefalinger per sekund.",
                    en: "The project achieved 85% accuracy in recommendations and reduced processing time by 60%. The system now handles over 10,000 recommendations per second."
                },
                demoUrl: "#"
            }
        };

        function openProjectModal(projectId) {
            const project = projectData[projectId];
            const modal = document.getElementById('project-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalContent = document.getElementById('modal-content');
            const demoLink = document.getElementById('modal-demo-link');
            
            const currentLang = currentLanguage;
            
            modalTitle.textContent = project.title[currentLang];
            demoLink.href = project.demoUrl;
            
        const featuresTitle = currentLang === 'no' ? 'Hovedfunksjoner:' : 'Key Features:';
        const techTitle = currentLang === 'no' ? 'Teknologier:' : 'Technologies:';
        const challengesTitle = currentLang === 'no' ? 'Utfordringer:' : 'Challenges:';
        const outcomeTitle = currentLang === 'no' ? 'Resultat:' : 'Outcome:';
        const screenshotsTitle = currentLang === 'no' ? 'Skjermbilder:' : 'Screenshots:';
        const screenshotsSection = project.screenshots?.length ? `
                <div class="bg-gradient-to-br from-slate-50 to-blue-100 rounded-lg p-6">
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
                <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">${currentLang === 'no' ? 'Prosjektbeskrivelse:' : 'Project Description:'}</h3>
                    <p class="text-gray-600 leading-relaxed">${project.description[currentLang]}</p>
                </div>
                
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">${featuresTitle}</h3>
                    <ul class="space-y-2">
                        ${project.features[currentLang].map(feature => `<li class="flex items-start"><span class="text-green-500 mr-2">✓</span><span class="text-gray-600">${feature}</span></li>`).join('')}
                    </ul>
                </div>
                
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">${techTitle}</h3>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">${challengesTitle}</h3>
                    <p class="text-gray-600 leading-relaxed">${project.challenges[currentLang]}</p>
                </div>
                
                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">${outcomeTitle}</h3>
                    <p class="text-gray-600 leading-relaxed">${project.outcome[currentLang]}</p>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeProjectModal() {
            const modal = document.getElementById('project-modal');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
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
                closeProjectModal();
            }
        });
