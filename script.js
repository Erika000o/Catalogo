document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    const menuLinks = document.querySelectorAll('.menu-items a');
    const modules = document.querySelectorAll('.module');
    const typeButtons = document.querySelectorAll('.type-btn'); // Agregado
    const products = document.querySelectorAll('.product'); // Agregado

    menuToggle.addEventListener('click', function() {
        body.classList.toggle('menu-open');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const moduleId = this.getAttribute('data-module');

            // Ocultar todos los módulos
            modules.forEach(module => {
                module.classList.remove('active');
            });

            // Mostrar el módulo seleccionado
            const selectedModule = document.getElementById(moduleId);
            if (selectedModule) {
                selectedModule.classList.add('active');
            }

            // Cerrar el menú en dispositivos móviles
            if (window.innerWidth <= 768) {
                body.classList.remove('menu-open');
            }
        });
    });

    // Mostrar el módulo de inicio por defecto
    document.getElementById('inicio').classList.add('active');

    // Filtrado de productos por tipo
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            products.forEach(product => {
                product.style.display = (type === 'todos' || product.getAttribute('data-type') === type) ? 'block' : 'none';
            });
            // Actualiza la clase activa
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});