// Vitasy Theme - Global JavaScript

(function() {
  'use strict';

  // Initialize theme
  document.addEventListener('DOMContentLoaded', function() {
    initCart();
    initSearch();
    initMobileMenu();
  });

  // Cart functionality
  function initCart() {
    const cartIcon = document.getElementById('cart-icon');
    const cartDrawer = document.getElementById('CartDrawer');
    const closeButtons = document.querySelectorAll('[data-close-cart]');

    if (cartIcon && cartDrawer) {
      cartIcon.addEventListener('click', function() {
        cartDrawer.classList.add('cart-drawer--open');
        document.body.style.overflow = 'hidden';
      });
    }

    closeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        if (cartDrawer) {
          cartDrawer.classList.remove('cart-drawer--open');
          document.body.style.overflow = '';
        }
      });
    });

    // Listen for cart update events
    document.addEventListener('cart:update', function(e) {
      updateCartCount(e.detail.count);
    });
  }

  function updateCartCount(count) {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
      if (count > 0) {
        cartCountEl.textContent = count;
        cartCountEl.removeAttribute('hidden');
      } else {
        cartCountEl.setAttribute('hidden', '');
      }
    }
  }

  // Search functionality
  function initSearch() {
    const searchInput = document.querySelector('.header__search-input');
    
    if (searchInput) {
      let debounceTimer;
      
      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        const query = this.value.trim();
        
        if (query.length >= 2) {
          debounceTimer = setTimeout(() => {
            performPredictiveSearch(query);
          }, 300);
        }
      });

      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          window.location.href = '/search?q=' + encodeURIComponent(this.value.trim());
        }
      });
    }
  }

  async function performPredictiveSearch(query) {
    try {
      const response = await fetch(
        `${window.routes.predictive_search_url}?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`
      );
      const data = await response.json();
      // Handle predictive search results (can be expanded)
      console.log('Predictive search results:', data);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  // Mobile menu
  function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('mobile-menu--open');
        this.setAttribute('aria-expanded', 
          this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
      });
    }
  }

  // Utility: Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Utility: Format money
  window.formatMoney = function(cents, format) {
    const value = (cents / 100).toFixed(2);
    return format.replace('{{amount}}', value);
  };

})();
