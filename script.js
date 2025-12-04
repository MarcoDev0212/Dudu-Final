// Dados dos produtos com múltiplas imagens
const products = [
    {
        id: 1,
        name: "Camiseta Boss Black",
        price: 89.90,
        images: [
            "BossPreta.png"
        ],
        description: "Uma peça desenvolvida para quem não abre mão de qualidade e estilo, a Camiseta Estampada Boss Life é um item indispensável no seu guarda-roupa.",
        featured: true,
        rating: 5.0,
        category: "boss",
        tags: ["boss"]
    },
    {
        id: 2,
        name: "Camiseta Boss Blue",
        price: 89.90,
        images: [
            "boss_azul.jpeg"
        ],
        description: "Uma peça desenvolvida para quem não abre mão de qualidade e estilo, a Camiseta Estampada Boss Life é um item indispensável no seu guarda-roupa.",
        featured: true,
        rating: 5.0,
        category: "boss",
        tags: ["boss"]
    },
    {
        id: 3,
        name: "Camisa Boss White",
        price: 89.90,
        images: [
            "boss_branca (1).jpeg"
        ],
        description: "Uma peça desenvolvida para quem não abre mão de qualidade e estilo, a Camiseta Estampada Boss Life é um item indispensável no seu guarda-roupa.",
        featured: false,
        rating: 5.0,
        category: "boss",
        tags: ["boss"]
    },
    {
        id: 4,
        name: "Camisa Giorgio Armani Black",
        price: 89.90,
        images: [
            "giorgio_armani.jpeg"                                       
        ],
        description: "Camisa com logo preto de algodão, Giorgio Armani. Com decote careca, mangas curtas, barra reta, ajuste folgado e logo estampado.",
        featured: true,
        rating: 5.0,
        category: "armani",
        tags: ["armani"]
    },
    {
        id: 5,
        name: "Camisa Armani Exchange Bege",
        price: 89.90,
        images: [
            "armani_bege (1).jpeg"                                       
        ],
        description: "Uma peça desenvolvida para quem não abre mão de qualidade e estilo, a Camiseta Estampada Boss Life é um item indispensável no seu guarda-roupa.",
        featured: true,
        rating: 5.0,
        category: "armani",
        tags: ["armani"]
    },
    {
        id: 6,
        name: "Camisa Armani Exchange White",
        price: 89.90,
        images: [
            "armani.jpeg"                                       
        ],
        description: "Uma peça desenvolvida para quem não abre mão de qualidade e estilo, a Camiseta Estampada Boss Life é um item indispensável no seu guarda-roupa.",
        featured: true,
        rating: 5.0,
        category: "armani",
        tags: ["armani"]
    },
    {
        id: 7,
        name: "Camisa Armani Exchange Black",
        price: 89.90,
        images: [
            "armani_black.jpeg"                                       
        ],
        description: "Camisa com logo preto de algodão, Giorgio Armani. Com decote careca, mangas curtas, barra reta, ajuste folgado e logo estampado.",
        featured: true,
        rating: 5.0,
        category: "armani",
        tags: ["armani"]
    }
];

// Dados das novidades
const novidades = [
    {
        id: 101,
        name: "Coleção Surf Premium",
        price: 0.00,
        image: "Camisapuma.png",
        tag: "EM BREVE",
        description: "Linha especial inspirada no lifestyle surf, com tecidos tecnológicos e designs modernos.",
        badge: "Novidades",
        launchDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    },
    {
        id: 102,
        name: "Moletones Premium",
        price: 0.00,
        image: "canguru.png",
        tag: "EM BREVE", 
        description: "Conforto e estilo em moletons de alta qualidade para o inverno 2025.",
        badge: "Novidades",
        launchDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
    },
    {
        id: 103,
        name: "Bermudas Signature",
        price: 0.00,
        image: "bermu.png",
        tag: "EM BREVE",
        description: "Bermudas masculinas com cortes modernos e tecidos de última geração.",
        badge: "Novidades",
        launchDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000)
    }    
];

// Elementos DOM
const productsGrid = document.getElementById('productsGrid');
const productsFilter = document.getElementById('productsFilter');
const novidadesGrid = document.getElementById('novidadesGrid');
const productModal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalGalleryThumbs = document.getElementById('modalGalleryThumbs');
const sizeOptions = document.querySelectorAll('.size-option');
const addToCartBtn = document.getElementById('addToCartBtn');
const closeModal = document.getElementById('closeModal');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const continueShopping = document.getElementById('continueShopping');
const checkoutBtn = document.getElementById('checkoutBtn');
const whatsappFloat = document.getElementById('whatsappFloat');
const cartCount = document.querySelector('.cart-count');
const header = document.getElementById('header');

// Variáveis globais
let cart = [];
let selectedProduct = null;
let selectedSize = null;
let currentModalImageIndex = 0;
let countdownIntervals = [];
let currentFilter = 'all';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupFilters();
    renderNovidades();
    setupEventListeners();
    updateCartCount();
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Animação de entrada para elementos ao rolar
    setupScrollAnimations();
});

// Configurar animações de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.product-card, .novidade-card, .section-header, .products-filter').forEach(el => {
        observer.observe(el);
    });
}

// Configurar filtros
function setupFilters() {
    const filterButtons = productsFilter.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });
}

// Renderizar produtos com filtro
function renderProducts() {
    productsGrid.innerHTML = '';
    
    let filteredProducts = products;
    
    if (currentFilter === 'featured') {
        filteredProducts = products.filter(p => p.featured);
    } else if (currentFilter === 'boss') {
        filteredProducts = products.filter(p => p.tags.includes('boss'));
    } else if (currentFilter === 'armani') {
        filteredProducts = products.filter(p => p.tags.includes('armani'));
    } else if (currentFilter === 'novo') {
        filteredProducts = products.filter(p => p.tags.includes('novo'));
    }
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
    
    animateCardsIn();
}

// Animar entrada dos cards
function animateCardsIn() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Criar card de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    let badgeHTML = '';
    if (product.badge) {
        badgeHTML = `<div class="product-badge">${product.badge}</div>`;
    }
    
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(product.rating)) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    let galleryHTML = '';
    if (product.images && product.images.length > 1) {
        let thumbnailsHTML = '';
        product.images.forEach((img, index) => {
            const activeClass = index === 0 ? 'active' : '';
            thumbnailsHTML += `
                <div class="gallery-thumb ${activeClass}" data-index="${index}">
                    <img src="${img}" alt="${product.name}" loading="lazy">
                </div>
            `;
        });
        
        galleryHTML = `
            <div class="product-gallery">
                <div class="gallery-main">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image" data-id="${product.id}" loading="lazy">
                    <div class="quick-view-icon" data-id="${product.id}">
                        <i class="fas fa-expand"></i>
                    </div>
                    <div class="gallery-nav prev"><i class="fas fa-chevron-left"></i></div>
                    <div class="gallery-nav next"><i class="fas fa-chevron-right"></i></div>
                    <div class="mobile-gallery-indicator">
                        <i class="fas fa-images"></i>
                        <span>${product.images.length} imagens</span>
                    </div>
                </div>
                <div class="gallery-thumbnails">
                    ${thumbnailsHTML}
                </div>
            </div>
        `;
    } else {
        galleryHTML = `
            <div class="product-image-container">
                <img src="${product.images ? product.images[0] : product.image}" alt="${product.name}" class="product-image" data-id="${product.id}" loading="lazy">
                <div class="quick-view-icon" data-id="${product.id}">
                    <i class="fas fa-expand"></i>
                </div>
            </div>
        `;
    }
    
    card.innerHTML = `
        ${badgeHTML}
        ${galleryHTML}
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">
                ${starsHTML} <span>${product.rating}</span>
            </div>
            <div class="product-price">
                R$ <span>${product.price.toFixed(2)}</span>
            </div>
            <div class="size-selector-card">
                <label>Tamanho:</label>
                <div class="size-options-card" data-product-id="${product.id}">
                    <div class="size-option-card" data-size="P">P</div>
                    <div class="size-option-card" data-size="M">M</div>
                    <div class="size-option-card" data-size="G">G</div>
                    <div class="size-option-card" data-size="GG">GG</div>
                </div>
            </div>
            <div class="product-actions">
                <button class="quick-view" data-id="${product.id}">Ver Detalhes</button>
                <button class="add-to-cart" data-id="${product.id}" disabled>Comprar</button>
            </div>
        </div>
    `;
    
    if (product.images && product.images.length > 1) {
        setupProductGallery(card, product);
    }
    
    setupSizeSelector(card, product.id);
    
    return card;
}

// Configurar galeria de imagens para um produto
function setupProductGallery(card, product) {
    const galleryMain = card.querySelector('.gallery-main');
    const mainImage = galleryMain.querySelector('img');
    const thumbs = card.querySelectorAll('.gallery-thumb');
    const prevBtn = card.querySelector('.gallery-nav.prev');
    const nextBtn = card.querySelector('.gallery-nav.next');
    
    let currentImageIndex = 0;
    
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery();
        });
    });
    
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
        updateGallery();
    });
    
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % product.images.length;
        updateGallery();
    });
    
    function updateGallery() {
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            mainImage.src = product.images[currentImageIndex];
            mainImage.style.opacity = '1';
            mainImage.style.transform = 'scale(1)';
        }, 200);
        
        thumbs.forEach((thumb, index) => {
            if (index === currentImageIndex) {
                thumb.classList.add('active');
                thumb.style.transform = 'scale(1.1)';
            } else {
                thumb.classList.remove('active');
                thumb.style.transform = 'scale(1)';
            }
        });
    }
}

// Configurar seletor de tamanho para um produto
function setupSizeSelector(card, productId) {
    const sizeOptions = card.querySelectorAll('.size-option-card');
    const addToCartBtn = card.querySelector('.add-to-cart');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => {
                opt.classList.remove('selected');
                opt.style.transform = 'scale(1)';
            });
            
            option.classList.add('selected');
            option.style.transform = 'scale(1.1)';
            
            addToCartBtn.disabled = false;
            addToCartBtn.style.background = 'linear-gradient(135deg, var(--secondary), var(--accent))';
            addToCartBtn.style.color = 'var(--primary)';
            
            option.style.animation = 'none';
            setTimeout(() => {
                option.style.animation = 'badgePulse 0.5s ease';
            }, 10);
        });
    });
}

// Renderizar produtos em destaque na seção de novidades
function renderNovidades() {
    novidadesGrid.innerHTML = '';
    novidades.forEach((novidade, index) => {
        const novidadeCard = createNovidadeCard(novidade, index);
        novidadesGrid.appendChild(novidadeCard);
    });
}

// Criar card de novidade
function createNovidadeCard(novidade, index) {
    const card = document.createElement('div');
    card.className = 'novidade-card';
    
    const now = new Date();
    const timeRemaining = novidade.launchDate - now;
    
    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    days = Math.max(0, days);
    hours = Math.max(0, hours);
    minutes = Math.max(0, minutes);
    
    card.innerHTML = `
        <div class="novidade-tag">${novidade.tag}</div>
        <div class="novidade-image-container">
            <img src="${novidade.image}" alt="${novidade.name}" class="novidade-image">
        </div>
        <div class="novidade-info">
            <h3 class="novidade-title">${novidade.name}</h3>
            <p class="novidade-description">${novidade.description}</p>
            <div class="novidade-badge">${novidade.badge}</div>
            <div class="countdown-timer" id="countdown-${index}">
               
            <div class="novidade-cta">
                <button class="notify-btn" onclick="notifyMe('${novidade.name}')">
                    <i class="fas fa-bell"></i> Avise-me
                </button>
            </div>
        </div>
    `;
    
    startCountdownForNovidade(novidade, index);
    
    return card;
}

// Iniciar contador para uma novidade
function startCountdownForNovidade(novidade, index) {
    const interval = setInterval(() => {
        updateCountdown(novidade, index);
    }, 1000);
    
    countdownIntervals.push(interval);
}

// Atualizar contador individual
function updateCountdown(novidade, index) {
    const now = new Date();
    const timeRemaining = novidade.launchDate - now;
    
    if (timeRemaining <= 0) {
        document.getElementById(`days-${index}`).textContent = '0';
        document.getElementById(`hours-${index}`).textContent = '0';
        document.getElementById(`minutes-${index}`).textContent = '0';
        return;
    }
    
    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById(`days-${index}`).textContent = days;
    document.getElementById(`hours-${index}`).textContent = hours;
    document.getElementById(`minutes-${index}`).textContent = minutes;
}

// Configurar event listeners
function setupEventListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('product-image') || 
            e.target.classList.contains('quick-view') || 
            e.target.classList.contains('mobile-gallery-indicator') ||
            e.target.classList.contains('quick-view-icon') ||
            e.target.closest('.quick-view-icon')) {
            
            const productId = parseInt(e.target.getAttribute('data-id') || 
                                      e.target.closest('[data-id]').getAttribute('data-id'));
            openProductModal(productId);
        }
        
        if (e.target.classList.contains('add-to-cart') && !e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const card = e.target.closest('.product-card');
            const selectedSizeOption = card.querySelector('.size-option-card.selected');
            
            if (selectedSizeOption) {
                const size = selectedSizeOption.getAttribute('data-size');
                addToCartDirectly(productId, size, card);
            }
        }
    });

    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => {
                opt.classList.remove('selected');
                opt.style.transform = 'scale(1)';
            });
            
            option.classList.add('selected');
            option.style.transform = 'scale(1.1)';
            selectedSize = option.getAttribute('data-size');
            
            option.style.animation = 'none';
            setTimeout(() => {
                option.style.animation = 'badgePulse 0.5s ease';
            }, 10);
        });
    });

    addToCartBtn.addEventListener('click', addToCart);

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCart();
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (window.innerWidth > 992 && e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    continueShopping.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    checkoutBtn.addEventListener('click', finalizePurchase);

    whatsappFloat.addEventListener('click', () => {
        window.open(`https://wa.me/5538998287571`, '_blank');
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para notificar sobre lançamento
function notifyMe(productName) {
    const message = `Olá! Gostaria de ser avisado quando o produto "${productName}" estiver disponível.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5551992520046?text=${encodedMessage}`, '_blank');
}

// Abrir modal do produto
function openProductModal(productId) {
    selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
        modalImage.src = selectedProduct.images ? selectedProduct.images[0] : selectedProduct.image;
        modalTitle.textContent = selectedProduct.name;
        modalPrice.textContent = `R$ ${selectedProduct.price.toFixed(2)}`;
        modalDescription.textContent = selectedProduct.description;
        
        sizeOptions.forEach(opt => {
            opt.classList.remove('selected');
            opt.style.transform = 'scale(1)';
        });
        selectedSize = null;
        
        setupModalGallery(selectedProduct);
        
        productModal.style.display = 'block';
        
        modalImage.style.opacity = '0';
        modalImage.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modalImage.style.opacity = '1';
            modalImage.style.transform = 'scale(1)';
            modalImage.style.transition = 'all 0.5s ease';
        }, 100);
    }
}

// Configurar galeria no modal
function setupModalGallery(product) {
    modalGalleryThumbs.innerHTML = '';
    
    if (product.images && product.images.length > 1) {
        product.images.forEach((img, index) => {
            const thumb = document.createElement('div');
            thumb.className = `modal-gallery-thumb ${index === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${img}" alt="${product.name}">`;
            
            thumb.addEventListener('click', () => {
                modalImage.style.opacity = '0';
                modalImage.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    modalImage.src = img;
                    modalImage.style.opacity = '1';
                    modalImage.style.transform = 'scale(1)';
                }, 200);
                
                currentModalImageIndex = index;
                
                document.querySelectorAll('.modal-gallery-thumb').forEach(t => {
                    t.classList.remove('active');
                    t.style.transform = 'scale(1)';
                });
                
                thumb.classList.add('active');
                thumb.style.transform = 'scale(1.1)';
            });
            
            modalGalleryThumbs.appendChild(thumb);
        });
    }
}

// Adicionar produto ao carrinho diretamente do card
function addToCartDirectly(productId, size, card) {
    selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
        selectedSize = size;
        
        const existingItem = cart.find(item => 
            item.id === selectedProduct.id && item.size === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                image: selectedProduct.images ? selectedProduct.images[0] : selectedProduct.image,
                size: selectedSize,
                quantity: 1
            });
        }

        updateCartCount();
        
        const button = card.querySelector('.add-to-cart');
        const originalText = button.textContent;
        const originalBg = button.style.background;
        
        button.classList.add('cart-add-animation');
        button.textContent = '✓ Adicionado!';
        button.style.background = '#27ae60';
        button.style.color = 'white';
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = originalBg;
            button.style.color = '';
            button.style.transform = '';
            button.classList.remove('cart-add-animation');
        }, 1500);
        
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
        
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }
}

// Adicionar produto ao carrinho do modal
function addToCart() {
    if (!selectedSize) {
        alert('Por favor, selecione um tamanho.');
        return;
    }

    const existingItem = cart.find(item => 
        item.id === selectedProduct.id && item.size === selectedSize
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.images ? selectedProduct.images[0] : selectedProduct.image,
            size: selectedSize,
            quantity: 1
        });
    }

    updateCartCount();
    productModal.style.display = 'none';
    
    const originalText = addToCartBtn.textContent;
    addToCartBtn.textContent = '✓ Adicionado!';
    addToCartBtn.style.background = '#27ae60';
    addToCartBtn.classList.add('cart-add-animation');
    
    setTimeout(() => {
        addToCartBtn.textContent = originalText;
        addToCartBtn.style.background = '';
        addToCartBtn.classList.remove('cart-add-animation');
    }, 1500);
    
    cartIcon.style.transform = 'scale(1.2)';
    cartCount.style.transform = 'scale(1.3)';
    
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
        cartCount.style.transform = 'scale(1)';
    }, 300);
}

// Renderizar carrinho
function renderCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 60px 0; color: #6c757d;">Seu carrinho está vazio.<br><span style="font-size: 14px;">Adicione alguns produtos incríveis!</span></p>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.style.animationDelay = `${index * 0.1}s`;
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-size">Tamanho: ${item.size}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}"><i class="fas fa-trash"></i> Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            decreaseQuantity(index);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            increaseQuantity(index);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeItem(index);
        });
    });
}

// Aumentar quantidade do item no carrinho
function increaseQuantity(index) {
    if (cart[index]) {
        cart[index].quantity += 1;
        renderCart();
        updateCartCount();
        
        const plusBtn = document.querySelector(`.quantity-btn.plus[data-index="${index}"]`);
        plusBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            plusBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

// Diminuir quantidade do item no carrinho
function decreaseQuantity(index) {
    if (cart[index]) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            renderCart();
            updateCartCount();
            
            const minusBtn = document.querySelector(`.quantity-btn.minus[data-index="${index}"]`);
            minusBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                minusBtn.style.transform = 'scale(1)';
            }, 200);
        } else {
            removeItem(index);
        }
    }
}

// Remover item do carrinho
function removeItem(index) {
    if (cart[index]) {
        const itemElement = document.querySelector(`.cart-item:nth-child(${index + 1})`);
        if (itemElement) {
            itemElement.style.transform = 'translateX(100%)';
            itemElement.style.opacity = '0';
            itemElement.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                cart.splice(index, 1);
                renderCart();
                updateCartCount();
            }, 400);
        } else {
            cart.splice(index, 1);
            renderCart();
            updateCartCount();
        }
    }
}

// Atualizar contador do carrinho
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }
}

// Finalizar compra
function finalizePurchase() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    let message = "🛍️ *PEDIDO DC-STORE* 🛍️\n\n";
    message += "Olá, gostaria de fazer o seguinte pedido:\n\n";
    
    cart.forEach(item => {
        message += `▪️ ${item.name} (Tamanho: ${item.size})\n`;
        message += `   Quantidade: ${item.quantity} | R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `*TOTAL: R$ ${calculateTotal().toFixed(2)}*\n\n`;
    message += `_Por favor, confirme os dados abaixo:_\n`;
    message += `📋 Nome: \n`;
    message += `📞 Telefone: \n`;
    message += `📍 Endereço: \n`;
    message += `💳 Forma de Pagamento: \n\n`;
    message += `Aguardo confirmação! Obrigado.`;
    
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/5538998287571?text=${encodedMessage}`, '_blank');
    
    setTimeout(() => {
        cart = [];
        updateCartCount();
        cartModal.style.display = 'none';
    }, 1000);
}

// Calcular total do carrinho
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Exportar funções para uso global (necessário para onclick no HTML)
window.notifyMe = notifyMe;
