window.onload = function() {
    const container = document.querySelector("#product-container");
    const searchInput = document.querySelector("#search-input");
    const categorySelect = document.querySelector("#category-select");
    const sortSelect = document.querySelector("#sort-select");

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            applyFilters();
        }
    });

    categorySelect.addEventListener('change', () => {
        applyFilters();
    });

    sortSelect.addEventListener('change', () => {
        applyFilters();
    });

    function applyFilters() {
        const searchValue = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const selectedSortOption = sortSelect.value;

        axios.get('http://localhost:3100/products')
            .then(response => {
                const data = response.data;
                console.log(data)

                let filteredData = data;

                if (selectedCategory !== 'all') {
                    filteredData = filteredData.filter(product => product.product_category === selectedCategory);
                }

                if (searchValue !== "") {
                    filteredData = filteredData.filter(product =>
                        product.product_title.toLowerCase().includes(searchValue) ||
                        product.product_description.toLowerCase().includes(searchValue)
                    );
                }

                if (selectedSortOption === 'name') {
                    filteredData.sort((a, b) => a.product_title.localeCompare(b.product_title));
                } else if (selectedSortOption === 'priceAsc') {
                    filteredData.sort((a, b) => a.product_price - b.product_price);
                } else if (selectedSortOption === 'priceDesc') {
                    filteredData.sort((a, b) => b.product_price - a.product_price);
                }

                displayProducts(filteredData);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function populateCategories() {
        axios.get('http://localhost:3100/products')
            .then(response => {
                const data = response.data;
                const categories = ['all', ...new Set(data.map(product => product.product_category))];

                categorySelect.innerHTML = '';

                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.text = category;
                    categorySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    function displayProducts(products) {
        console.log('displayProduct', products)
        container.innerHTML = '';

        products.forEach(product => {
            let productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.style.backgroundImage = `url(${product.product_image})`;
            productDiv.innerHTML = `
                <p class="name">${product.product_title}</p>
                <p class="description">${product.product_description}</p>
                <p class="cost">${product.product_price}</p>
            `;
            productDiv.addEventListener('click', () => {
                redirectToProductPage(product.product_id);
            });
            container.appendChild(productDiv);
        });
    }


    function redirectToProductPage(productId) {
        window.location.href = `./product.html?productId=${productId}`;
    }
    
    populateCategories();
    applyFilters();



}

