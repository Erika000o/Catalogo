document.addEventListener('DOMContentLoaded', function () {
    const WHATSAPP_LINK = 'https://wa.me/message/R4BIK2RI5UQOO1';

    const TYPE_LABELS = {
        'una-pieza': 'Una pieza',
        'triptico': 'Tríptico',
        '5-piezas': '5 piezas',
    };

    const PRODUCTS = [
        {
            id: 'pablo-escobar',
            name: 'Cuadro de Pablo Escobar',
            type: 'una-pieza',
            description: 'Hermoso cuadro en vinilo adhesivo con acabado brillante, de la más alta calidad, instalado sobre una lámina MDF de 9 mm.',
            price: '$65.000',
        },
        {
            id: 'tigre-leon',
            name: 'Cuadro de Tigre',
            type: 'una-pieza',
            description: 'Pieza de una sola lámina con un diseño imponente, ideal para dar carácter a cualquier espacio.',
            price: '$70.000',
        },
        {
            id: 'escultura',
            name: 'Cuadro de Escultura',
            type: 'una-pieza',
            description: 'Diseño elegante y minimalista que aporta un toque artístico a tu hogar u oficina.',
            price: '$60.000',
        },
        {
            id: 'enamorados-dp',
            name: 'Cuadro Tríptico de Enamorados D-P',
            type: 'triptico',
            description: 'Tríptico romántico dividido en tres láminas, pensado para espacios que quieren contar una historia.',
            price: '$140.000',
        },
        {
            id: 'triptico-lunas',
            name: 'Cuadro Tríptico de Lunas',
            type: 'triptico',
            description: 'Tres láminas con un diseño sereno y armonioso, perfecto para ambientes relajantes.',
            price: '$90.000',
        },
        {
            id: '5-piezas-perros',
            name: 'Cuadro 5 Piezas de Perros',
            type: '5-piezas',
            description: 'Set de 5 piezas personalizado con tus mascotas preferidas, ideal como regalo o pieza central.',
            price: '$220.000',
        },
    ];

    const placeholderThumb = () => `
        <div class="product-thumb placeholder" role="img" aria-label="Imagen del producto próximamente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <circle cx="8.5" cy="9.5" r="1.7"></circle>
                <path d="M21 16l-5-5-9 9"></path>
            </svg>
        </div>`;

    function renderProducts(list) {
        const productList = document.getElementById('product-list');
        const noResults = document.getElementById('no-results');

        if (!list.length) {
            productList.innerHTML = '';
            noResults.hidden = false;
            return;
        }

        noResults.hidden = true;
        productList.innerHTML = list.map(product => `
            <div class="product" data-type="${product.type}" data-name="${product.name.toLowerCase()}">
                <div class="product-media">
                    ${placeholderThumb()}
                    <span class="product-badge">${TYPE_LABELS[product.type] || ''}</span>
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-actions">
                        <span class="price">${product.price}</span>
                        <button class="buy-btn" type="button" data-name="${product.name}" data-price="${product.price}">Comprar</button>
                    </div>
                </div>
            </div>
        `).join('');

        productList.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                redirectToWhatsApp(btn.getAttribute('data-name'), btn.getAttribute('data-price'));
            });
        });
    }

    function redirectToWhatsApp(productName, productPrice) {
        const message = `¡Hola! Estoy interesado en el producto: ${productName} que cuesta ${productPrice}.`;
        window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
    }

    // ---- Catalog filtering (search + type combined) ----
    let activeType = 'todos';

    function applyFilters() {
        const term = document.getElementById('search-input').value.trim().toLowerCase();
        const filtered = PRODUCTS.filter(product => {
            const matchesType = activeType === 'todos' || product.type === activeType;
            const matchesTerm = !term || product.name.toLowerCase().includes(term);
            return matchesType && matchesTerm;
        });
        renderProducts(filtered);
    }

    renderProducts(PRODUCTS);

    document.getElementById('search-button').addEventListener('click', applyFilters);
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('search-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') applyFilters();
    });

    document.querySelectorAll('.type-btn').forEach(button => {
        button.addEventListener('click', () => {
            activeType = button.getAttribute('data-type');
            document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFilters();
        });
    });

    // ---- Navigation ----
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const navScrim = document.getElementById('nav-scrim');
    const navLinks = document.querySelectorAll('.js-nav-link');
    const modules = document.querySelectorAll('.module');

    function closeMenu() {
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        const isOpen = body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    }

    menuToggle.addEventListener('click', toggleMenu);
    navScrim.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });

    function showModule(moduleId) {
        modules.forEach(module => module.classList.remove('active'));
        const selectedModule = document.getElementById(moduleId);
        if (selectedModule) {
            selectedModule.classList.add('active');
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-module') === moduleId);
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showModule(this.getAttribute('data-module'));
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    showModule('inicio');

    // ---- Footer year ----
    document.getElementById('year').textContent = new Date().getFullYear();
});
