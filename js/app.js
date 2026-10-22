/**
 * Dream Destination - Master JavaScript Application
 * Handles SPA navigation, Leaflet interactive map, Smart AI Planner,
 * dynamic search & filters, localStorage persistence, modals, and toasts.
 */

// Global State
const AppState = {
    activePage: 'homePage',
    map: null,
    markers: [],
    currentUser: JSON.parse(localStorage.getItem('dd_current_user') || 'null'),
    users: JSON.parse(localStorage.getItem('dd_users') || '[]'),
    favorites: JSON.parse(localStorage.getItem('dd_favorites') || '[]'),
    savedTrips: JSON.parse(localStorage.getItem('dd_trips') || '[]'),
    bookings: JSON.parse(localStorage.getItem('dd_bookings') || '[]'),
    reviews: JSON.parse(localStorage.getItem('dd_reviews') || '[]')
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLeafletMap();
    renderDestinations();
    renderListings();
    renderExperiences();
    renderGuides();
    renderCommunity();
    renderReviews();
    initCultureAccordion();
    updateFavoriteCounter();
    updateNavAuth();

    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const userDropdown = document.getElementById('userDropdownMenu');
        const userPill = document.getElementById('userProfilePill');
        if (userDropdown && userPill && !userPill.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    // Check URL hash for direct deep linking
    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'homePage';
    showPage(initialPage);
});

/* ============================================================
   1. NAVIGATION & SPA ROUTING
   ============================================================ */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (target) {
                e.preventDefault();
                showPage(target);
            }
        });
    });
}

function showPage(pageId) {
    const targetSection = document.getElementById(pageId) || document.getElementById('homePage');
    if (!targetSection) return;

    AppState.activePage = pageId;

    // Hide all sections
    document.querySelectorAll('.page-section, #homePage').forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
    });

    // Show selected section
    targetSection.style.display = 'block';
    targetSection.classList.add('active');

    // Update active navbar link
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('data-target') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Close mobile menu if open
    const navLinksList = document.getElementById('navLinks');
    if (navLinksList) navLinksList.classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Invalidate map size if navigating to map
    if (pageId === 'map' && AppState.map) {
        setTimeout(() => {
            AppState.map.invalidateSize();
        }, 200);
    }
}

function toggleMenu() {
    const navLinksList = document.getElementById('navLinks');
    if (navLinksList) {
        navLinksList.classList.toggle('active');
    }
}

/* ============================================================
   2. LEAFLET INTERACTIVE MAP SYSTEM
   ============================================================ */
function initLeafletMap() {
    const mapElement = document.getElementById('leafletMap');
    if (!mapElement) return;

    // Centered over India
    AppState.map = L.map('leafletMap', {
        center: [22.9734, 78.6569],
        zoom: 5,
        minZoom: 4,
        maxZoom: 14,
        scrollWheelZoom: true
    });

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dream Destination India',
        maxZoom: 18
    }).addTo(AppState.map);

    // Render Markers
    renderMapMarkers('all');
}

function renderMapMarkers(categoryFilter = 'all') {
    if (!AppState.map) return;

    // Clear existing markers
    AppState.markers.forEach(marker => AppState.map.removeLayer(marker));
    AppState.markers = [];

    DreamData.destinations.forEach(dest => {
        if (categoryFilter !== 'all' && dest.category !== categoryFilter) {
            return;
        }

        // Custom pin color mapping
        const colorMap = {
            culture: '#d97706',
            peace: '#2d6a4f',
            adventure: '#ef4444',
            nature: '#0284c7'
        };
        const pinColor = colorMap[dest.category] || '#1b4332';

        const customIcon = L.divIcon({
            className: 'custom-leaflet-pin',
            html: `
                <div style="background-color: ${pinColor}; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid #fff;">
                    <div style="width: 10px; height: 10px; background: #fff; border-radius: 50%;"></div>
                </div>
            `,
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -28]
        });

        const marker = L.marker([dest.lat, dest.lng], { icon: customIcon });

        const popupContent = `
            <div class="map-popup-card">
                <img src="${dest.image}" alt="${dest.name}">
                <div class="map-popup-body">
                    <span class="badge badge-artisan" style="margin-bottom: 4px;">${dest.tag}</span>
                    <h4>${dest.name}</h4>
                    <div class="state"><i class="fas fa-map-marker-alt"></i> ${dest.state}</div>
                    <p>${dest.description.substring(0, 95)}...</p>
                    <button class="btn btn-primary btn-sm btn-block" onclick="planTripFor('${dest.name}')">
                        <i class="fas fa-route"></i> Plan Trip Here
                    </button>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent);
        marker.addTo(AppState.map);
        AppState.markers.push(marker);
    });
}

function filterMap(category, btnElement) {
    document.querySelectorAll('.map-controls .filter-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    if (btnElement) btnElement.classList.add('active');

    renderMapMarkers(category);
}

function planTripFor(destinationName) {
    showPage('planner');
    const input = document.getElementById('destinationInput');
    if (input) {
        input.value = destinationName;
        input.focus();
    }
}

/* ============================================================
   3. SMART TRIP PLANNER ENGINE
   ============================================================ */
function setQuickDest(name) {
    const input = document.getElementById('destinationInput');
    if (input) {
        input.value = name;
    }
}

function generateSmartPlan() {
    const dest = document.getElementById('destinationInput').value.trim();
    const days = parseInt(document.getElementById('daysInput').value) || 3;
    const budget = parseInt(document.getElementById('budgetInput').value) || 15000;
    const mood = document.getElementById('moodInput').value || 'peace';
    const pace = document.getElementById('paceInput').value || 'moderate';

    if (!dest) {
        showToast('Please enter your travel destination!', 'warning');
        return;
    }

    if (days < 1 || days > 15) {
        showToast('Trip duration should be between 1 and 15 days.', 'warning');
        return;
    }

    if (budget < 1000) {
        showToast('Please enter a realistic travel budget.', 'warning');
        return;
    }

    // Budget distribution calculation
    const stayBudget = Math.round(budget * 0.40);
    const foodBudget = Math.round(budget * 0.25);
    const travelBudget = Math.round(budget * 0.20);
    const actBudget = Math.round(budget * 0.15);
    const dailyCost = Math.round(budget / days);

    // Curated activity pools by mood
    const activityMap = {
        peace: [
            { morning: "Sunrise yoga and mindfulness session overlooking the scenic valley", afternoon: "Leisure stroll through organic orchards and herbal tea tasting", evening: "Sunset viewpoint meditation followed by quiet stargazing" },
            { morning: "Visit to the ancient local monastery/temple for spiritual chants", afternoon: "Riverside picnic with fresh local bread, cheese, and farm produce", evening: "Unplugged evening reading and campfire beside the homestay" },
            { morning: "Birdwatching walk along serene pine and rhododendron forest trails", afternoon: "Traditional Ayurvedic herbal foot therapy session", evening: "Folk storytelling session with the homestay host elders" }
        ],
        culture: [
            { morning: "Guided heritage walk through the ancient stone monuments and bazaars", afternoon: "Hands-on traditional pottery or folk art masterclass with local artisans", evening: "Attend classical music recital or traditional temple evening aarti" },
            { morning: "Explore historical palace / fort secret tunnels and royal archives", afternoon: "Authentic culinary tasting tour: sampling GI-tagged traditional recipes", evening: "Visit tribal handloom weavers cooperative and learn charkha spinning" },
            { morning: "Early morning boat ride or temple walk experiencing timeless rituals", afternoon: "Village craft workshop: create your own souvenir to take home", evening: "Dinner with local artisan family discussing cultural preservation" }
        ],
        adventure: [
            { morning: "High-adrenaline river rafting or mountain ridge trek to alpine meadows", afternoon: "Rock climbing / bouldering or mountain bike excursion through rough trails", evening: "Campfire cooking and preparing route map for the next summit" },
            { morning: "Morning cliff jump or paragliding flight over the river canyon", afternoon: "Deep cave exploration or white-water river crossing", evening: "Wilderness camp setup and astronomy stargazing under clear skies" },
            { morning: "High-altitude waterfall trek and nature swimming in cold springs", afternoon: "Forest survival workshop learning indigenous edible plants", evening: "Celebratory barbecue dinner with local mountain guides" }
        ],
        family: [
            { morning: "Relaxed scenic sightseeing tour in an electric eco-shuttle", afternoon: "Interactive farm tour: tractor ride, cow milking, and sugarcane juice", evening: "Cultural dance show with puppets and children's folk games" },
            { morning: "Visit botanical garden and local natural history museum", afternoon: "Family pottery making session where everyone crafts a clay pot", evening: "Lakeside boat ride and authentic traditional dinner feast" },
            { morning: "Nature trail walk with easy gradients suitable for all age groups", afternoon: "Local handicraft shopping directly supporting village cooperatives", evening: "Family photo session in traditional attire against historic monument" }
        ]
    };

    const pool = activityMap[mood] || activityMap.peace;

    let dayCardsHTML = '';
    for (let i = 1; i <= days; i++) {
        const dayPlan = pool[(i - 1) % pool.length];
        dayCardsHTML += `
            <div class="day-card">
                <h4>
                    <span><i class="far fa-calendar-alt"></i> Day ${i}</span>
                    <span>₹${dailyCost} Est.</span>
                </h4>
                <div class="day-activity"><strong>🌅 Morning:</strong> ${dayPlan.morning}</div>
                <div class="day-activity"><strong>☀️ Afternoon:</strong> ${dayPlan.afternoon}</div>
                <div class="day-activity"><strong>🌙 Evening:</strong> ${dayPlan.evening}</div>
            </div>
        `;
    }

    const outputContainer = document.getElementById('plannerOutput');
    outputContainer.innerHTML = `
        <div class="plan-header">
            <div>
                <h3><i class="fas fa-sparkles" style="color:var(--accent);"></i> Custom Smart Itinerary for ${dest}</h3>
                <div class="plan-meta">
                    <span class="plan-meta-item"><i class="far fa-clock"></i> ${days} Days</span>
                    <span class="plan-meta-item"><i class="fas fa-wallet"></i> Total: ₹${budget.toLocaleString('en-IN')}</span>
                    <span class="plan-meta-item"><i class="fas fa-theater-masks"></i> Mood: ${mood.toUpperCase()}</span>
                    <span class="plan-meta-item"><i class="fas fa-leaf"></i> 100% Sustainable</span>
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary btn-sm" onclick="saveCurrentTrip('${dest}', ${days}, ${budget}, '${mood}')">
                    <i class="fas fa-bookmark"></i> Save Plan
                </button>
                <button class="btn btn-outline btn-sm" onclick="window.print()">
                    <i class="fas fa-print"></i> Export
                </button>
            </div>
        </div>

        <div class="budget-breakdown">
            <h4><i class="fas fa-chart-pie"></i> Smart Budget Allocation</h4>
            <div class="budget-bar">
                <div class="budget-segment seg-stay" style="width: 40%;" title="Homestay: ₹${stayBudget}"></div>
                <div class="budget-segment seg-food" style="width: 25%;" title="Local Food: ₹${foodBudget}"></div>
                <div class="budget-segment seg-travel" style="width: 20%;" title="Eco Transport: ₹${travelBudget}"></div>
                <div class="budget-segment seg-act" style="width: 15%;" title="Activities & Artisans: ₹${actBudget}"></div>
            </div>
            <div class="budget-legend">
                <div class="legend-item"><div class="legend-dot seg-stay"></div> Homestay: ₹${stayBudget}</div>
                <div class="legend-item"><div class="legend-dot seg-food"></div> Food: ₹${foodBudget}</div>
                <div class="legend-item"><div class="legend-dot seg-travel"></div> Transport: ₹${travelBudget}</div>
                <div class="legend-item"><div class="legend-dot seg-act"></div> Artisans: ₹${actBudget}</div>
            </div>
        </div>

        <div class="day-timeline">
            ${dayCardsHTML}
        </div>

        <div class="eco-tip-box">
            <i class="fas fa-seedling fa-2x"></i>
            <div>
                <strong>Sustainable Travel Tip for ${dest}:</strong>
                <p style="margin: 0; color: #2e7d32;">Stay at verified family homestays to inject 85% of your expenditure directly into the host family and local village micro-economy.</p>
            </div>
        </div>
    `;

    showToast(`Smart plan for ${dest} generated!`, 'success');
}

function saveCurrentTrip(destination, days, budget, mood) {
    const trip = {
        id: 'trip_' + Date.now(),
        destination,
        days,
        budget,
        mood,
        dateCreated: new Date().toLocaleDateString('en-IN')
    };

    AppState.savedTrips.push(trip);
    localStorage.setItem('dd_trips', JSON.stringify(AppState.savedTrips));
    updateFavoriteCounter();
    showToast('Plan saved to your profile!', 'success');
}

/* ============================================================
   4. DESTINATIONS RENDERER & FILTER
   ============================================================ */
function renderDestinations() {
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;

    grid.innerHTML = DreamData.destinations.map(dest => {
        const isFav = AppState.favorites.includes(dest.id);
        return `
            <div class="card" data-category="${dest.category}" data-name="${dest.name.toLowerCase()}">
                <div class="card-image-wrap">
                    <img src="${dest.image}" alt="${dest.name}" loading="lazy">
                    <span class="card-tag">${dest.tag}</span>
                    <button class="card-fav-btn" onclick="toggleFavorite('${dest.id}')" title="Save destination">
                        <i class="${isFav ? 'fas fa-heart' : 'far fa-heart'}"></i>
                    </button>
                </div>
                <div class="card-body">
                    <div class="card-title-row">
                        <h3>${dest.name}</h3>
                        <span class="badge badge-eco">${dest.category.toUpperCase()}</span>
                    </div>
                    <div class="card-location"><i class="fas fa-map-pin"></i> ${dest.state}</div>
                    <p class="card-desc">${dest.description}</p>
                    <div class="card-features">
                        <span><i class="fas fa-cloud-sun"></i> Best: ${dest.bestSeason}</span>
                        <span><i class="fas fa-star"></i> ${dest.highlight.split(',')[0]}</span>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline btn-sm" onclick="planTripFor('${dest.name}')">
                            <i class="fas fa-compass"></i> Plan Trip
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="showDestinationDetails('${dest.id}')">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterDestinations(category, btnElement) {
    document.querySelectorAll('#destFilterPills .filter-pill').forEach(pill => pill.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const searchKeyword = (document.getElementById('destSearchInput')?.value || '').toLowerCase();
    applyDestinationFilters(category, searchKeyword);
}

function searchDestinations(keyword) {
    const activePill = document.querySelector('#destFilterPills .filter-pill.active');
    const category = activePill ? activePill.getAttribute('data-filter') : 'all';
    applyDestinationFilters(category, keyword.toLowerCase());
}

function applyDestinationFilters(category, keyword) {
    const cards = document.querySelectorAll('#destinationsGrid .card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const cardName = card.getAttribute('data-name');

        const matchesCat = (category === 'all' || cardCat === category);
        const matchesSearch = (!keyword || cardName.includes(keyword));

        if (matchesCat && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function showDestinationDetails(destId) {
    const dest = DreamData.destinations.find(d => d.id === destId);
    if (!dest) return;

    openModal(`
        <div class="modal-header">
            <h3>${dest.name} - ${dest.state}</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <img src="${dest.image}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
            <p><strong>Category:</strong> ${dest.category.toUpperCase()} | <strong>Best Season:</strong> ${dest.bestSeason}</p>
            <p style="margin: 1rem 0; line-height: 1.7;">${dest.description}</p>
            <div style="background: var(--bg-body); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <strong>✨ Cultural Highlights:</strong>
                <p style="margin-top: 4px;">${dest.highlight}</p>
            </div>
            <button class="btn btn-primary btn-block" onclick="closeModal(); planTripFor('${dest.name}')">
                <i class="fas fa-route"></i> Plan a Trip to ${dest.name}
            </button>
        </div>
    `);
}

/* ============================================================
   5. HOMESTAYS / LISTINGS RENDERER
   ============================================================ */
function renderListings() {
    const grid = document.getElementById('listingsGrid');
    if (!grid) return;

    grid.innerHTML = DreamData.listings.map(item => `
        <div class="card" data-verified="${item.verified}">
            <div class="card-image-wrap">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="card-tag"><i class="fas fa-shield-alt"></i> Verified</span>
            </div>
            <div class="card-body">
                <div class="card-title-row">
                    <h3>${item.title}</h3>
                    <span style="color: #f59e0b; font-weight: 600;"><i class="fas fa-star"></i> ${item.rating}</span>
                </div>
                <div class="card-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</div>
                <p class="card-desc">${item.description}</p>
                <div class="card-features">
                    ${item.amenities.slice(0, 3).map(a => `<span>${a}</span>`).join('')}
                </div>
                <div class="card-footer">
                    <div class="card-price">₹${item.price} <span>/ night</span></div>
                    <button class="btn btn-primary btn-sm" onclick="openBookingModal('homestay', '${item.id}')">
                        Book Homestay
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/* ============================================================
   6. MARKETPLACE / EXPERIENCES RENDERER
   ============================================================ */
function renderExperiences() {
    const grid = document.getElementById('marketplaceGrid');
    if (!grid) return;

    grid.innerHTML = DreamData.experiences.map(exp => `
        <div class="card">
            <div class="card-image-wrap">
                <img src="${exp.image}" alt="${exp.title}" loading="lazy">
                <span class="card-tag">${exp.badge}</span>
            </div>
            <div class="card-body">
                <div class="card-title-row">
                    <h3>${exp.title}</h3>
                    <span class="badge badge-artisan">${exp.category}</span>
                </div>
                <div class="card-location"><i class="fas fa-user-circle"></i> Artisan: ${exp.artisan} | ${exp.location}</div>
                <p class="card-desc">${exp.description}</p>
                <div class="card-features">
                    <span><i class="far fa-clock"></i> ${exp.duration}</span>
                    <span>Direct Artisan Income</span>
                </div>
                <div class="card-footer">
                    <div class="card-price">₹${exp.price} <span>/ participant</span></div>
                    <button class="btn btn-secondary btn-sm" onclick="openBookingModal('workshop', '${exp.id}')">
                        Book Workshop
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/* ============================================================
   7. GUIDES & COMMUNITY RENDERER
   ============================================================ */
function renderGuides() {
    const grid = document.getElementById('guidesGrid');
    if (!grid) return;

    grid.innerHTML = DreamData.guides.map(guide => `
        <div class="guide-card">
            <div class="guide-header">
                <div class="guide-avatar">${guide.avatar}</div>
                <div class="guide-header-info">
                    <h3>${guide.name}</h3>
                    <p style="color: var(--accent); font-weight: 500;"><i class="fas fa-certificate"></i> ${guide.badge}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${guide.location}</p>
                </div>
            </div>
            <div class="guide-details">
                <p>${guide.bio}</p>
                <div style="margin-top: 0.5rem;">
                    <strong>Specialization:</strong> ${guide.specialization}
                </div>
                <div class="guide-languages">
                    ${guide.languages.map(l => `<span>${l}</span>`).join('')}
                </div>
            </div>
            <div class="card-footer">
                <div class="card-price">₹${guide.feePerDay} <span>/ day</span></div>
                <button class="btn btn-primary btn-sm" onclick="openBookingModal('guide', '${guide.id}')">
                    Connect & Book
                </button>
            </div>
        </div>
    `).join('');
}

function renderCommunity() {
    const grid = document.getElementById('communityGrid');
    if (!grid) return;

    grid.innerHTML = DreamData.communityMembers.map(member => `
        <div class="community-card">
            <div class="avatar">${member.avatar}</div>
            <h3>${member.name}</h3>
            <div class="village"><i class="fas fa-home"></i> ${member.village}</div>
            <p><strong>Culture:</strong> ${member.culture}</p>
            <blockquote>"${member.quote}"</blockquote>
            <p style="font-size: 0.8rem; color: var(--text-muted);"><i class="fas fa-language"></i> Speaks: ${member.languages}</p>
            <button class="btn btn-outline btn-sm btn-block" style="margin-top: 1rem;" onclick="showToast('Connecting with ${member.name}...', 'info')">
                Send Warm Namaste 🙏
            </button>
        </div>
    `).join('');
}

/* ============================================================
   8. REVIEWS & SUBMISSION SYSTEM
   ============================================================ */
function renderReviews() {
    const container = document.getElementById('reviewsList');
    if (!container) return;

    const allReviews = [...AppState.reviews, ...DreamData.reviews];

    container.innerHTML = allReviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <h4>${r.trip || 'Authentic Cultural Journey'}</h4>
                <div class="review-stars">${'⭐'.repeat(r.rating || 5)}</div>
            </div>
            <div class="review-author">
                <strong>${r.author}</strong> from ${r.city || 'India'} • 📅 ${r.date || 'Recent'} 
                ${r.tag ? `• <span class="badge badge-verified">${r.tag}</span>` : ''}
            </div>
            <p class="review-text">${r.text}</p>
        </div>
    `).join('');
}

function openAddReviewModal() {
    openModal(`
        <div class="modal-header">
            <h3>Share Your Travel Experience</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <form id="reviewForm" onsubmit="submitReview(event)">
                <div class="form-group">
                    <label>Your Name</label>
                    <input type="text" id="revName" required placeholder="e.g. Neha Sharma">
                </div>
                <div class="form-group">
                    <label>Your City</label>
                    <input type="text" id="revCity" required placeholder="e.g. Mumbai">
                </div>
                <div class="form-group">
                    <label>Trip / Experience Name</label>
                    <input type="text" id="revTrip" required placeholder="e.g. Chitkul Village Stay">
                </div>
                <div class="form-group">
                    <label>Rating (1 - 5 Stars)</label>
                    <select id="revRating">
                        <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                        <option value="4">⭐⭐⭐⭐ (Very Good)</option>
                        <option value="3">⭐⭐⭐ (Good)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Your Story / Review</label>
                    <textarea id="revText" required rows="4" style="width: 100%; padding: 0.75rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm);" placeholder="Tell us how you connected with locals and supported sustainable travel..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Post Review 🚀</button>
            </form>
        </div>
    `);
}

function submitReview(e) {
    e.preventDefault();
    const newRev = {
        id: 'rev_' + Date.now(),
        author: document.getElementById('revName').value,
        city: document.getElementById('revCity').value,
        trip: document.getElementById('revTrip').value,
        rating: parseInt(document.getElementById('revRating').value),
        text: document.getElementById('revText').value,
        date: 'Just now',
        tag: 'Verified Traveler'
    };

    AppState.reviews.unshift(newRev);
    localStorage.setItem('dd_reviews', JSON.stringify(AppState.reviews));
    renderReviews();
    closeModal();
    showToast('Your review has been published! Thank you.', 'success');
}

/* ============================================================
   9. CULTURE ACCORDION
   ============================================================ */
function initCultureAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            items.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ============================================================
   10. BOOKING MODALS & STATE PERSISTENCE
   ============================================================ */
function openBookingModal(type, itemId) {
    let title = '';
    let price = 0;
    let label = '';

    if (type === 'homestay') {
        const item = DreamData.listings.find(l => l.id === itemId);
        if (!item) return;
        title = item.title;
        price = item.price;
        label = `₹${price}/night`;
    } else if (type === 'workshop') {
        const item = DreamData.experiences.find(e => e.id === itemId);
        if (!item) return;
        title = item.title;
        price = item.price;
        label = `₹${price}/participant`;
    } else if (type === 'guide') {
        const item = DreamData.guides.find(g => g.id === itemId);
        if (!item) return;
        title = `Guide: ${item.name}`;
        price = item.feePerDay;
        label = `₹${price}/day`;
    }

    openModal(`
        <div class="modal-header">
            <h3>Book / Inquire: ${title}</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <p style="margin-bottom: 1rem; color: var(--text-dark);"><strong>Base Price:</strong> ${label}</p>
            <form onsubmit="confirmBooking(event, '${type}', '${title}', ${price})">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="bookName" required placeholder="e.g. Aryan Patel">
                </div>
                <div class="form-group">
                    <label>Contact Phone / WhatsApp</label>
                    <input type="tel" id="bookPhone" required placeholder="+91 98765 43210">
                </div>
                <div class="form-group">
                    <label>Travel Date</label>
                    <input type="date" id="bookDate" required>
                </div>
                <div class="form-group">
                    <label>Number of People / Units</label>
                    <input type="number" id="bookUnits" value="1" min="1" max="10" oninput="updateBookingTotal(${price})">
                </div>
                <div style="background: var(--bg-body); padding: 1rem; border-radius: 8px; margin-bottom: 1.25rem;">
                    <strong>Estimated Total:</strong> <span id="bookingTotal" style="font-size: 1.2rem; color: var(--primary); font-weight: 700;">₹${price}</span>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Confirm Booking Inquiry ✨</button>
            </form>
        </div>
    `);

    // Set min date to today
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }
}

function updateBookingTotal(unitPrice) {
    const units = parseInt(document.getElementById('bookUnits').value) || 1;
    const totalSpan = document.getElementById('bookingTotal');
    if (totalSpan) {
        totalSpan.textContent = `₹${(unitPrice * units).toLocaleString('en-IN')}`;
    }
}

function confirmBooking(e, type, title, price) {
    e.preventDefault();
    const name = document.getElementById('bookName').value;
    const phone = document.getElementById('bookPhone').value;
    const date = document.getElementById('bookDate').value;
    const units = document.getElementById('bookUnits').value;
    const total = price * units;

    const booking = {
        id: 'book_' + Date.now(),
        type,
        title,
        name,
        phone,
        date,
        units,
        total,
        status: 'Confirmed'
    };

    AppState.bookings.push(booking);
    localStorage.setItem('dd_bookings', JSON.stringify(AppState.bookings));

    closeModal();
    showToast(`Booking request for ${title} submitted! Our team will contact you.`, 'success');
}

/* ============================================================
   11. FAVORITES & PROFILE MODAL
   ============================================================ */
function toggleFavorite(id) {
    const index = AppState.favorites.indexOf(id);
    if (index > -1) {
        AppState.favorites.splice(index, 1);
        showToast('Removed from favorites', 'info');
    } else {
        AppState.favorites.push(id);
        showToast('Saved to your favorites ❤️', 'success');
    }
    localStorage.setItem('dd_favorites', JSON.stringify(AppState.favorites));
    updateFavoriteCounter();
    renderDestinations();
}

function updateFavoriteCounter() {
    const pill = document.getElementById('savedPill');
    if (pill) {
        const total = AppState.favorites.length + AppState.savedTrips.length;
        pill.innerHTML = `<i class="fas fa-heart"></i> Saved (${total})`;
    }
}

function showSavedModal() {
    const favDests = DreamData.destinations.filter(d => AppState.favorites.includes(d.id));

    let html = `
        <div class="modal-header">
            <h3><i class="fas fa-bookmark"></i> Your Saved Items & Trips</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <h4 style="margin-bottom: 0.75rem;">❤️ Favorite Destinations (${favDests.length})</h4>
    `;

    if (favDests.length === 0) {
        html += `<p style="font-size: 0.9rem; margin-bottom: 1.5rem;">No destinations saved yet. Click the heart icon on any card to save!</p>`;
    } else {
        html += `<ul style="list-style: none; margin-bottom: 1.5rem;">`;
        favDests.forEach(d => {
            html += `
                <li style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                    <span><strong>${d.name}</strong> (${d.state})</span>
                    <button class="btn btn-outline btn-sm" onclick="closeModal(); planTripFor('${d.name}')">Plan Trip</button>
                </li>
            `;
        });
        html += `</ul>`;
    }

    html += `<h4 style="margin-bottom: 0.75rem;">📅 Saved Custom Itineraries (${AppState.savedTrips.length})</h4>`;
    if (AppState.savedTrips.length === 0) {
        html += `<p style="font-size: 0.9rem;">No itineraries saved yet. Use the Smart Planner and click "Save Plan".</p>`;
    } else {
        html += `<ul style="list-style: none;">`;
        AppState.savedTrips.forEach(t => {
            html += `
                <li style="padding: 10px; background: var(--bg-body); border-radius: 6px; margin-bottom: 8px; border: 1px solid var(--border-color);">
                    <strong>${t.destination}</strong> - ${t.days} Days (₹${t.budget.toLocaleString('en-IN')})
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Mood: ${t.mood.toUpperCase()} • Saved on: ${t.dateCreated}</div>
                </li>
            `;
        });
        html += `</ul>`;
    }

    html += `</div>`;
    openModal(html);
}

/* ============================================================
   12. MODAL & TOAST UTILITIES
   ============================================================ */
function openModal(contentHTML) {
    const modalBox = document.getElementById('modalBox');
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalBox && modalOverlay) {
        modalBox.innerHTML = contentHTML;
        modalOverlay.classList.add('active');
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
}

function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'warning') icon = 'fas fa-exclamation-triangle';

    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ============================================================
   13. USER AUTHENTICATION & PROFILE SYSTEM
   ============================================================ */
function updateNavAuth() {
    const container = document.getElementById('navAuthContainer');
    if (!container) return;

    if (AppState.currentUser) {
        const user = AppState.currentUser;
        const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
        container.innerHTML = `
            <div class="user-profile-pill" id="userProfilePill" onclick="toggleUserDropdown(event)">
                <div class="user-avatar-circle">${initials}</div>
                <span class="user-display-name">${user.name.split(' ')[0]}</span>
                <i class="fas fa-chevron-down" style="font-size: 0.75rem;"></i>
                
                <div class="user-dropdown-menu" id="userDropdownMenu">
                    <div class="user-dropdown-header">
                        <strong>${user.name}</strong>
                        <small>${user.email}</small>
                        <span class="badge badge-verified" style="margin-top: 4px; display:inline-block;">${user.role || 'Traveler'}</span>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="#profile" onclick="showProfileModal(); return false;"><i class="fas fa-user-circle"></i> My Profile</a>
                    <a href="#saved" onclick="showSavedModal(); return false;"><i class="fas fa-heart"></i> Saved Items (${AppState.favorites.length + AppState.savedTrips.length})</a>
                    <a href="#bookings" onclick="showMyBookingsModal(); return false;"><i class="fas fa-suitcase"></i> My Bookings (${AppState.bookings.length})</a>
                    <div class="dropdown-divider"></div>
                    <a href="#logout" onclick="handleLogout(); return false;" class="dropdown-logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button class="btn btn-login-nav" onclick="showPage('authPage')">
                <i class="fas fa-user-circle"></i> <span>Login / Sign Up</span>
            </button>
        `;
    }
}

function toggleUserDropdown(event) {
    event.stopPropagation();
    const menu = document.getElementById('userDropdownMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

function switchAuthTab(tab) {
    const loginTab = document.getElementById('authTabLogin');
    const registerTab = document.getElementById('authTabRegister');
    const loginForm = document.getElementById('loginFormWrapper');
    const registerForm = document.getElementById('registerFormWrapper');

    if (!loginTab || !registerTab || !loginForm || !registerForm) return;

    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function togglePasswordVisibility(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showToast('Please enter both email and password.', 'warning');
        return;
    }

    let existingUser = AppState.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!existingUser) {
        existingUser = {
            id: 'user_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            role: 'Traveler'
        };
        AppState.users.push(existingUser);
        localStorage.setItem('dd_users', JSON.stringify(AppState.users));
    }

    AppState.currentUser = existingUser;
    localStorage.setItem('dd_current_user', JSON.stringify(existingUser));

    updateNavAuth();
    showToast(`Welcome back, ${existingUser.name}!`, 'success');
    showPage('homePage');
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    if (!name || !email || !password) {
        showToast('Please fill all required fields.', 'warning');
        return;
    }

    const newUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        phone,
        role,
        dateJoined: new Date().toLocaleDateString('en-IN')
    };

    AppState.users.push(newUser);
    localStorage.setItem('dd_users', JSON.stringify(AppState.users));

    AppState.currentUser = newUser;
    localStorage.setItem('dd_current_user', JSON.stringify(newUser));

    updateNavAuth();
    showToast(`Account created! Welcome to Dream Destination, ${name}.`, 'success');
    showPage('homePage');
}

function quickDemoLogin(role = 'Evaluator') {
    const demoUser = {
        id: 'user_evaluator',
        name: 'Dr. Rajesh Kumar',
        email: 'evaluator@btech-cse.edu.in',
        phone: '+91 98765 00000',
        role: role === 'Host' ? 'Homestay Host' : 'Academic Evaluator (Traveler)',
        dateJoined: 'Today'
    };

    AppState.currentUser = demoUser;
    localStorage.setItem('dd_current_user', JSON.stringify(demoUser));

    updateNavAuth();
    showToast(`Logged in as demo ${demoUser.name} (${demoUser.role})!`, 'success');
    showPage('homePage');
}

function handleLogout() {
    AppState.currentUser = null;
    localStorage.removeItem('dd_current_user');
    updateNavAuth();
    showToast('You have been logged out safely.', 'info');
    showPage('homePage');
}

function showProfileModal() {
    if (!AppState.currentUser) return;
    const user = AppState.currentUser;

    openModal(`
        <div class="modal-header">
            <h3><i class="fas fa-id-card"></i> Traveler Profile</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div class="user-avatar-circle" style="width: 72px; height: 72px; font-size: 1.8rem; margin: 0 auto 0.75rem auto;">
                    ${user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <h3>${user.name}</h3>
                <p style="color: var(--text-muted);">${user.email}</p>
                <span class="badge badge-verified" style="margin-top: 6px;">${user.role || 'Traveler'}</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: var(--bg-body); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid var(--border-color);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${AppState.savedTrips.length}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Saved Itineraries</div>
                </div>
                <div style="background: var(--bg-body); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid var(--border-color);">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent);">${AppState.bookings.length}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Bookings & Inquiries</div>
                </div>
            </div>

            <button class="btn btn-outline btn-block" onclick="closeModal(); showSavedModal();" style="margin-bottom: 0.5rem;">
                <i class="fas fa-bookmark"></i> View Saved Items
            </button>
            <button class="btn btn-secondary btn-block" onclick="closeModal(); handleLogout();">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
    `);
}

function showMyBookingsModal() {
    let html = `
        <div class="modal-header">
            <h3><i class="fas fa-suitcase"></i> My Bookings & Inquiries</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
    `;

    if (AppState.bookings.length === 0) {
        html += `<p style="text-align:center; padding: 2rem 0; color: var(--text-muted);">No booking requests made yet. Explore our Verified Homestays or Artisan Hub to book!</p>`;
    } else {
        html += `<div style="display: flex; flex-direction: column; gap: 10px;">`;
        AppState.bookings.forEach(b => {
            html += `
                <div style="padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-body);">
                    <div style="display: flex; justify-content: space-between; font-weight: 600;">
                        <span>${b.title}</span>
                        <span class="badge badge-verified">${b.status || 'Confirmed'}</span>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                        📅 Date: ${b.date} | 👥 Units: ${b.units} | <strong>Total: ₹${(b.total || 0).toLocaleString('en-IN')}</strong>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    }

    html += `</div>`;
    openModal(html);
}

