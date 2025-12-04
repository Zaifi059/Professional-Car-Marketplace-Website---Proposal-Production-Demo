// Reviews Page JavaScript - All Button Functionality

document.addEventListener('DOMContentLoaded', function() {
    initFilterButtons();
    initSortDropdown();
    initLoadMoreButton();
    initWriteReviewButton();
});

// Filter Buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reviewCards = document.querySelectorAll('.review-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            console.log('Filter selected:', filterValue);

            // Filter review cards
            reviewCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardRating = card.getAttribute('data-rating');
                    if (cardRating === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // Animate filtered cards
            setTimeout(() => {
                reviewCards.forEach((card, index) => {
                    if (card.style.display !== 'none') {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s, transform 0.3s';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 50);
                    }
                });
            }, 10);
        });
    });
}

// Sort Dropdown
function initSortDropdown() {
    const sortDropdown = document.getElementById('sortReviews');
    const reviewsGrid = document.getElementById('reviewsGrid');

    if (sortDropdown && reviewsGrid) {
        sortDropdown.addEventListener('change', function() {
            const sortValue = this.value;
            console.log('Sort changed to:', sortValue);

            const reviewCards = Array.from(reviewsGrid.querySelectorAll('.review-card'));
            const visibleCards = reviewCards.filter(card => card.style.display !== 'none');

            // Sort reviews
            visibleCards.sort((a, b) => {
                if (sortValue === 'newest') {
                    // Sort by date (assuming newer dates come first)
                    const dateA = a.querySelector('.review-date').textContent;
                    const dateB = b.querySelector('.review-date').textContent;
                    return dateB.localeCompare(dateA);
                } else if (sortValue === 'oldest') {
                    const dateA = a.querySelector('.review-date').textContent;
                    const dateB = b.querySelector('.review-date').textContent;
                    return dateA.localeCompare(dateB);
                } else if (sortValue === 'highest') {
                    const ratingA = parseInt(a.getAttribute('data-rating'));
                    const ratingB = parseInt(b.getAttribute('data-rating'));
                    return ratingB - ratingA;
                } else if (sortValue === 'lowest') {
                    const ratingA = parseInt(a.getAttribute('data-rating'));
                    const ratingB = parseInt(b.getAttribute('data-rating'));
                    return ratingA - ratingB;
                }
                return 0;
            });

            // Reorder cards in DOM
            visibleCards.forEach(card => {
                reviewsGrid.appendChild(card);
            });

            // Animate reordered cards
            visibleCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s, transform 0.3s';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 30);
            });
        });
    }
}

// Load More Button
function initLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const reviewsGrid = document.getElementById('reviewsGrid');

    if (loadMoreBtn && reviewsGrid) {
        loadMoreBtn.addEventListener('click', function() {
            console.log('Load more reviews clicked');

            // Create additional review cards (simulated)
            const additionalReviews = [
                {
                    initials: 'JP',
                    name: 'Jiří Procházka',
                    date: 'September 2024',
                    rating: 5,
                    content: 'Amazing experience! The car was exactly as described and the service was top-notch. Highly recommend!',
                    car: 'Toyota Corolla 2021'
                },
                {
                    initials: 'MH',
                    name: 'Marie Havlíčková',
                    date: 'August 2024',
                    rating: 5,
                    content: 'Smooth process from start to finish. The financing was approved quickly and delivery was prompt.',
                    car: 'Hyundai i30 2020'
                },
                {
                    initials: 'LS',
                    name: 'Lukáš Sedláček',
                    date: 'August 2024',
                    rating: 4,
                    content: 'Good service overall. The car inspection was thorough and I felt confident in my purchase.',
                    car: 'Peugeot 308 2019'
                }
            ];

            // Add new review cards
            additionalReviews.forEach((review, index) => {
                setTimeout(() => {
                    const reviewCard = createReviewCard(review);
                    reviewsGrid.appendChild(reviewCard);

                    // Animate new card
                    reviewCard.style.opacity = '0';
                    reviewCard.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        reviewCard.style.transition = 'opacity 0.3s, transform 0.3s';
                        reviewCard.style.opacity = '1';
                        reviewCard.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });

            // Show message after loading
            setTimeout(() => {
                alert('More reviews loaded!');
            }, additionalReviews.length * 100);
        });
    }
}

// Create Review Card Element
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.setAttribute('data-rating', review.rating);

    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

    card.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">${review.initials}</div>
                <div>
                    <h3 class="reviewer-name">${review.name}</h3>
                    <p class="review-date">${review.date}</p>
                </div>
            </div>
            <div class="review-rating">
                <span class="star-rating">${stars}</span>
            </div>
        </div>
        <div class="review-content">
            <p>"${review.content}"</p>
        </div>
        <div class="review-meta">
            <span class="car-info">${review.car}</span>
        </div>
    `;

    return card;
}

// Write Review Button
function initWriteReviewButton() {
    const writeReviewBtn = document.getElementById('writeReviewBtn');

    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', function() {
            console.log('Write review clicked');
            
            // Create review form modal (simplified version)
            const reviewForm = `
                <div class="review-modal" id="reviewModal" style="display: block;">
                    <div class="modal-content">
                        <span class="close-modal" id="closeModal">&times;</span>
                        <h2>Write a Review</h2>
                        <form id="reviewForm">
                            <div class="form-group">
                                <label>Your Name</label>
                                <input type="text" name="name" required>
                            </div>
                            <div class="form-group">
                                <label>Car Model</label>
                                <input type="text" name="car" required>
                            </div>
                            <div class="form-group">
                                <label>Rating</label>
                                <div class="rating-input">
                                    <button type="button" class="star-btn" data-rating="1">☆</button>
                                    <button type="button" class="star-btn" data-rating="2">☆</button>
                                    <button type="button" class="star-btn" data-rating="3">☆</button>
                                    <button type="button" class="star-btn" data-rating="4">☆</button>
                                    <button type="button" class="star-btn" data-rating="5">☆</button>
                                </div>
                                <input type="hidden" name="rating" id="selectedRating" required>
                            </div>
                            <div class="form-group">
                                <label>Your Review</label>
                                <textarea name="review" rows="5" required></textarea>
                            </div>
                            <button type="submit" class="btn-submit-review">Submit Review</button>
                        </form>
                    </div>
                </div>
            `;

            // Add modal to page
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = reviewForm;
            document.body.appendChild(modalContainer);

            // Initialize modal functionality
            initReviewModal();
        });
    }
}

// Initialize Review Modal
function initReviewModal() {
    const modal = document.getElementById('reviewModal');
    const closeBtn = document.getElementById('closeModal');
    const reviewForm = document.getElementById('reviewForm');
    const starButtons = document.querySelectorAll('.star-btn');
    let selectedRating = 0;

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            modal.parentElement.remove();
        });
    }

    // Close on outside click
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.parentElement.remove();
        }
    });

    // Star rating selection
    starButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            selectedRating = index + 1;
            document.getElementById('selectedRating').value = selectedRating;

            // Update star display
            starButtons.forEach((b, i) => {
                if (i < selectedRating) {
                    b.textContent = '★';
                    b.style.color = '#ffc107';
                } else {
                    b.textContent = '☆';
                    b.style.color = '#ccc';
                }
            });
        });

        btn.addEventListener('mouseenter', function() {
            const hoverRating = index + 1;
            starButtons.forEach((b, i) => {
                if (i < hoverRating) {
                    b.style.color = '#ffc107';
                }
            });
        });
    });

    // Form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            console.log('Review submitted:', {
                name: formData.get('name'),
                car: formData.get('car'),
                rating: formData.get('rating'),
                review: formData.get('review')
            });

            alert('Thank you for your review! It will be published after moderation.');
            modal.style.display = 'none';
            modal.parentElement.remove();
        });
    }
}

// Add modal styles dynamically
const modalStyles = `
    .review-modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        overflow: auto;
    }

    .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 30px;
        border-radius: 8px;
        width: 90%;
        max-width: 600px;
        position: relative;
    }

    .close-modal {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 32px;
        font-weight: bold;
        color: #aaa;
        cursor: pointer;
    }

    .close-modal:hover {
        color: #000;
    }

    .modal-content h2 {
        margin-bottom: 20px;
        color: var(--dark-color);
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--text-color);
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
    }

    .rating-input {
        display: flex;
        gap: 5px;
    }

    .star-btn {
        background: none;
        border: none;
        font-size: 32px;
        color: #ccc;
        cursor: pointer;
        transition: color 0.2s;
    }

    .btn-submit-review {
        width: 100%;
        padding: 15px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .btn-submit-review:hover {
        background-color: #0056b3;
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);


