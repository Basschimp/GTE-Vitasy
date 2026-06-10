// Vitasy Theme - Global JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Cart count update function
  window.updateCartCount = function() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        document.querySelectorAll('.cart-count').forEach(el => {
          el.textContent = cart.item_count;
        });
      });
  };

  // Initialize cart count on page load
  updateCartCount();
});

// Shopify routes object (populated by theme.liquid)
window.routes = window.routes || {};
