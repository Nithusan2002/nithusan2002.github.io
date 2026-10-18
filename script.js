// Mobile menu toggle
//
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

const sidebarToggle = document.getElementById('sidebar-toggle');
sidebarToggle?.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('sidebar-collapsed');
    sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
    sidebarToggle.dataset.noAriaLabel = collapsed ? 'Åpne sidemenyen' : 'Minimer sidemenyen';
    sidebarToggle.dataset.enAriaLabel = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    sidebarToggle.setAttribute('aria-label', document.documentElement.lang === 'en'
        ? sidebarToggle.dataset.enAriaLabel : sidebarToggle.dataset.noAriaLabel);
});

// A softly trailing pointer accent for mouse/trackpad users. It is created in
// JavaScript so touch devices and reduced-motion users receive no extra markup.
function initCursorVisual() {
    const canUseCursorVisual = window.matchMedia(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    ).matches;

    if (!canUseCursorVisual) return;

    const halo = document.createElement('div');
    const dot = document.createElement('div');
    halo.className = 'cursor-visual';
    dot.className = 'cursor-visual-dot';
    halo.setAttribute('aria-hidden', 'true');
    dot.setAttribute('aria-hidden', 'true');
    document.body.append(halo, dot);

    let pointerX = -100;
    let pointerY = -100;
    let haloX = -100;
    let haloY = -100;
    let animationFrame = null;

    function animateHalo() {
        haloX += (pointerX - haloX) * 0.16;
        haloY += (pointerY - haloY) * 0.16;
        halo.style.translate = `${haloX}px ${haloY}px`;

        if (Math.hypot(pointerX - haloX, pointerY - haloY) > 0.1) {
            animationFrame = requestAnimationFrame(animateHalo);
        } else {
            animationFrame = null;
        }
    }

    function requestHaloFrame() {
        if (animationFrame === null) animationFrame = requestAnimationFrame(animateHalo);
    }

    document.addEventListener('pointermove', event => {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        dot.style.translate = `${pointerX}px ${pointerY}px`;
        requestHaloFrame();
        halo.classList.add('is-visible');
        dot.classList.add('is-visible');

        const interactive = event.target.closest('a, button, [role="button"], input, textarea, select');
        halo.classList.toggle('is-interactive', Boolean(interactive));
    });

    document.addEventListener('pointerdown', () => halo.classList.add('is-pressed'));
    document.addEventListener('pointerup', () => halo.classList.remove('is-pressed'));
    document.documentElement.addEventListener('mouseleave', () => {
        halo.classList.remove('is-visible', 'is-pressed');
        dot.classList.remove('is-visible');
        if (animationFrame !== null) cancelAnimationFrame(animationFrame);
        animationFrame = null;
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    });
}

initCursorVisual();

function initPointerDetails() {
    const supportsMotion = window.matchMedia(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    ).matches;

    if (!supportsMotion) return;

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('pointermove', event => {
            const bounds = card.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;
            const rotateY = ((x / bounds.width) - 0.5) * 3.5;
            const rotateX = (0.5 - (y / bounds.height)) * 3.5;

            card.style.setProperty('--spotlight-x', `${x}px`);
            card.style.setProperty('--spotlight-y', `${y}px`);
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
            card.classList.add('is-pointer-active');
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
            card.classList.remove('is-pointer-active');
        });
    });

    document.querySelectorAll('.cta-primary, .cta-secondary, .contact-cta').forEach(button => {
        button.addEventListener('pointermove', event => {
            const bounds = button.getBoundingClientRect();
            const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
            const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.2;
            button.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        });

        button.addEventListener('pointerleave', () => {
            button.style.transform = '';
        });
    });
}

initPointerDetails();

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
    updateMetadata(activeName);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    closeMobileMenu();
    if (updateUrl) document.getElementById('main-content').focus({ preventScroll: true });
}

function transitionToView(viewName, updateUrl = true) {
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        showView(viewName, updateUrl);
        return;
    }

    document.startViewTransition(() => showView(viewName, updateUrl));
}

document.querySelector('.skip-link')?.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('main-content').focus();
});

document.querySelectorAll('[data-view-link]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        transitionToView(link.dataset.viewLink);
    });
});

window.addEventListener('popstate', () => transitionToView(location.hash.slice(1) || 'hjem', false));

// Language switching functionality
let currentLanguage = 'no';

const pageMetadata = {
    no: {
        title: 'Nithusan Krishnasamymudali | Backendutvikler',
        description: 'Backendutvikler med bachelor i informatikk fra UiO. Se mine prosjekter med Kotlin, Spring Boot og PostgreSQL, og apper for iOS og Android.',
        ogLocale: 'nb_NO',
        ogTitle: 'Nithusan Krishnasamymudali | Backendutvikler',
        ogDescription: 'Se prosjektene mine innen backend- og apputvikling.',
        ogImageAlt: 'Nithusan Krishnasamymudali – backendutvikler'
    },
    en: {
        title: 'Nithusan Krishnasamymudali | Backend Developer',
        description: 'Backend developer with a computer science degree from the University of Oslo. Explore my Kotlin, Spring Boot and PostgreSQL projects, plus iOS and Android apps.',
        ogLocale: 'en_GB',
        ogTitle: 'Nithusan Krishnasamymudali | Backend Developer',
        ogDescription: 'Explore my backend and app development projects.',
        ogImageAlt: 'Nithusan Krishnasamymudali – backend developer'
    }
};

const viewTitles = {
    no: {
        hjem: 'Nithusan Krishnasamymudali | Backendutvikler',
        'om-meg': 'Om meg | Nithusan Krishnasamymudali',
        prosjekter: 'Prosjekter | Nithusan Krishnasamymudali',
        ferdigheter: 'Ferdigheter | Nithusan Krishnasamymudali',
        kontakt: 'Kontakt | Nithusan Krishnasamymudali'
    },
    en: {
        hjem: 'Nithusan Krishnasamymudali | Backend Developer',
        'om-meg': 'About me | Nithusan Krishnasamymudali',
        prosjekter: 'Projects | Nithusan Krishnasamymudali',
        ferdigheter: 'Skills | Nithusan Krishnasamymudali',
        kontakt: 'Contact | Nithusan Krishnasamymudali'
    }
};

function updateMetadata(viewName = location.hash.slice(1) || 'hjem') {
    const metadata = pageMetadata[currentLanguage];
    document.title = viewTitles[currentLanguage][viewName] || metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', metadata.ogLocale);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.ogTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.ogDescription);
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', metadata.ogImageAlt);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.ogTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.ogDescription);
    document.querySelector('meta[name="twitter:image:alt"]')?.setAttribute('content', metadata.ogImageAlt);
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

    document.dispatchEvent(new Event('portfolio-language-change'));
    if (activeProjectId) renderProjectModal(activeProjectId);
}

// Add event listeners to language toggle buttons
document.getElementById('language-toggle')?.addEventListener('click', switchLanguage);
showView(location.hash.slice(1) || 'hjem', false);

// Keep content visible from the first paint; view transitions provide motion.

// Hobby galleries retain native buttons for Tab, Enter and Space.
document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const slides = [...gallery.querySelectorAll('[data-slide]')];
    if (!slides.length) return;
    const count = gallery.querySelector('[data-gallery-count]');
    const status = gallery.querySelector('[data-gallery-status]');
    const dots = gallery.querySelector('.gallery-dots');
    let activeIndex = 0;

    slides.forEach(() => dots?.insertAdjacentHTML('beforeend', '<i></i>'));
    const indicators = dots ? [...dots.children] : [];

    function updateStatus() {
        if (!status) return;
        const description = slides[activeIndex].querySelector('img')?.alt || '';
        const position = currentLanguage === 'no'
            ? `Bilde ${activeIndex + 1} av ${slides.length}`
            : `Photo ${activeIndex + 1} of ${slides.length}`;
        status.textContent = `${position}: ${description}`;
    }

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });
        indicators.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeIndex));
        if (count) count.textContent = `${activeIndex + 1} / ${slides.length}`;
        updateStatus();
    }

    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showSlide(activeIndex - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => showSlide(activeIndex + 1));
    gallery.addEventListener('keydown', event => {
        if (!event.target.closest('[data-gallery-prev], [data-gallery-next]')) return;
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        showSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    });
    document.addEventListener('portfolio-language-change', updateStatus);
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
            { src: "assets/RakettApp_SearchScreen.webp", width: 1080, height: 2220, alt: { no: "LiftOff: søk etter sted og tidspunkt for rakettoppskytning", en: "LiftOff: search for a rocket launch location and time" } },
            { src: "assets/RakettApp_Resultscreen.webp", width: 1080, height: 2220, alt: { no: "LiftOff: værresultater for valgt sted og tidspunkt", en: "LiftOff: weather results for the selected location and time" } },
            { src: "assets/RakettApp_Map.webp", width: 1080, height: 2220, alt: { no: "LiftOff: kart over oppskytningsstedet", en: "LiftOff: map of the launch location" } },
            { src: "assets/RakettApp_LaunchWindows.webp", width: 1080, height: 2220, alt: { no: "LiftOff: oversikt over mulige oppskytningsvinduer", en: "LiftOff: overview of possible launch windows" } }
        ],
        demoUrl: "https://github.com/Nithusan2002/LiftOff"
    },
        poengjeger: {
            title: {
                no: "Poengjeger",
                en: "Poengjeger"
            },
            description: {
                no: "Poengjeger er en iOS-app jeg utvikler for å gjøre det enklere å finne relevante opptjeningsmuligheter for EuroBonus og Trumf før et kjøp. Appen samler kampanjer, vilkår og programguider i en oversiktlig feed.",
                en: "Poengjeger is an iOS app I am developing to make it easier to find relevant EuroBonus and Trumf earning opportunities before a purchase. It brings campaigns, terms and programme guides together in a clear feed."
            },
            features: {
                no: [
                    "Kampanjefeed med søk og filtrering",
                    "Detaljsider med vilkår, frister og tydelige handlingssteg",
                    "Programguider for EuroBonus og Trumf",
                    "Favoritter og lokal lagring av brukerinnstillinger",
                    "Redaksjonell arbeidsflyt for kvalitetssikring av kampanjer"
                ],
                en: [
                    "Campaign feed with search and filtering",
                    "Detail pages with terms, deadlines and clear next steps",
                    "Programme guides for EuroBonus and Trumf",
                    "Favourites and local storage of user preferences",
                    "Editorial workflow for reviewing campaign information"
                ]
            },
            technologies: ["Swift", "SwiftUI", "Supabase", "REST API", "URLSession", "XCTest", "iOS"],
            challenges: {
                no: "Kampanjeinformasjon er spredt og blir raskt utdatert. Jeg har derfor lagt vekt på tydelige kilder og vilkår, en egen kvalitetssikringsflyt og et grensesnitt som gjør informasjonen lett å skanne i kjøpsøyeblikket.",
                en: "Campaign information is fragmented and becomes outdated quickly. I therefore focused on clear sources and terms, a dedicated review workflow and an interface that makes the information easy to scan at the point of purchase."
            },
            outcome: {
                no: "Appen er under aktiv utvikling. Grunnlaget er på plass med en SwiftUI-klient, Supabase-integrasjon, kampanjefeed, programguider, favoritter og automatiserte tester.",
                en: "The app is under active development. The foundation is in place with a SwiftUI client, Supabase integration, a campaign feed, programme guides, favourites and automated tests."
            },
            demoLabel: {
                no: "GitHub-repo",
                en: "GitHub repository"
            },
            demoUrl: "https://github.com/Nithusan2002/PoengJeger"
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
                    "Automatic monthly creation of recurring entries",
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
                no: "Appen er fortsatt under utvikling. Prosjektet har enhets- og UI-tester. Personvernside og vilkår er klargjort før publisering i App Store.",
                en: "The app is still in development. The project includes unit and UI tests. The privacy policy and terms are prepared ahead of an App Store release."
            },
            demoUrl: "https://github.com/Nithusan2002/spor-okonomi"
        },
        matlogg: {
            title: { no: "MatLogg", en: "MatLogg" },
            description: {
                no: "MatLogg er en norsk iOS-app jeg utvikler for rask matlogging, ernæringsoversikt og måloppfølging. Matlogg, historikk og mål lagres lokalt i SQLite, slik at den daglige loggingen fungerer uten nett og uten innlogging.",
                en: "MatLogg is a Norwegian iOS app I am developing for quick food logging, nutrition summaries and tracking goals. Food logs, history and goals are stored locally in SQLite, so everyday logging works offline without signing in."
            },
            features: {
                no: ["Matlogging med dagsoversikt, favoritter og historikk", "Strekkodesøk via Open Food Facts og råvaresøk i Matvaretabellen", "Oppfølging av vekt og ernæringsmål", "Vannlogging og lagrede måltider", "Lokal profil med valgfri Supabase-konto"],
                en: ["Food logging with daily summaries, favourites and history", "Barcode lookup via Open Food Facts and ingredient search in Matvaretabellen", "Weight and nutrition goal tracking", "Water logging and saved meals", "Local profile with an optional Supabase account"]
            },
            technologies: ["Swift", "SwiftUI", "SQLite", "MVVM", "Supabase Auth", "REST API"],
            challenges: {
                no: "Jeg har lagt vekt på pålitelig lokal lagring og at ernæringskilde og måleenhet bevares gjennom loggingen. Klienten følger MVVM med egne repositories og tjenester. Domenedata og synkhendelser skrives atomisk lokalt, mens opplasting er sperret i første lansering.",
                en: "I have focused on reliable local storage and preserving nutrition sources and units throughout logging. The client uses MVVM with separate repositories and services. Domain data and sync events are written atomically to local storage, while uploads are disabled for the first release."
            },
            outcome: {
                no: "Lokal matlogging, dagsoversikt, historikk og måloppfølging er implementert. Appen er under utvikling. Første versjon lagrer data lokalt, uten skybackup eller synk mellom enheter.",
                en: "Local food logging, daily summaries, history and goal tracking are implemented. The app is in development. The first version stores data locally, without cloud backup or multi-device sync."
            },
            demoLabel: { no: "GitHub-repo", en: "GitHub repository" },
            demoUrl: "https://github.com/Nithusan2002/MatLogg"
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
                    "Dockerfile og Render-oppsett følger med i repoet",
                    "17 integrasjonstesttilfeller mot PostgreSQL med Testcontainers",
                    "GitHub Actions kjører tester og bygger appen på push og pull requests"
                ],
                en: [
                    "Register applications with company, role, date, status, link, and notes",
                    "Search and status filtering",
                    "Edit and delete applications from the web interface",
                    "REST API with validation and clear 400/404 error responses",
                    "The repository includes a Dockerfile and Render setup",
                    "17 integration test cases against PostgreSQL with Testcontainers",
                    "GitHub Actions runs the tests and builds the app on pushes and pull requests"
                ]
            },
            technologies: ["Kotlin", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Gradle", "Docker", "HTML", "CSS", "JavaScript"],
            challenges: {
                no: "Jeg holdt prosjektet bevisst lite nok til at jeg kunne jobbe med hele flyten selv. Frontend sender forespørsler til REST-API-et, som validerer dataene og lagrer dem i PostgreSQL.",
                en: "I deliberately kept the project small enough to work on the entire flow myself. The frontend sends requests to the REST API, which validates the data and stores it in PostgreSQL."
            },
            outcome: {
                no: "Resultatet er en webapp med fem REST-endepunkter for å opprette, hente, endre og slette jobbsøknader. Alle 17 integrasjonstesttilfeller og JAR-bygget bestod i GitHub Actions 18. oktober 2026. Koden og Docker- og Render-oppsettet ligger på GitHub. Appen er ikke publisert ennå.",
                en: "The result is a web app with five REST endpoints for creating, retrieving, editing and deleting job applications. All 17 integration test cases and the JAR build passed in GitHub Actions on 18 October 2026. The code and Docker and Render configuration are available on GitHub. The app is not deployed yet."
            },
            screenshots: [{ src: "assets/jobtracker-screenshot.webp", width: 800, height: 556, alt: { no: "JobTracker: oversikt over jobbsøknader med søk og statusfilter", en: "JobTracker: job application overview with search and status filtering" } }],
            screenshotLayout: "wide",
            demoUrl: "https://github.com/Nithusan2002/jobtracker-api"
        },
        };

const projectPresentation = {
            sporOkonomi: {icon:'assets/icon-sage.svg', color:'#205c50', tint:'#e6efea', no:'Budsjett uten styr.', en:'Budgeting made simple.', status:['Under utvikling','In development']},
            matlogg: {icon:'assets/matlogg-app-icon-160.webp', color:'#b72f4b', tint:'#fff1e3', no:'Matlogging som passer hverdagen.', en:'Food logging for everyday life.', status:['Under utvikling','In development']},
            poengjeger: {icon:'assets/poengjeger-app-icon.png', color:'#09695e', tint:'#e1efea', no:'Sjekk før du handler.', en:'Check before you shop.', status:['Under utvikling','In development']},
            webapp: {color:'#3456a4', tint:'#e8eefb', no:'Værdata for neste oppskytning.', en:'Weather data for the next launch.', status:['Studieprosjekt · gruppearbeid','University project · team work']},
            jobTracker: {color:'#205c50', tint:'#e1efec', no:'Alle søknadene. Én oversikt.', en:'Every application. One overview.', status:['Ikke publisert ennå','Not deployed yet']}
};

        let lastFocusedElement = null;
        let activeProjectId = null;
        const pageRegions = [...document.querySelectorAll('.side-nav, body > h1, body > main, body > footer')];

        function renderProjectModal(projectId) {
            const project = projectData[projectId];
            const modalTitle = document.getElementById('modal-title');
            const modalContent = document.getElementById('modal-content');
            const demoLink = document.getElementById('modal-demo-link');
            
            const currentLang = currentLanguage;
            
            modalTitle.textContent = project.title[currentLang];
            demoLink.href = project.demoUrl;
            demoLink.textContent = project.demoLabel?.[currentLang]
                ?? (currentLang === 'no' ? 'GitHub-repo' : 'GitHub repository');
            
        const presentation = projectPresentation[projectId];
        const dialog = document.querySelector('.project-dialog');
        dialog.style.setProperty('--detail-color', presentation.color);
        dialog.style.setProperty('--detail-tint', presentation.tint);
        const langIndex = currentLang === 'no' ? 0 : 1;
        const images = project.screenshots?.length ? `<section class="detail-gallery" tabindex="0" role="region" aria-label="${currentLang === 'no' ? 'Skjermbilder' : 'Screenshots'}">${project.screenshots.map(image => `<figure><img src="${image.src}" alt="${image.alt[currentLang]}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"></figure>`).join('')}</section>` : '';
        modalContent.innerHTML = `
            <div class="detail-hero">
                ${presentation.icon ? `<img class="detail-icon" src="${presentation.icon}" alt="" width="160" height="160" decoding="async">` : '<span class="detail-symbol" aria-hidden="true">↗</span>'}
                <div><span class="detail-status">${presentation.status[langIndex]}</span><p class="detail-tagline">${presentation[currentLang]}</p></div>
            </div>
            <div class="detail-tech" aria-label="${currentLang === 'no' ? 'Teknologier' : 'Technologies'}">${project.technologies.map(tech => `<span>${tech}</span>`).join('')}</div>
            ${images}
            <section class="detail-story"><span class="detail-number">01</span><div><h3>${currentLang === 'no' ? 'Hva gjør den?' : 'What does it do?'}</h3><p>${project.description[currentLang]}</p></div></section>
            ${project.features?.[currentLang]?.length ? `<section class="detail-features"><h3>${currentLang === 'no' ? 'Dette kan appen' : 'What the app does'}</h3><ul>${project.features[currentLang].map(feature => `<li>${feature}</li>`).join('')}</ul></section>` : ''}
            <div class="detail-role"><h3>${currentLang === 'no' ? 'Min rolle' : 'My role'}</h3><p>${projectId === 'webapp' ? (currentLang === 'no' ? 'Utviklet i gruppe i IN2000 ved UiO. Jeg bidro som del av utviklingsteamet.' : 'Built as a team in IN2000 at UiO. I contributed as a member of the development team.') : (currentLang === 'no' ? 'Eget prosjekt — jeg jobber med design og utvikling.' : 'Personal project — I work on design and development.')}</p></div>
            <section class="detail-story"><span class="detail-number">02</span><div><h3>${currentLang === 'no' ? 'Hvordan er den bygget?' : 'How is it built?'}</h3><p>${project.challenges[currentLang]}</p></div></section>
            <section class="detail-story"><span class="detail-number">03</span><div><h3>${currentLang === 'no' ? 'Status og erfaringer' : 'Status and experience'}</h3><p>${project.outcome[currentLang]}</p></div></section>
        `;
        }

        function openProjectModal(projectId) {
            const modal = document.getElementById('project-modal');
            activeProjectId = projectId;
            renderProjectModal(projectId);
            
            lastFocusedElement = document.activeElement;
            modal.hidden = false;
            modal.classList.remove('hidden');
            modal.querySelector('.project-dialog').scrollTop = 0;
            pageRegions.forEach(region => { region.inert = true; });
            document.body.style.overflow = 'hidden';
            modal.querySelector('.project-dialog').focus();
        }

        function closeProjectModal() {
            const modal = document.getElementById('project-modal');
            modal.classList.add('hidden');
            modal.hidden = true;
            pageRegions.forEach(region => { region.inert = false; });
            document.body.style.overflow = 'auto';
            activeProjectId = null;
            lastFocusedElement?.focus();
        }

        // Keep the native button as the keyboard control while extending its
        // click target to the card. Links and text selection retain their behavior.
        document.querySelectorAll('.project-card').forEach(card => {
            const projectButton = card.querySelector('.project-primary-link');
            if (!projectButton) return;

            card.addEventListener('click', event => {
                if (event.defaultPrevented || event.button !== 0) return;
                if (event.target.closest('a, button, input, select, textarea, [role="button"]')) return;
                if (window.getSelection()?.isCollapsed === false) return;

                projectButton.focus({ preventScroll: true });
                projectButton.click();
            });
        });

        // Close modal when clicking outside
        document.getElementById('project-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeProjectModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const menuWasOpen = mobileMenu.classList.contains('mobile-open');
                closeMobileMenu();
                if (menuWasOpen) mobileMenuBtn.focus();
                if (!document.getElementById('project-modal').classList.contains('hidden')) closeProjectModal();
            }

            if (e.key === 'Tab') {
                const modal = document.getElementById('project-modal');
                if (modal.classList.contains('hidden')) return;
                const focusable = [...modal.querySelectorAll('button, a[href], [tabindex="0"]')];
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && (document.activeElement === first || document.activeElement === modal.querySelector('.project-dialog'))) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });


// The mail link and copy action remain separate keyboard controls.
document.getElementById('copy-email')?.addEventListener('click', async () => {
    const status = document.getElementById('copy-email-status');
    const address = document.getElementById('contact-email-address').textContent.trim();
    status.textContent = '';
    let no, en;
    try {
        await navigator.clipboard.writeText(address);
        no = 'Kopiert';
        en = 'Copied';
    } catch {
        no = 'Kopiering feilet';
        en = 'Copy failed';
    }
    status.dataset.no = no;
    status.dataset.en = en;
    status.textContent = currentLanguage === 'no' ? no : en;
});
