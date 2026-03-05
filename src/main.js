// Adam / qwkuns

// éléments du dom
const bgTextContainer = document.getElementById('bg-text-container');
const cardsGrid = document.getElementById('cards-grid');
const loadingState = document.getElementById('loading-state');
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');
const filterWrapper = document.getElementById('filter-wrapper');
const searchInput = document.getElementById('search-input');
const tagsContainer = document.getElementById('tags-container');

// éléments de la modale des crédits
const creditsToggle = document.getElementById('credits-toggle');
const creditsModal = document.getElementById('credits-modal');
const creditsModalContent = document.getElementById('credits-modal-content');
const creditsClose = document.getElementById('credits-close');
const creditsBackdrop = document.getElementById('credits-modal-backdrop');
const creditsTitle = document.getElementById('credits-title');
const creditsText = document.getElementById('credits-text');
const creditsLinksContainer = document.getElementById('credits-links');

// éléments de la modale de ressources
const resourceModal = document.getElementById('resource-modal');
const resourceModalContent = document.getElementById('resource-modal-content');
const resourceClose = document.getElementById('resource-close');
const resourceBackdrop = document.getElementById('resource-modal-backdrop');

const resTitle = document.getElementById('resource-title');
const resTags = document.getElementById('resource-tags');
const resThumbContainer = document.getElementById('resource-thumbnail-container');
const resThumb = document.getElementById('resource-thumbnail');
const resContent = document.getElementById('resource-content');
const resDesc = document.getElementById('resource-description');
const resDate = document.getElementById('resource-date');
const resLink = document.getElementById('resource-link');

// état global
let allData = [];
let availableTags = new Set();
let selectedTags = new Set();

// logique de la modale des crédits
const openCredits = () => {
    // on active les interactions sur le conteneur
    creditsModal.classList.remove('pointer-events-none');
    creditsModal.classList.add('pointer-events-auto');

    // on fait apparaître le fond flou
    creditsBackdrop.classList.remove('opacity-0');
    creditsBackdrop.classList.add('opacity-100');

    // on agrandit et on fait apparaître le contenu avec un léger décalage
    setTimeout(() => {
        creditsModalContent.classList.remove('scale-95', 'opacity-0');
        creditsModalContent.classList.add('scale-100', 'opacity-100');
    }, 10); // petit délai pour s'assurer que la transition css se déclenche
};

const closeCredits = () => {
    // on réduit et on fait disparaître le contenu
    creditsModalContent.classList.remove('scale-100', 'opacity-100');
    creditsModalContent.classList.add('scale-95', 'opacity-0');

    // on fait disparaître le fond flou
    creditsBackdrop.classList.remove('opacity-100');
    creditsBackdrop.classList.add('opacity-0');

    // on désactive les clics une fois l'animation commencée
    setTimeout(() => {
        creditsModal.classList.remove('pointer-events-auto');
        creditsModal.classList.add('pointer-events-none');
    }, 150); // délai pour laisser le contenu s'animer d'abord
};

creditsToggle.addEventListener('click', openCredits);
creditsClose.addEventListener('click', closeCredits);
creditsBackdrop.addEventListener('click', closeCredits);

// logique de la modale de ressource
const openResource = (item) => {
    // on remplit les données
    resTitle.textContent = item.title;

    // tags
    resTags.innerHTML = item.tags.map(tag => `<span class="bg-indigo-900/50 text-indigo-200 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-800/50">${tag}</span>`).join('');

    // miniature
    if (item.thumbnail) {
        resThumb.src = item.thumbnail;
        resThumb.alt = `Miniature de ${item.title}`;
        resThumbContainer.classList.remove('hidden');
    } else {
        resThumbContainer.classList.add('hidden');
    }

    // contenu et description (inversés)
    resContent.textContent = item.description || "Aucune description supplémentaire disponible pour cette ressource.";
    resDesc.textContent = item.content;

    // date
    const dateObj = new Date(parseInt(item.date) * 1000);
    resDate.textContent = `${dateObj.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`;

    // lien final
    resLink.href = item.link;

    // on active les intéractions sur le conteneur
    resourceModal.classList.remove('pointer-events-none');
    resourceModal.classList.add('pointer-events-auto');

    // on fait apparaître le fond flou
    resourceBackdrop.classList.remove('opacity-0');
    resourceBackdrop.classList.add('opacity-100');

    // on agrandit et on fait apparaître le contenu avec un léger décalage
    setTimeout(() => {
        resourceModalContent.classList.remove('scale-95', 'opacity-0');
        resourceModalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
};

const closeResource = () => {
    // on réduit et on fait disparaître le contenu
    resourceModalContent.classList.remove('scale-100', 'opacity-100');
    resourceModalContent.classList.add('scale-95', 'opacity-0');

    // on fait disparaître le fond flou
    resourceBackdrop.classList.remove('opacity-100');
    resourceBackdrop.classList.add('opacity-0');

    // on désactive les clics une fois l'animation commencée
    setTimeout(() => {
        resourceModal.classList.remove('pointer-events-auto');
        resourceModal.classList.add('pointer-events-none');
    }, 150);
};

resourceClose.addEventListener('click', closeResource);
resourceBackdrop.addEventListener('click', closeResource);

// bascule du panneau de filtres
filterToggle.addEventListener('click', () => {
    const isClosed = filterWrapper.classList.contains('grid-rows-[0fr]');

    if (isClosed) {
        // on l'ouvre
        filterWrapper.classList.remove('grid-rows-[0fr]');
        filterWrapper.classList.add('grid-rows-[1fr]');
        filterPanel.classList.remove('opacity-0');
        filterPanel.classList.add('opacity-100');
    } else {
        // on le ferme
        filterWrapper.classList.remove('grid-rows-[1fr]');
        filterWrapper.classList.add('grid-rows-[0fr]');
        filterPanel.classList.remove('opacity-100');
        filterPanel.classList.add('opacity-0');
    }
});

// rendu du texte animé en fond
const renderBackgroundText = (text) => {
    bgTextContainer.innerHTML = '';
    // on crée plusieurs lignes pour remplir l'écran
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'bg-text-line';
        // on répète le texte pour que le défilement soit fluide
        line.textContent = `${text} \u00A0\u00A0\u00A0 ${text} \u00A0\u00A0\u00A0 ${text}`;

        // durées et animations aléatoires pour plus de dynamisme
        line.style.animationDuration = `${5 + (Math.random() * 10)}s`;
        bgTextContainer.appendChild(line);
    }
};

// application des filtres
const applyFilters = () => {
    if (!searchInput) return;
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = allData.filter(item => {
        // 1. recherche texte (titre, contenu, description ou id)
        const textTarget = `${item.title} ${item.content} ${item.description || ''} ${item.id}`.toLowerCase();
        const matchesSearch = textTarget.includes(searchTerm);

        // 2. recherche par tags
        // si aucun tag n'est sélectionné, on garde tout. sinon il faut avoir TOUS les tags sélectionnés
        const matchesTags = selectedTags.size === 0 || Array.from(selectedTags).every(tag => item.tags.includes(tag));

        return matchesSearch && matchesTags;
    });

    renderCards(filtered);
};


// rendu des boutons de tags
const renderFilterTags = () => {
    tagsContainer.innerHTML = '';

    Array.from(availableTags).sort().forEach(tag => {
        const btn = document.createElement('button');
        const isSelected = selectedTags.has(tag);

        // classes dynamiques selon l'état de sélection
        const baseClasses = "px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 active:scale-95";
        if (isSelected) {
            btn.className = `${baseClasses} bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20`;
        } else {
            btn.className = `${baseClasses} bg-transparent border-slate-600 text-slate-300 hover:border-indigo-400 hover:text-indigo-400`;
        }

        btn.textContent = tag;
        btn.addEventListener('click', () => {
            if (selectedTags.has(tag)) {
                selectedTags.delete(tag);
            } else {
                selectedTags.add(tag);
            }
            renderFilterTags(); // on met à jour l'ui des tags
            applyFilters();     // on applique les filtres aux cartes
        });

        tagsContainer.appendChild(btn);
    });
};

// rendu des cartes
const renderCards = (items) => {
    cardsGrid.innerHTML = ''; // on vide la grille existante

    if (items.length === 0) {
        cardsGrid.innerHTML = `
            <div class="col-span-full py-20 text-center animate-fade-in-up">
                <p class="text-2xl text-slate-400 font-medium">Aucun témoignage ne correspond à votre recherche.</p>
            </div>
        `;
        return;
    }

    items.forEach((item, index) => {
        const dateObj = new Date(parseInt(item.date) * 1000);
        const formattedDate = dateObj.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

        // on raccourcit le contenu pour la prévisualisation
        const truncatedContent = item.content.length > 150 ? item.content.substring(0, 150) + '...' : item.content;

        const card = document.createElement('article');
        // effet d'apparition en cascade basé sur l'index, et 'group' pour le hover
        card.className = `glass-card group p-6 flex flex-col h-full animate-fade-in-up`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animationFillMode = 'both';

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4 md:mb-6 gap-3 md:gap-4">
                <div>
                    <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-2 md:group-hover:text-indigo-400 transition-colors text-white">${item.title}</h2>
                    <div class="flex flex-wrap gap-2 mb-3">
                        ${item.tags.map(tag => `<span class="bg-indigo-900/50 text-indigo-200 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-800/50">${tag}</span>`).join('')}
                    </div>
                </div>
                ${item.thumbnail ? `
                    <div class="shrink-0 ml-4">
                        <img src="${item.thumbnail}" alt="Miniature de ${item.title}" class="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-md border border-slate-700 bg-slate-800">
                    </div>
                ` : ''}
            </div>
            
            <p class="text-sm md:text-base text-slate-100 mb-6 md:mb-8 flex-grow leading-relaxed font-medium">
                ${truncatedContent}
            </p>
            
            <div class="mt-auto flex items-center justify-between pt-4 border-t border-slate-700/50">
                <span class="text-xs md:text-sm text-slate-300 font-semibold">${formattedDate}</span>
                <button class="resource-open-btn cursor-pointer inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold transition-all duration-200 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 shadow-lg
                    /* Indigo btn, white text */
                    bg-indigo-900 text-white md:hover:bg-indigo-800 focus:ring-indigo-700 shadow-indigo-950/50">
                    Accéder
                </button>
            </div>
        `;

        // on attache l'event de clic sur le bouton d'accès
        const btn = card.querySelector('.resource-open-btn');
        btn.addEventListener('click', () => openResource(item));

        cardsGrid.appendChild(card);
    });
};

// récupération des données
const initData = async () => {
    try {
        const response = await fetch('/api/db');
        const data = await response.json();

        if (data && data.items) {
            allData = data.items;

            // on extrait tous les tags uniques
            allData.forEach(item => {
                item.tags.forEach(tag => availableTags.add(tag));
            });

            // on cache le chargement, on affiche le contenu
            loadingState.classList.add('hidden');

            if (data.backgroundtext) {
                renderBackgroundText(data.backgroundtext);
            }

            if (data.credits) {
                // on remplit la modale des crédits
                if (data.credits.title) creditsTitle.textContent = data.credits.title;
                if (data.credits.text) creditsText.textContent = data.credits.text;

                // on génère les liens s'il y en a
                if (data.credits.links && Array.isArray(data.credits.links) && creditsLinksContainer) {
                    creditsLinksContainer.innerHTML = ''; // on vide les anciens liens
                    data.credits.links.forEach((link, index) => {
                        const a = document.createElement('a');
                        a.href = link.url;
                        a.target = "_blank";
                        a.rel = "noopener noreferrer";
                        // style bouton glassmorphism pour les liens
                        a.className = `group flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-indigo-600/20 hover:border-indigo-400/30 transition-all duration-300 active:scale-95 animate-fade-in-up`;
                        a.style.animationDelay = `${0.1 + (index * 0.1)}s`;
                        a.style.animationFillMode = 'both';

                        a.innerHTML = `
                            <span class="font-semibold text-sm md:text-base text-slate-200 group-hover:text-indigo-300 transition-colors text-left">${link.label}</span>
                            <svg class="w-4 h-4 md:w-5 md:h-5 text-slate-400 flex-shrink-0 ml-3 group-hover:text-indigo-400 transition-transform duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        `;
                        creditsLinksContainer.appendChild(a);
                    });
                }
            }

            renderFilterTags();
            renderCards(allData);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        loadingState.innerHTML = `
                            < div class="text-red-400 bg-red-900/30 p-4 rounded-2xl flex items-center gap-3" >
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="font-medium">Impossible de charger les données. Veuillez vérifier votre base de données locales.</p>
            </div >
    `;
    }
};

// addEventListeners globaux
if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
}

// initialisation
initData();
