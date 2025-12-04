// Buy Page JavaScript - All Button Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFilterTabs();
    initCarDropdown();
    initToggleButtons();
    initPriceButtons();
    initTransmissionButtons();
    initColorSwatches();
    initPagination();
    initSortDropdown();
    initCheckboxes();
    initActionButtons();
    initMoreFeatures();
    
    // Filter change handler
    initFilterChangeHandlers();
    
    // Load cars on page load
    loadCars();
});

// Filter Tabs (All, Saved, History)
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            console.log('Filter tab changed to:', tabType);
            
            // Handle tab switching
            handleFilterTabChange(tabType);
        });
    });
}

// Handle filter tab changes
function handleFilterTabChange(tabType) {
    const filtersContent = document.querySelector('.filters-content');
    const savedSection = document.getElementById('savedFiltersSection');
    const historySection = document.getElementById('searchHistorySection');
    
    if (tabType === 'all') {
        // Show all filters
        if (filtersContent) {
            filtersContent.style.display = 'block';
        }
        // Hide saved and history sections
        if (savedSection) savedSection.style.display = 'none';
        if (historySection) historySection.style.display = 'none';
        applyFilters();
    } else if (tabType === 'saved') {
        // Show saved filters functionality
        if (filtersContent) filtersContent.style.display = 'none';
        if (historySection) historySection.style.display = 'none';
        showSavedFilters();
    } else if (tabType === 'history') {
        // Show search history functionality
        if (filtersContent) filtersContent.style.display = 'none';
        if (savedSection) savedSection.style.display = 'none';
        showSearchHistory();
    }
}

// Show saved filters
function showSavedFilters() {
    // Create or show saved filters section
    let savedSection = document.getElementById('savedFiltersSection');
    
    if (!savedSection) {
        savedSection = document.createElement('div');
        savedSection.id = 'savedFiltersSection';
        savedSection.className = 'saved-filters-section';
        savedSection.innerHTML = `
            <div style="padding: 20px; text-align: center; background: #f5f5f5; border-radius: 8px; margin-top: 20px;">
                <h3 style="margin-bottom: 15px; color: #333;">Saved Filters</h3>
                <p style="color: #666; margin-bottom: 20px;">You haven't saved any filters yet.</p>
                <p style="color: #666; font-size: 14px;">Save your current filter settings to quickly apply them later.</p>
            </div>
        `;
        
        const filtersContent = document.querySelector('.filters-content');
        if (filtersContent) {
            filtersContent.insertAdjacentElement('afterend', savedSection);
        }
    }
    
    // Hide regular filters, show saved section
    const filtersContent = document.querySelector('.filters-content');
    if (filtersContent) {
        filtersContent.style.display = 'none';
    }
    savedSection.style.display = 'block';
}

// Show search history
function showSearchHistory() {
    // Create or show search history section
    let historySection = document.getElementById('searchHistorySection');
    
    if (!historySection) {
        historySection = document.createElement('div');
        historySection.id = 'searchHistorySection';
        historySection.className = 'search-history-section';
        historySection.innerHTML = `
            <div style="padding: 20px; text-align: center; background: #f5f5f5; border-radius: 8px; margin-top: 20px;">
                <h3 style="margin-bottom: 15px; color: #333;">Search History</h3>
                <p style="color: #666; margin-bottom: 20px;">Your recent searches will appear here.</p>
                <p style="color: #666; font-size: 14px;">Start searching to see your history.</p>
            </div>
        `;
        
        const filtersContent = document.querySelector('.filters-content');
        if (filtersContent) {
            filtersContent.insertAdjacentElement('afterend', historySection);
        }
    }
    
    // Hide regular filters, show history section
    const filtersContent = document.querySelector('.filters-content');
    if (filtersContent) {
        filtersContent.style.display = 'none';
    }
    historySection.style.display = 'block';
}

// Add Car Dropdown
function initCarDropdown() {
    const addCarBtn = document.getElementById('addCarBtn');
    const carDropdown = document.getElementById('carDropdown');
    const carSearchInput = document.getElementById('carSearchInput');
    const carList = document.getElementById('carList');
    
    // Popular car makes/models
    const carMakes = [
        'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota',
        'Ford', 'Opel', 'Skoda', 'Hyundai', 'Kia', 'Peugeot',
        'Renault', 'Citroen', 'Fiat', 'Nissan', 'Mazda', 'Honda',
        'Volvo', 'Seat', 'Suzuki', 'Mini', 'Jaguar', 'Land Rover'
    ];
    
    if (addCarBtn) {
        addCarBtn.addEventListener('click', function() {
            const isVisible = carDropdown.style.display === 'block';
            carDropdown.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                populateCarList(carMakes);
                carSearchInput.focus();
            }
        });
    }
    
    // Search functionality
    if (carSearchInput) {
        carSearchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = carMakes.filter(make => 
                make.toLowerCase().includes(searchTerm)
            );
            populateCarList(filtered);
        });
    }
    
    function populateCarList(cars) {
        if (!carList) return;
        carList.innerHTML = '';
        
        cars.forEach(car => {
            const item = document.createElement('div');
            item.className = 'car-item';
            item.textContent = car;
            item.addEventListener('click', function() {
                addCarBtn.textContent = car;
                carDropdown.style.display = 'none';
                carSearchInput.value = '';
                console.log('Selected car:', car);
                applyFilters();
            });
            carList.appendChild(item);
        });
    }
}

// Toggle Buttons (Installments/Cash, Automatic/Manual)
function initToggleButtons() {
    const toggleButtons = document.querySelectorAll('.btn-toggle');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const group = this.parentElement;
            const siblings = group.querySelectorAll('.btn-toggle');
            
            // Check if this is a single-select group (remove active from siblings)
            if (group.classList.contains('price-buttons') || 
                group.classList.contains('transmission-buttons')) {
                siblings.forEach(b => b.classList.remove('active'));
            }
            
            // Toggle active state
            this.classList.toggle('active');
            applyFilters();
        });
    });
}

// Price Buttons
function initPriceButtons() {
    // Already handled by initToggleButtons, but can add specific logic here
}

// Transmission Buttons
function initTransmissionButtons() {
    // Already handled by initToggleButtons
}

// Color Swatches
function initColorSwatches() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Toggle selection
            this.classList.toggle('selected');
            const color = this.getAttribute('data-color');
            console.log('Color selected:', color);
            applyFilters();
        });
    });
}

// Pagination
let currentPage = 1;
const totalPages = 44508;

function initPagination() {
    const prevBtns = document.querySelectorAll('.pagination-btn.prev');
    const nextBtns = document.querySelectorAll('.pagination-btn.next');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    // Previous buttons
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                loadCars();
            }
        });
    });
    
    // Next buttons
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                loadCars();
            }
        });
    });
    
    // Page number buttons
    pageNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = parseInt(this.getAttribute('data-page'));
            if (page && page !== currentPage) {
                currentPage = page;
                updatePagination();
                loadCars();
            }
        });
    });
}

function updatePagination() {
    const prevBtns = document.querySelectorAll('.pagination-btn.prev');
    const nextBtns = document.querySelectorAll('.pagination-btn.next');
    const allPageNumbers = document.querySelectorAll('.page-number');
    
    // Update prev buttons
    prevBtns.forEach(btn => {
        btn.disabled = currentPage === 1;
    });
    
    // Update next buttons
    nextBtns.forEach(btn => {
        btn.disabled = currentPage === totalPages;
    });
    
    // Update active page number
    allPageNumbers.forEach(btn => {
        const page = parseInt(btn.getAttribute('data-page'));
        btn.classList.toggle('active', page === currentPage);
    });
    
    console.log('Page changed to:', currentPage);
}

// Sort Dropdown
function initSortDropdown() {
    const sortDropdown = document.getElementById('sortDropdown');
    
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function() {
            const sortValue = this.value;
            console.log('Sort changed to:', sortValue);
            loadCars();
        });
    }
}

// Checkboxes
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.filter-checkboxes input[type="checkbox"], .feature-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Checkbox changed:', this.id || this.value, this.checked);
            applyFilters();
        });
    });
}

// Action Buttons
function initActionButtons() {
    // Detailed Search Button
    const detailedSearchBtn = document.getElementById('detailedSearchBtn');
    if (detailedSearchBtn) {
        detailedSearchBtn.addEventListener('click', function() {
            console.log('Detailed search clicked');
            // Collect all filter values
            const filters = collectFilters();
            console.log('Current filters:', filters);
            // Apply all filters
            applyFilters();
            console.log('Detailed search applied with filters:', collectFilters());
        });
    }
    
    // Find Out More Button
    const findOutMoreBtn = document.getElementById('findOutMoreBtn');
    if (findOutMoreBtn) {
        findOutMoreBtn.addEventListener('click', function() {
            console.log('Find out more clicked');
            // Redirect to how it works page
            window.location.href = '/how-it-works';
        });
    }
    
    // Favorites Button
    const favoritesBtn = document.querySelector('.favorites-btn');
    if (favoritesBtn) {
        favoritesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/favorites';
        });
    }
    
    // Cart Button
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/orders';
        });
    }
    
    // Language selector
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    const langSelector = document.querySelector('.language-selector');
    
    if (langBtn && langMenu && langSelector) {
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            langSelector.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langSelector.contains(e.target)) {
                langSelector.classList.remove('active');
            }
        });
        
        // Handle language selection
        const langOptions = langMenu.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Remove active class from all options
                langOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update button flag
                const selectedFlag = this.querySelector('.lang-flag').cloneNode(true);
                const btnFlag = langBtn.querySelector('.flag-icon');
                if (btnFlag && selectedFlag) {
                    btnFlag.replaceWith(selectedFlag);
                    selectedFlag.classList.add('flag-icon');
                }
                
                // Close dropdown
                langSelector.classList.remove('active');
            });
        });
    }
    
    // Login Button
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            console.log('Login clicked');
            // Show login modal or redirect to login page
            // For now, just log - in production would show login form
        });
    }
}

// More Features Button
function initMoreFeatures() {
    const moreFeaturesBtn = document.getElementById('moreFeaturesBtn');
    if (moreFeaturesBtn) {
        moreFeaturesBtn.addEventListener('click', function() {
            const featuresList = document.querySelector('.features-list');
            if (featuresList) {
                // Add more features (this would typically come from an API)
                const additionalFeatures = [
                    'Leather seats',
                    'Sunroof',
                    'Parking sensors',
                    'Reverse camera',
                    'Cruise control',
                    'Keyless entry',
                    'LED headlights',
                    'Xenon headlights'
                ];
                
                additionalFeatures.forEach(feature => {
                    const label = document.createElement('label');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'feature-checkbox';
                    checkbox.value = feature.toLowerCase().replace(/\s+/g, '-');
                    
                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(' ' + feature));
                    label.addEventListener('change', function() {
                        applyFilters();
                    });
                    
                    featuresList.appendChild(label);
                });
                
                this.style.display = 'none';
                console.log('More features loaded');
            }
        });
    }
}

// Collect all filter values
function collectFilters() {
    const filters = {
        car: document.getElementById('addCarBtn')?.textContent !== 'Add a car' ? document.getElementById('addCarBtn').textContent : null,
        priceFrom: document.getElementById('priceFrom')?.value || null,
        priceTo: document.getElementById('priceTo')?.value || null,
        priceType: document.querySelector('.price-buttons .btn-toggle.active')?.getAttribute('data-type') || null,
        vatDeduction: document.getElementById('vatDeduction')?.checked || false,
        discountedCars: document.getElementById('discountedCars')?.checked || false,
        premiumPartners: document.getElementById('premiumPartners')?.checked || false,
        registrationFrom: document.getElementById('registrationFrom')?.value || null,
        registrationTo: document.getElementById('registrationTo')?.value || null,
        mileageFrom: document.getElementById('mileageFrom')?.value || null,
        mileageTo: document.getElementById('mileageTo')?.value || null,
        transmission: document.querySelector('.transmission-buttons .btn-toggle.active')?.getAttribute('data-type') || null,
        fuelType1: document.getElementById('fuelType1')?.value || null,
        fuelType2: document.getElementById('fuelType2')?.value || null,
        powerFrom: document.getElementById('powerFrom')?.value || null,
        powerTo: document.getElementById('powerTo')?.value || null,
        vehicleType: document.getElementById('vehicleType')?.value || null,
        drive4x4: document.getElementById('drive4x4')?.checked || false,
        colors: Array.from(document.querySelectorAll('.color-swatch.selected')).map(s => s.getAttribute('data-color')),
        features: Array.from(document.querySelectorAll('.feature-checkbox:checked')).map(c => c.value)
    };
    
    return filters;
}

// Apply filters (this would typically send to backend)
function applyFilters() {
    const filters = collectFilters();
    console.log('Applying filters:', filters);
    
    // Update results count (simulated)
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        // Simulate filtered results
        const baseCount = 88110;
        const filteredCount = Math.floor(baseCount * (0.5 + Math.random() * 0.5));
        resultsCount.textContent = filteredCount.toLocaleString() + ' results';
    }
    
    // Reload cars with new filters
    loadCars();
}

// Sample car data for showcase
const sampleCars = [
    {
        id: 1,
        make: 'BMW',
        model: '3 Series 330i',
        year: 2023,
        mileage: 28500,
        fuel: 'Petrol',
        transmission: 'Automatic',
        price: 12150000,
        location: 'Karachi, Pakistan',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
        inspected: true
    },
    {
        id: 2,
        make: 'Mercedes-Benz',
        model: 'C-Class C200',
        year: 2022,
        mileage: 45000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        price: 11500000,
        location: 'Lahore, Pakistan',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
        inspected: true
    },
    {
        id: 3,
        make: 'Toyota',
        model: 'Corolla Altis',
        year: 2023,
        mileage: 15000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        price: 4850000,
        location: 'Islamabad, Pakistan',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
        inspected: true
    },
    {
        id: 4,
        make: 'Honda',
        model: 'Civic 1.8L',
        year: 2022,
        mileage: 32000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        price: 4200000,
        location: 'Karachi, Pakistan',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
        inspected: false
    },
    {
        id: 5,
        make: 'Audi',
        model: 'A4 2.0 TFSI',
        year: 2023,
        mileage: 12000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        price: 13500000,
        location: 'Lahore, Pakistan',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
        inspected: true
    },
    {
        id: 6,
        make: 'Suzuki',
        model: 'Alto VXR',
        year: 2023,
        mileage: 8000,
        fuel: 'Petrol',
        transmission: 'Manual',
        price: 1850000,
        location: 'Islamabad, Pakistan',
        image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&h=400&fit=crop',
        inspected: true
    },
    {
        id: 7,
        make: 'Toyota',
        model: 'Fortuner 4x4',
        year: 2022,
        mileage: 38000,
        fuel: 'Diesel',
        transmission: 'Automatic',
        price: 8500000,
        location: 'Karachi, Pakistan',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
        inspected: true
    },
    {
        id: 8,
        make: 'Hyundai',
        model: 'Elantra 1.6L',
        year: 2023,
        mileage: 20000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        price: 3950000,
        location: 'Lahore, Pakistan',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=600&h=400&fit=crop',
        inspected: false
    }
];

// Load cars (simulated)
function loadCars() {
    const carListings = document.getElementById('carListings');
    if (!carListings) return;
    
    // Show loading state briefly
    carListings.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'car-listing-skeleton';
        skeleton.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-line long"></div>
                <div class="skeleton-line medium"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-line medium"></div>
            </div>
        `;
        carListings.appendChild(skeleton);
    }
    
    // Simulate loading delay then show cars
    setTimeout(() => {
        carListings.innerHTML = '';
        
        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = sampleCars.length + ' results (Demo)';
        }
        
        // Display sample cars
        sampleCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-listing-card';
            carCard.innerHTML = `
                <div class="car-listing-image">
                    <img src="${car.image}" alt="${car.make} ${car.model}" onerror="this.src='https://via.placeholder.com/300x200?text=${car.make}+${car.model}'">
                    ${car.inspected ? '<span class="car-badge">Inspected</span>' : ''}
                    <button class="btn-favorite-listing" title="Add to favorites">♡</button>
                </div>
                <div class="car-listing-content">
                    <h3 class="car-listing-title">${car.make} ${car.model}</h3>
                    <div class="car-listing-specs">
                        <span>${car.year}</span>
                        <span>•</span>
                        <span>${car.mileage.toLocaleString()} km</span>
                        <span>•</span>
                        <span>${car.fuel}</span>
                        <span>•</span>
                        <span>${car.transmission}</span>
                    </div>
                    <div class="car-listing-location">📍 ${car.location}</div>
                    <div class="car-listing-price">Rs. ${car.price.toLocaleString()}</div>
                    <div class="car-listing-actions">
                        <button class="btn-view-details" onclick="viewCarDetails(${car.id})">View Details</button>
                        <button class="btn-compare" onclick="addToCompare(${car.id})">Compare</button>
                    </div>
                </div>
            `;
            carListings.appendChild(carCard);
        });
        
        console.log('Cars loaded for page:', currentPage);
    }, 800);
}

// Filter change handlers for all inputs
function initFilterChangeHandlers() {
    // Price inputs
    const priceInputs = document.querySelectorAll('#priceFrom, #priceTo');
    priceInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
        input.addEventListener('blur', applyFilters);
    });
    
    // Registration dropdowns
    const registrationSelects = document.querySelectorAll('#registrationFrom, #registrationTo');
    registrationSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    // Mileage dropdowns
    const mileageSelects = document.querySelectorAll('#mileageFrom, #mileageTo');
    mileageSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    // Fuel selects
    const fuelSelects = document.querySelectorAll('#fuelType1, #fuelType2');
    fuelSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    // Power selects
    const powerSelects = document.querySelectorAll('#powerFrom, #powerTo');
    powerSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    // Vehicle type
    const vehicleType = document.getElementById('vehicleType');
    if (vehicleType) {
        vehicleType.addEventListener('change', applyFilters);
    }
}

// View car details
function viewCarDetails(carId) {
    console.log('Viewing car details for ID:', carId);
    // In a real app, this would navigate to a car detail page
    alert(`Viewing details for Car ID: ${carId}\n\nThis would navigate to a detailed car page in a full implementation.`);
}

// Add to compare
function addToCompare(carId) {
    console.log('Adding car to compare:', carId);
    // In a real app, this would add to a comparison list
    alert(`Car ID ${carId} added to comparison list!`);
}

// Export functions for potential use elsewhere
window.buyPageFunctions = {
    applyFilters,
    loadCars,
    collectFilters,
    currentPage: () => currentPage,
    viewCarDetails,
    addToCompare
};

