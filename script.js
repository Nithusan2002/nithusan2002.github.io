// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Profile image upload functionality
document.getElementById('image-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImage = document.getElementById('profile-image');
            const placeholder = document.getElementById('profile-placeholder');
            
            profileImage.src = e.target.result;
            profileImage.classList.remove('hidden');
            placeholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

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
                    // Close mobile menu if open
                    mobileMenu.classList.add('hidden');
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
                button.textContent = currentLanguage === 'no' ? 'EN' : 'NO';
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
            if (window.scrollY > 100) {
                nav.classList.add('shadow-xl');
            } else {
                nav.classList.remove('shadow-xl');
            }
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
                demoUrl: "https://github.com/Nithusan2002/LiftOff"
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
            
            modalContent.innerHTML = `
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

