document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initThemeToggle();
  initCursorGlow();
  initScrollReveal();
  initCounters();
  initWhatsAppWidget();
  initBackToTop();
  initProductModals();
  initGalleryFilter();
  initProductFilter();
});

/* --- PAGE LOADER --- */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 500); // smooth short delay
    });
  }
}

/* --- NAVBAR SCROLL & MOBILE BURGER --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active Link Highlight based on current path
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Hamburger Toggle
  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      burger.classList.toggle('toggle');
      // Burger icon animation lines
      const spans = burger.querySelectorAll('span');
      if (burger.classList.contains('toggle')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        burger.classList.remove('toggle');
        burger.querySelectorAll('span').forEach(s => s.style.transform = 'none');
        burger.querySelector('span:nth-child(2)').style.opacity = '1';
      });
    });
  }
}

/* --- LIGHT/DARK THEME TOGGLE --- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* --- MOUSE GLOW EFFECT --- */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll('a, button, .glass, .product-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width = '120px';
      glow.style.height = '120px';
      glow.style.background = 'radial-gradient(circle, var(--color-primary) 0%, rgba(37,99,235,0) 80%)';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width = '300px';
      glow.style.height = '300px';
      glow.style.background = 'radial-gradient(circle, var(--color-glow) 0%, rgba(37,99,235,0) 70%)';
    });
  });
}

/* --- SCROLL REVEAL (INTERSECTION OBSERVER) --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve to run animation only once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --- ANIMATED COUNTERS --- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const countUp = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const suffix = counter.getAttribute('data-suffix') || '';
    let current = 0;
    const duration = 1500; // ms
    const stepTime = 15; // ms
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --- FLOATING WHATSAPP MOCK CHAT --- */
function initWhatsAppWidget() {
  const btn = document.getElementById('whatsapp-btn');
  const chatbox = document.getElementById('whatsapp-chatbox');
  const input = document.getElementById('whatsapp-input');
  const sendBtn = document.getElementById('whatsapp-send');
  const body = document.getElementById('whatsapp-body');
  const badge = document.getElementById('whatsapp-badge');

  if (!btn || !chatbox) return;

  // Toggle chatbox visibility
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatbox.classList.toggle('active');
    if (badge) badge.style.display = 'none'; // Clear notification badge
    if (chatbox.classList.contains('active')) {
      input.focus();
    }
  });

  // Close chatbox when clicking outside
  document.addEventListener('click', (e) => {
    if (!chatbox.contains(e.target) && e.target !== btn) {
      chatbox.classList.remove('active');
    }
  });

  // Handle message sending
  const sendMessage = () => {
    const text = input.value.trim();
    if (!text) return;

    // User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg chat-msg-sent';
    userMsg.textContent = text;
    body.appendChild(userMsg);
    input.value = '';
    body.scrollTop = body.scrollHeight;

    // Simulate Agent Auto-Reply
    setTimeout(() => {
      const agentMsg = document.createElement('div');
      agentMsg.className = 'chat-msg chat-msg-received';
      agentMsg.textContent = "Thank you for reaching out to Monagodu 501 Support! A representative will connect with you on WhatsApp shortly. 😊";
      body.appendChild(agentMsg);
      body.scrollTop = body.scrollHeight;
    }, 1000);
  };

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
}

/* --- BACK TO TOP BUTTON --- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- PRODUCT DETAILS MODAL --- */
const productDatabase = {
  'washing-powder': {
    name: 'Monagodu 501 Washing Powder',
    category: 'Detergent Powder',
    desc: 'Advanced formulation designed to lift and dissolve the toughest grease, mud, and tea stains. Active micro-crystals penetrate deep into fabrics, guaranteeing a bright wash and long lasting freshness that keeps your clothes feeling brand new.',
    ingredients: 'Sodium Carbonate, Linear Alkylbenzene Sulfonate, Enzymes, Brightening Agents, Premium Fragrance',
    sizes: ['500g', '1kg', '3kg', '5kg'],
    img: 'public/images/washing_powder.png'
  },
  'detergent-cake': {
    name: 'Monagodu 501 Detergent Cake',
    category: 'Detergent Cake',
    desc: 'Power-packed detergent bar that lasts longer and scrubs cleaner. Highly effective for collar and cuff cleaning, preserving color vibrancy while remaining gentle on hands.',
    ingredients: 'Sodium Silicate, Mineral Fillers, Coconut Oil Acids, Optical Brighteners, Blueing Agents',
    sizes: ['75g', '150g', '250g'],
    img: 'public/images/detergent_cake.png'
  },
  'liquid-detergent': {
    name: 'Monagodu 501 Liquid Detergent',
    category: 'Liquid Detergent',
    desc: 'High-efficiency liquid wash optimized for both front and top-loading washing machines. Dissolves instantly without leaving residue, nourishing fabrics and enhancing clothing lifespan.',
    ingredients: 'Anionic Surfactants, Nonionic Surfactants, Fabric Softening Polymers, Fragrance Extract',
    sizes: ['500ml', '1L', '5L'],
    img: 'public/images/liquid_detergent.png'
  },
  'fabric-conditioner': {
    name: 'Monagodu 501 Fabric Conditioner',
    category: 'Fabric Conditioner',
    desc: 'Infuse your garments with luxurious softness and a therapeutic Lavender floral fragrance. Prevents static cling, smooths fibers, and ensures clothes feel light and comfortable all day.',
    ingredients: 'Cationic Surfactants, Softening Emulsions, Lavender Fragrance Microcapsules',
    sizes: ['500ml', '1L'],
    img: 'public/images/fabric_conditioner.png'
  },
  'floor-cleaner': {
    name: 'Monagodu 501 Floor Cleaner',
    category: 'Floor Cleaner',
    desc: 'Disinfectant floor cleaner that kills 99.9% of germs. Removes heavy grime, grease, and dirt to deliver crystal-clear, streak-free, shiny floors with a refreshing citrus scent.',
    ingredients: 'Benzalkonium Chloride, Non-ionic Surfactants, Citrus Extract, Colorants, Deionized Water',
    sizes: ['500ml', '1L', '5L'],
    img: 'public/images/floor_cleaner.png'
  },
  'dishwash-liquid': {
    name: 'Monagodu 501 Dishwash Liquid',
    category: 'Dishwash Liquid',
    desc: 'Super-concentrated degreasing dishwash formula powered by real lemon extracts. Neutralizes food odors instantly and leaves utensils sparkling clean with a single drop.',
    ingredients: 'Active Lemon Enzymes, Surfactant Blend, Aloe Vera Skin-Protection Extracts',
    sizes: ['250ml', '500ml', '1L'],
    img: 'public/images/dishwash_liquid.png'
  },
  'bath-soap': {
    name: 'Monagodu 501 Beauty Bath Soap',
    category: 'Bath Soap',
    desc: 'Infused with natural moisturizers and creamy milk proteins to gently cleanse and hydrate. Promotes smooth, glowing skin with every wash, suitable for all skin types.',
    ingredients: 'Sodium Palmate, Glycerin, Milk Lipids, Hydrating Oils, Floral Fragrance',
    sizes: ['75g', '125g'],
    img: 'public/images/bath_soap.png'
  },
  'dishwash-bar': {
    name: 'Monagodu 501 Dishwash Bar',
    category: 'Dishwash Bar',
    desc: 'An effective dishwashing bar with the power of lemon and clay minerals. Cuts through burnt food crusts and oily residues effortlessly, offering hygienic and bright kitchenware.',
    ingredients: 'Acid Slurry, Soda Ash, Lemon Peel Oils, Clay Abrasive Powders',
    sizes: ['200g', '400g'],
    img: 'public/images/dishwash_bar.png'
  }
};

function initProductModals() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.product-modal-close');
  const viewBtns = document.querySelectorAll('.view-product-details');

  // Populate and open modal
  const openModal = (id) => {
    const data = productDatabase[id];
    if (!data) return;

    modal.querySelector('.modal-title').textContent = data.name;
    modal.querySelector('.modal-category').textContent = data.category;
    modal.querySelector('.modal-desc').textContent = data.desc;
    modal.querySelector('#modal-ingredients').textContent = data.ingredients;
    modal.querySelector('.modal-img-wrapper img').src = data.img;
    modal.querySelector('.modal-img-wrapper img').alt = data.name;

    // Populate sizes
    const sizeContainer = modal.querySelector('.size-selector');
    sizeContainer.innerHTML = '';
    data.sizes.forEach((size, idx) => {
      const btn = document.createElement('button');
      btn.className = `size-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = size;
      btn.addEventListener('click', () => {
        sizeContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      sizeContainer.appendChild(btn);
    });

    modal.classList.add('active');
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-product-id');
      openModal(id);
    });
  });

  const closeModal = () => modal.classList.remove('active');
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* --- GALLERY CATEGORY FILTERING & LIGHTBOX --- */
function initGalleryFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.gallery-item');
  if (tabs.length === 0 || items.length === 0) return;

  // Tabs Filtering
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          // trigger slight re-fade
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // Lightbox Integration
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title').textContent;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = title;
      lightbox.classList.add('active');
    });
  });

  const closeLightbox = () => lightbox.classList.remove('active');
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
  });
}

/* --- PRODUCT PAGE SIDEBAR FILTER & SEARCH --- */
function initProductFilter() {
  const searchInput = document.getElementById('product-search');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const products = document.querySelectorAll('.product-card');
  if (products.length === 0) return;

  let activeCategory = 'all';
  let searchQuery = '';

  const filterProducts = () => {
    products.forEach(card => {
      const category = card.getAttribute('data-category');
      const name = card.querySelector('.product-name').textContent.toLowerCase();
      const desc = card.querySelector('.product-meta').textContent.toLowerCase();
      
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => card.style.opacity = '1', 50);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 200);
      }
    });
  };

  // Category Filtering
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      filterProducts();
    });
  });

  // Live Search Filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterProducts();
    });
  }
}

// Category Slider Scroll Buttons
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.categories-track');
  const prevBtn = document.getElementById('cat-prev-btn');
  const nextBtn = document.getElementById('cat-next-btn');
  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
});
