// script.js - Enhanced with interactive elements and form validation

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive elements
    initProductButtons();
    initFormValidation();
    initSearchFunctionality();
    initBlogReadMore();
    initStatsCounter();
    
    // Add animation to elements when they come into view
    initScrollAnimations();
});

// Product buttons with dynamic content
function initProductButtons() {
    const productButtons = document.querySelectorAll('.product-btn');
    const enquireButtons = document.querySelectorAll('.enquire-btn');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            showProductDetails(product);
        });
    });
    
    enquireButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            redirectToEnquiry(product);
        });
    });
}

// Show product details in a modal or alert (for demo)
function showProductDetails(product) {
    const productInfo = {
        'bottles': {
            title: 'Reusable Water Bottles',
            description: 'Our BPA-free reusable bottles are made from sustainable materials and come in various sizes. Perfect for reducing single-use plastic waste.',
            price: 'From R150',
            features: ['BPA-free materials', 'Various sizes available', 'Dishwasher safe', 'Insulated options']
        },
        'chargers': {
            title: 'Solar-Powered Chargers',
            description: 'Harness solar energy to charge your devices anywhere. Our chargers are efficient, portable, and perfect for outdoor adventures.',
            price: 'From R450',
            features: ['Fast charging capability', 'Water resistant', 'Multiple device ports', 'Portable design']
        },
        'cleaning': {
            title: 'Eco-Friendly Cleaning Supplies',
            description: 'Non-toxic, biodegradable cleaning products that are safe for your family and the environment. Available in various formulations.',
            price: 'From R80',
            features: ['Non-toxic formula', 'Biodegradable', 'Cruelty-free', 'Multiple scents available']
        }
    };
    
    const info = productInfo[product];
    if (info) {
        alert(`${info.title}\n\n${info.description}\n\nPrice: ${info.price}\n\nKey Features:\n${info.features.join('\n')}\n\nContact us for more details or to place an order.`);
    }
}

// Redirect to contact page with product pre-selected
function redirectToEnquiry(product) {
    // In a real implementation, this would redirect to a contact form with the product pre-filled
    alert(`Thank you for your interest in our ${product}! Please fill out the contact form and mention "${product}" in your message.`);
}

// Form validation for contact forms
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show success message
                showSuccessMessage(this);
                
                // For demo purposes, we'll just log the form data
                const formData = new FormData(this);
                console.log('Form submitted with data:', Object.fromEntries(formData));
                
                // In a real implementation, you would send the data to a server
                // using AJAX or fetch API
                
                // Reset form after successful submission (after a delay)
                setTimeout(() => {
                    this.reset();
                }, 3000);
            }
        });
    });
}

// Validate form fields
function validateForm(form) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    
    // Clear previous error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.style.display = 'none';
    });
    
    // Clear field error styling
    const formControls = form.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.style.borderColor = '#ddd';
    });
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate email format
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !emailRegex.test(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone number (if exists and has value)
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value && !phoneRegex.test(phoneField.value)) {
        showError(phoneField, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate message length
    const messageField = form.querySelector('textarea[name="message"]');
    if (messageField && messageField.value && messageField.value.length < 10) {
        showError(messageField, 'Message should be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Show error message for a field
function showError(field, message) {
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Add error styling to field
    field.style.borderColor = '#e74c3c';
}

// Show success message after form submission
function showSuccessMessage(form) {
    let successElement = form.querySelector('.success-message');
    
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        form.appendChild(successElement);
    }
    
    successElement.textContent = 'Thank you for your message! We will get back to you soon.';
    successElement.style.display = 'block';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

// Search functionality for products
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Sample product data for search
    const products = [
        { name: 'Reusable Water Bottles', category: 'Products', page: 'products.html' },
        { name: 'Solar-Powered Chargers', category: 'Products', page: 'products.html' },
        { name: 'Eco-Friendly Cleaning Supplies', category: 'Products', page: 'products.html' },
        { name: 'Biodegradable Packaging', category: 'Products', page: 'products.html' },
        { name: 'Sustainability Consulting', category: 'Services', page: 'products.html#consulting' },
        { name: 'Reducing Plastic Waste', category: 'Blog', page: 'blog.html' },
        { name: 'Renewable Energy', category: 'Blog', page: 'blog.html' }
    ];
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(filteredProducts, searchResults);
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Display search results
function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<p>No results found. Try different keywords.</p>';
        container.style.display = 'block';
        return;
    }
    
    let html = '<ul>';
    results.forEach(result => {
        html += `<li><a href="${result.page}">${result.name} <span class="category">(${result.category})</span></a></li>`;
    });
    html += '</ul>';
    
    container.innerHTML = html;
    container.style.display = 'block';
}

// Blog read more functionality
function initBlogReadMore() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const blogPost = this.closest('.blog-post');
            const fullContent = blogPost.querySelector('.full-content');
            
            if (fullContent.style.display === 'none') {
                fullContent.style.display = 'block';
                this.textContent = 'Read Less';
            } else {
                fullContent.style.display = 'none';
                this.textContent = 'Read More';
            }
        });
    });
}

// Animated stats counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Animate value counting up
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .product-card, .blog-post');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}