// Función para obtener los productos de la API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return []; // Retorna un array vacío en caso de error
    }
}

// Función para renderizar los productos en el HTML
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) {
        console.error("No se encontró el contenedor de productos.");
        return;
    }

    productsContainer.innerHTML = ''; // Limpia el contenedor antes de añadir nuevos productos

    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="text-center col-12">No se pudieron cargar los productos. Inténtalo de nuevo más tarde.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = `
            <div class="col">
                <div class="card h-100 product-card shadow-sm">
                    <img src="${product.image}" class="card-img-top p-3" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text text-muted small">${product.category}</p>
                        <p class="card-text description-truncate">${product.description.substring(0, 100)}...</p>
                        <div class="mt-auto"> <p class="fs-4 fw-bold text-primary">$${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="card-footer bg-white border-top-0">
                        <button class="btn btn-dark w-100">Ver Detalles</button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// Inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    renderProducts(products);
});