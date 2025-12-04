// Main JavaScript file for Carvago website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Search form handling
    const searchForm = document.querySelector('.search-form form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle search form submission
            console.log('Search form submitted');
            // You can add AJAX call here or let it submit normally
        });
    }

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'none';
            }
        });
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Initialize Header Buttons
    initHeaderButtons();
    
    // Initialize Login Dropdown
    initLoginDropdown();

    // Category cards hover effect
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Feature cards animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and step cards
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .service-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize Financing Calculator
    initFinancingCalculator();
    initFeatureExpand();
    initCategoriesSlider();
});

// Feature Expand/Collapse Functionality
function initFeatureExpand() {
    const learnMoreLinks = document.querySelectorAll('.learn-more');
    
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const featureCard = this.closest('.feature-card');
            const featureDetails = featureCard.querySelector('.feature-details');
            const featureSummary = featureCard.querySelector('.feature-summary');
            
            if (featureDetails && featureSummary) {
                const isExpanded = featureDetails.style.display !== 'none';
                
                if (isExpanded) {
                    featureDetails.style.display = 'none';
                    featureSummary.style.display = 'block';
                    this.textContent = 'More →';
                } else {
                    featureDetails.style.display = 'block';
                    featureSummary.style.display = 'none';
                    this.textContent = 'Less →';
                }
            }
        });
    });
}

// Categories Slider Functionality
function initCategoriesSlider() {
    const slider = document.getElementById('categoriesSlider');
    const track = slider ? slider.querySelector('.categories-track') : null;
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    
    if (!slider || !track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let maxIndex = 0;
    
    function calculateSlider() {
        const cardWidth = 170; // 150px card + 20px gap
        const totalCards = track.children.length;
        const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
        maxIndex = Math.max(0, totalCards - visibleCards);
        updateSlider();
    }
    
    function updateSlider() {
        const cardWidth = 170;
        const translateX = -currentIndex * cardWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        if (currentIndex === 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
            prevBtn.disabled = true;
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
            prevBtn.disabled = false;
        }
        
        if (currentIndex >= maxIndex) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
            nextBtn.disabled = true;
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
            nextBtn.disabled = false;
        }
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            calculateSlider();
        }, 250);
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < maxIndex) {
                // Swipe left - next
                currentIndex++;
                updateSlider();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous
                currentIndex--;
                updateSlider();
            }
        }
    }
    
    // Initialize
    calculateSlider();
}

// Header Buttons Functionality
function initHeaderButtons() {
    // Favorites button
    const favoritesBtn = document.querySelector('.favorites-btn');
    if (favoritesBtn) {
        favoritesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/favorites';
        });
    }
    
    // Cart button
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
}

// Login Dropdown Functionality
function initLoginDropdown() {
    const loginDropdown = document.querySelector('.login-dropdown');
    const loginBtn = document.getElementById('loginBtn');
    const loginMenu = document.getElementById('loginMenu');
    
    if (loginDropdown && loginBtn && loginMenu) {
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

// Financing Calculator Functions
function initFinancingCalculator() {
    const carPriceSlider = document.getElementById('carPrice');
    const paybackPeriodSlider = document.getElementById('paybackPeriod');
    const downPaymentSlider = document.getElementById('downPayment');
    
    if (!carPriceSlider || !paybackPeriodSlider || !downPaymentSlider) {
        return; // Calculator not on this page
    }

    // Initialize calculator with default values (converted to PKR)
    const defaultPrice = 1109000; // CZK value (matches image example)
    carPriceSlider.value = defaultPrice;
    updateCarPriceValue(defaultPrice);
    updatePaybackPeriodValue(paybackPeriodSlider.value);
    updateDownPaymentValue(downPaymentSlider.value);
    updateActivePeriodOption(parseInt(paybackPeriodSlider.value));
    updateActivePaymentOption(parseInt(downPaymentSlider.value));
    updateCalculator();
    
    // Car Price Slider
    carPriceSlider.addEventListener('input', function() {
        updateCarPriceValue(this.value);
        updateCalculator();
    });

    // Payback Period Slider
    paybackPeriodSlider.addEventListener('input', function() {
        updatePaybackPeriodValue(this.value);
        updateActivePeriodOption(this.value);
        updateCalculator();
    });

    // Down Payment Slider
    downPaymentSlider.addEventListener('input', function() {
        updateDownPaymentValue(this.value);
        updateActivePaymentOption(this.value);
        updateCalculator();
    });

    // Period Option Buttons
    const periodOptions = document.querySelectorAll('.period-option');
    periodOptions.forEach(option => {
        option.addEventListener('click', function() {
            const months = parseInt(this.getAttribute('data-months'));
            paybackPeriodSlider.value = months;
            updatePaybackPeriodValue(months);
            updateActivePeriodOption(months);
            updateCalculator();
        });
    });

    // Payment Option Buttons
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const percent = parseInt(this.getAttribute('data-percent'));
            downPaymentSlider.value = percent;
            updateDownPaymentValue(percent);
            updateActivePaymentOption(percent);
            updateCalculator();
        });
    });
}

function updateCarPriceValue(value) {
    const priceValue = document.getElementById('carPriceValue');
    if (priceValue) {
        const pkrValue = convertToPKR(value);
        priceValue.textContent = 'Rs. ' + formatNumberWithSpaces(pkrValue);
    }
}

function updatePaybackPeriodValue(value) {
    const periodValue = document.getElementById('paybackPeriodValue');
    if (periodValue) {
        periodValue.textContent = value + ' months';
    }
}

function updateDownPaymentValue(value) {
    const carPrice = parseInt(document.getElementById('carPrice').value);
    const downPaymentAmount = (carPrice * value) / 100;
    const paymentValue = document.getElementById('downPaymentValue');
    if (paymentValue) {
        const pkrAmount = convertToPKR(downPaymentAmount);
        paymentValue.textContent = value + '% = Rs. ' + formatNumberWithSpaces(pkrAmount);
    }
}

function updateActivePeriodOption(months) {
    const periodOptions = document.querySelectorAll('.period-option');
    periodOptions.forEach(option => {
        if (parseInt(option.getAttribute('data-months')) === months) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function updateActivePaymentOption(percent) {
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        if (parseInt(option.getAttribute('data-percent')) === percent) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function updateCalculator() {
    const carPrice = parseFloat(document.getElementById('carPrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('downPayment').value);
    const paybackPeriod = parseFloat(document.getElementById('paybackPeriod').value);
    
    // Calculate down payment amount
    const downPaymentAmount = (carPrice * downPaymentPercent) / 100;
    
    // Calculate loan amount
    const loanAmount = carPrice - downPaymentAmount;
    
    // Calculate interest rates (these would normally come from backend)
    // Using realistic rates based on loan amount and period
    const baseInterestRate = 7.49;
    const baseAPR = 7.68;
    
    // Calculate monthly interest rate
    const monthlyInterestRate = (baseInterestRate / 100) / 12;
    
    // Calculate monthly payment using loan formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment = 0;
    let totalPrice = carPrice;
    
    if (loanAmount > 0 && paybackPeriod > 0) {
        const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, paybackPeriod);
        const denominator = Math.pow(1 + monthlyInterestRate, paybackPeriod) - 1;
        monthlyPayment = loanAmount * (numerator / denominator);
        
        // Calculate total price (car price + total interest)
        const totalInterest = (monthlyPayment * paybackPeriod) - loanAmount;
        totalPrice = carPrice + totalInterest;
    }
    
    // Update UI
    updateLoanSummary(loanAmount, monthlyPayment, totalPrice);
}

function updateLoanSummary(loanAmount, monthlyPayment, totalPrice) {
    const loanAmountEl = document.getElementById('loanAmount');
    const monthlyPaymentEl = document.getElementById('monthlyPayment');
    const totalPriceEl = document.getElementById('totalPrice');
    
    if (loanAmountEl) {
        const pkrLoan = convertToPKR(loanAmount);
        loanAmountEl.textContent = 'Rs. ' + formatNumberWithSpaces(pkrLoan);
    }
    
    if (monthlyPaymentEl) {
        const pkrMonthly = convertToPKR(monthlyPayment);
        monthlyPaymentEl.textContent = 'Rs. ' + formatNumberWithSpaces(pkrMonthly);
    }
    
    if (totalPriceEl) {
        const pkrTotal = convertToPKR(totalPrice);
        totalPriceEl.textContent = 'Rs. ' + formatNumberWithSpaces(pkrTotal);
    }
}

// Currency conversion rate: 1 CZK = 13.5 PKR
const CZK_TO_PKR_RATE = 13.5;

function convertToPKR(czkAmount) {
    return Math.round(czkAmount * CZK_TO_PKR_RATE);
}

function formatNumberWithSpaces(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatCurrency(amount) {
    // Convert to PKR and format with space as thousand separator (matching original design)
    const pkrAmount = convertToPKR(amount);
    return 'Rs. ' + formatNumberWithSpaces(pkrAmount);
}

function formatCurrencyInput(amount) {
    const pkrAmount = convertToPKR(amount);
    return pkrAmount.toLocaleString('en-PK');
}

