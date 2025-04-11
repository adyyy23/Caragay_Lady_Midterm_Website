// Cart functionality - Global variables
let cart = [];

// DOM event listener for all page interactions
document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submission
    setupContactForms();
    
    // Initialize product image gallery if on product page
    initProductGallery();
});

// Contact form setup
function setupContactForms() {
    const contactForms = document.querySelectorAll('.contact-form, .contact-page-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Your message has been sent successfully!');
            form.reset();
        });
    });
}

// Product size selection
function selectSize(element) {
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('active');
    });
    element.classList.add('active');
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (!input) return;
    
    const currentValue = parseInt(input.value);
    const max = input.hasAttribute('max') ? parseInt(input.getAttribute('max')) : 10;
    
    if (currentValue < max) {
        input.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (!input) return;
    
    const currentValue = parseInt(input.value);
    const min = input.hasAttribute('min') ? parseInt(input.getAttribute('min')) : 1;
    
    if (currentValue > min) {
        input.value = currentValue - 1;
    }
}

// Product image gallery functionality
function initProductGallery() {
    // Only run if we're on a product detail page
    const mainImage = document.getElementById('mainProductImage');
    if (!mainImage) return;
    
    // Set first thumbnail as active by default
    const firstThumbnail = document.querySelector('.thumbnail');
    if (firstThumbnail) {
        firstThumbnail.classList.add('active');
    }
}

function changeImage(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (!thumbnails.length) return;
    
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    thumbnails[index].classList.add('active');
    
    const mainImage = document.getElementById('mainProductImage');
    const selectedImage = thumbnails[index].querySelector('img');
    mainImage.src = selectedImage.src;
    mainImage.alt = selectedImage.alt;
}

function prevImage() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (!thumbnails.length) return;
    
    let activeIndex = 0;
    thumbnails.forEach((thumb, index) => {
        if (thumb.classList.contains('active')) {
            activeIndex = index;
        }
    });
    
    const prevIndex = (activeIndex === 0) ? thumbnails.length - 1 : activeIndex - 1;
    changeImage(prevIndex);
}

function nextImage() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (!thumbnails.length) return;
    
    let activeIndex = 0;
    thumbnails.forEach((thumb, index) => {
        if (thumb.classList.contains('active')) {
            activeIndex = index;
        }
    });
    
    const nextIndex = (activeIndex === thumbnails.length - 1) ? 0 : activeIndex + 1;
    changeImage(nextIndex);
}

// Add to cart functions
function addToCart(productId, productName, productPrice) {
    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    });
    
    updateCartCount();
    showNotification(`${productName} added to your cart!`);
}

function addToCartFromDetail() {
    // Check if we have the necessary elements
    const selectedSizeElement = document.querySelector('.size-option.active');
    const quantityInput = document.getElementById('quantityInput');
    const titleElement = document.querySelector('.product-title');
    const priceElement = document.querySelector('.product-price');
    
    if (!selectedSizeElement || !quantityInput || !titleElement || !priceElement) {
        return;
    }
    
    // Get selected size
    const selectedSize = selectedSizeElement.textContent;
    
    // Get quantity
    const quantity = parseInt(quantityInput.value);
    
    // Get product details
    const title = titleElement.textContent;
    const priceText = priceElement.textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    const productId = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Add to cart
    cart.push({
        id: productId,
        name: title,
        price: price,
        quantity: quantity,
        size: selectedSize
    });
    
    updateCartCount();
    showNotification(`${quantity} ${title} (Size: ${selectedSize}) added to your cart!`);
}

// Update cart count badge
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity;
        });
        cartCountElement.textContent = totalItems;
    }
}

// Display notification message
function showNotification(message) {
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--maroon)';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.transition = 'opacity 0.5s';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
}