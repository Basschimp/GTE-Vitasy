/**
 * VITASY Theme - Main JavaScript
 * Clinical Premium Supplement Brand
 */

(function() {
  'use strict';

  // ==========================================================================
  // State Management
  // ==========================================================================
  
  const state = {
    cart: {
      isOpen: false,
      itemCount: 0
    },
    mobileMenu: {
      isOpen: false
    }
  };

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  
  const elements = {
    cartDrawer: document.getElementById('CartDrawer'),
    cartOverlay: document.getElementById('CartOverlay'),
    cartToggle: document.getElementById('CartToggle'),
    cartClose: document.getElementById('CartDrawerClose'),
    cartCount: document.getElementById('CartCount'),
    mobileMenu: document.getElementById('MobileMenu'),
    mobileMenuOverlay: document.getElementById('MobileMenuOverlay'),
    mobileMenuToggle: document.getElementById('MobileMenuToggle'),
    mobileMenuClose: document.getElementById('MobileMenuClose'),
    accordionButtons: document.querySelectorAll('.accordion-button')
  };

  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });
  }

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

  // ==========================================================================
  // Cart Drawer
  // ==========================================================================
  
  function openCart() {
    if (!elements.cartDrawer) return;
    
    state.cart.isOpen = true;
    elements.cartDrawer.classList.add('is-open');
    elements.cartOverlay.style.opacity = '1';
    elements.cartOverlay.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
    trapFocus(elements.cartDrawer);
    
    // Track analytics event
    if (typeof gtag === 'function') {
      gtag('event', 'view_cart', {
        event_category: 'engagement',
        event_label: 'Cart opened'
      });
    }
  }

  function closeCart() {
    if (!elements.cartDrawer) return;
    
    state.cart.isOpen = false;
    elements.cartDrawer.classList.remove('is-open');
    elements.cartOverlay.style.opacity = '0';
    elements.cartOverlay.style.visibility = 'hidden';
    document.body.style.overflow = '';
    
    if (elements.cartToggle) {
      elements.cartToggle.focus();
    }
  }

  function toggleCart() {
    if (state.cart.isOpen) {
      closeCart();
    } else {
      openCart();
    }
  }

  async function updateCartQuantity(line, quantity) {
    try {
      const response = await fetch(`${window.Shopify.routes.root}cart/change.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ line, quantity })
      });
      
      const cart = await response.json();
      updateCartDisplay(cart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }

  async function removeCartItem(line) {
    try {
      const response = await fetch(`${window.Shopify.routes.root}cart/change.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ line, quantity: 0 })
      });
      
      const cart = await response.json();
      updateCartDisplay(cart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  function updateCartDisplay(cart) {
    state.cart.itemCount = cart.item_count;
    
    if (elements.cartCount) {
      elements.cartCount.textContent = cart.item_count;
      elements.cartCount.setAttribute('data-count', cart.item_count);
    }
    
    // Update subtotal
    const subtotalElement = document.querySelector('[data-cart-subtotal]');
    if (subtotalElement) {
      subtotalElement.textContent = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: cart.currency
      }).format(cart.total_price / 100);
    }
  }

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================
  
  function openMobileMenu() {
    if (!elements.mobileMenu) return;
    
    state.mobileMenu.isOpen = true;
    elements.mobileMenu.classList.add('is-open');
    elements.mobileMenuOverlay.style.opacity = '1';
    elements.mobileMenuOverlay.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
    elements.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    trapFocus(elements.mobileMenu);
  }

  function closeMobileMenu() {
    if (!elements.mobileMenu) return;
    
    state.mobileMenu.isOpen = false;
    elements.mobileMenu.classList.remove('is-open');
    elements.mobileMenuOverlay.style.opacity = '0';
    elements.mobileMenuOverlay.style.visibility = 'hidden';
    document.body.style.overflow = '';
    elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    
    if (elements.mobileMenuToggle) {
      elements.mobileMenuToggle.focus();
    }
  }

  // ==========================================================================
  // Accordion
  // ==========================================================================
  
  function initAccordions() {
    elements.accordionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        const panel = button.nextElementSibling;
        
        // Close all other accordions (optional - remove for multi-open)
        elements.accordionButtons.forEach(otherButton => {
          if (otherButton !== button) {
            otherButton.setAttribute('aria-expanded', 'false');
            otherButton.nextElementSibling.classList.remove('is-open');
          }
        });
        
        button.setAttribute('aria-expanded', !expanded);
        panel.classList.toggle('is-open');
      });
    });
  }

  // ==========================================================================
  // Add to Cart
  // ==========================================================================
  
  async function addToCart(variantId, quantity = 1) {
    try {
      const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: [{ id: variantId, quantity }] })
      });
      
      const cart = await response.json();
      updateCartDisplay(cart);
      openCart();
      
      // Track analytics event
      if (typeof gtag === 'function') {
        gtag('event', 'add_to_cart', {
          event_category: 'ecommerce',
          event_label: 'Product added to cart'
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  // ==========================================================================
  // Event Listeners
  // ==========================================================================
  
  function initEventListeners() {
    // Cart toggle
    if (elements.cartToggle) {
      elements.cartToggle.addEventListener('click', toggleCart);
    }
    
    if (elements.cartClose) {
      elements.cartClose.addEventListener('click', closeCart);
    }
    
    if (elements.cartOverlay) {
      elements.cartOverlay.addEventListener('click', closeCart);
    }
    
    // Mobile menu toggle
    if (elements.mobileMenuToggle) {
      elements.mobileMenuToggle.addEventListener('click', () => {
        if (state.mobileMenu.isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }
    
    if (elements.mobileMenuClose) {
      elements.mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (elements.mobileMenuOverlay) {
      elements.mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Cart quantity updates
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-qty-update]')) {
        const button = e.target.closest('[data-qty-update]');
        const line = button.dataset.line;
        const qty = parseInt(button.dataset.qty, 10);
        if (line && qty >= 0) {
          updateCartQuantity(line, qty);
        }
      }
      
      if (e.target.closest('[data-remove-item]')) {
        const button = e.target.closest('[data-remove-item]');
        const line = button.dataset.line;
        if (line) {
          removeCartItem(line);
        }
      }
      
      if (e.target.closest('[data-add-to-cart]')) {
        const button = e.target.closest('[data-add-to-cart]');
        const variantId = parseInt(button.dataset.variantId, 10);
        if (variantId) {
          addToCart(variantId);
        }
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.cart.isOpen) closeCart();
        if (state.mobileMenu.isOpen) closeMobileMenu();
      }
    });
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================
  
  function init() {
    // Initialize cart count from liquid
    if (elements.cartCount) {
      state.cart.itemCount = parseInt(elements.cartCount.dataset.count, 10);
    }
    
    initAccordions();
    initEventListeners();
    
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    }
    
    console.log('VITASY Theme initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
