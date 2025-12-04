// Account Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize login dropdown if on account pages
    initLoginDropdown();

    // Initialize header buttons
    initHeaderButtons();
});

// Saved Searches Functions
function editSearch(searchId) {
    console.log('Editing search:', searchId);
    // In production, this would open an edit modal or navigate to edit page
    alert('Edit functionality would open here for search ID: ' + searchId);
}

function deleteSearch(searchId) {
    if (confirm('Are you sure you want to delete this saved search?')) {
        console.log('Deleting search:', searchId);
        // Find and remove the search card
        const searchCard = document.querySelector(`[data-search-id="${searchId}"]`);
        if (searchCard) {
            searchCard.style.transition = 'opacity 0.3s, transform 0.3s';
            searchCard.style.opacity = '0';
            searchCard.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                searchCard.remove();
                checkEmptyState();
            }, 300);
        }
    }
}

function checkEmptyState() {
    const savedSearches = document.querySelectorAll('.saved-search-card, .history-item');
    const emptyState = document.querySelector('.empty-state');
    
    if (savedSearches.length === 0 && emptyState) {
        emptyState.style.display = 'block';
    }
}

// Last Searches Functions
function saveSearch(searchId) {
    console.log('Saving search:', searchId);
    // In production, this would save the search to saved searches
    alert('Search saved! You can find it in your Saved Searches.');
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all search history?')) {
        const historyItems = document.querySelectorAll('.history-item');
        historyItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s, transform 0.3s';
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => item.remove(), 300);
            }, index * 100);
        });
    }
}

// Favorites Functions
function removeFavorite(carId) {
    if (confirm('Remove this car from your favorites?')) {
        console.log('Removing favorite:', carId);
        const favoriteCard = document.querySelector(`[data-car-id="${carId}"]`) || 
                            document.querySelectorAll('.favorite-card')[carId - 1];
        
        if (favoriteCard) {
            favoriteCard.style.transition = 'opacity 0.3s, transform 0.3s';
            favoriteCard.style.opacity = '0';
            favoriteCard.style.transform = 'scale(0.9)';
            setTimeout(() => {
                favoriteCard.remove();
                updateFavoritesCount();
            }, 300);
        }
    }
}

function addToCompare(carId) {
    console.log('Adding car to compare:', carId);
    // In production, this would add the car to a comparison list
    alert('Car added to comparison!');
}

function clearAllFavorites() {
    if (confirm('Are you sure you want to remove all cars from favorites?')) {
        const favoriteCards = document.querySelectorAll('.favorite-card');
        favoriteCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s, transform 0.3s';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => card.remove(), 300);
            }, index * 100);
        });
        
        setTimeout(() => {
            updateFavoritesCount();
        }, favoriteCards.length * 100 + 300);
    }
}

function updateFavoritesCount() {
    const favoritesCount = document.querySelectorAll('.favorite-card').length;
    const countElement = document.getElementById('favoritesCount');
    if (countElement) {
        countElement.textContent = `${favoritesCount} car${favoritesCount !== 1 ? 's' : ''}`;
    }
}

// Orders Functions
function viewInvoice(orderId) {
    console.log('Viewing invoice for order:', orderId);
    // In production, this would open or download the invoice PDF
    alert('Invoice for order ' + orderId + ' would be displayed here.');
}

function viewOrderDetails(orderId) {
    console.log('Viewing details for order:', orderId);
    // In production, this would navigate to order details page
    alert('Order details for ' + orderId + ' would be displayed here.');
}

function trackOrder(orderId) {
    console.log('Tracking order:', orderId);
    // In production, this would show detailed tracking information
    alert('Tracking information for order ' + orderId + ' would be displayed here.');
}

function cancelOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order?')) {
        console.log('Cancelling order:', orderId);
        // In production, this would cancel the order via API
        alert('Order ' + orderId + ' cancellation request submitted.');
    }
}

function reorder(orderId) {
    console.log('Reordering:', orderId);
    // In production, this would add the car to cart again
    alert('Car from order ' + orderId + ' has been added to your cart.');
}

// Initialize functions from main.js if not already defined
function initHeaderButtons() {
    // Favorites button
    const favoritesBtn = document.querySelector('.favorites-btn');
    if (favoritesBtn && !favoritesBtn.hasAttribute('data-initialized')) {
        favoritesBtn.setAttribute('data-initialized', 'true');
        favoritesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/favorites';
        });
    }
    
    // Cart button
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn && !cartBtn.hasAttribute('data-initialized')) {
        cartBtn.setAttribute('data-initialized', 'true');
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
    
    if (langBtn && langMenu && langSelector && !langBtn.hasAttribute('data-initialized')) {
        langBtn.setAttribute('data-initialized', 'true');
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
}

function initLoginDropdown() {
    const loginDropdown = document.querySelector('.login-dropdown');
    const loginBtn = document.getElementById('loginBtn');
    const loginMenu = document.getElementById('loginMenu');
    
    if (loginDropdown && loginBtn && loginMenu && !loginBtn.hasAttribute('data-initialized')) {
        loginBtn.setAttribute('data-initialized', 'true');
        
        // Toggle menu on click
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            loginMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (loginDropdown && !loginDropdown.contains(e.target)) {
                loginMenu.classList.remove('active');
            }
        });
        
        // Close menu on menu item click
        const menuLinks = loginMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                loginMenu.classList.remove('active');
            });
        });
        
        // Prevent menu from closing when clicking inside it
        loginMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

