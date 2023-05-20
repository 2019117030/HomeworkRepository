window.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector("#product-container");
    const searchInput = document.querySelector("#search-input");
    const categorySelect = document.querySelector("#category-select");
    const sortSelect = document.querySelector("#sort-select"); // 추가


    let productData = [];

    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            productData = data;
            displayProducts(productData);
            populateCategories();
        });

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            applyFilters();
        }
    });

    categorySelect.addEventListener('change', () => {
        applyFilters();
    });

    sortSelect.addEventListener('change', () => { // 추가
        applyFilters();
    });

    function applyFilters() {
        let filteredData = productData;
        const searchValue = searchInput.value;
        const selectedCategory = categorySelect.value;
        const selectedSortOption = sortSelect.value; // 추가

        console.log(selectedCategory)
        if (selectedCategory !== 'all') {
            filteredData = filteredData.filter(product => product.category === selectedCategory);
        }

        console.log(filteredData)
        if (searchValue !== "") {
            filteredData = filteredData.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));
        } else {
            filteredData = filteredData;
        }
        console.log(filteredData)

        if (selectedSortOption === 'name') { // 추가
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedSortOption === 'category') { // 추가
            filteredData.sort((a, b) => a.category.localeCompare(b.category));
        }
        displayProducts(filteredData);
    }

    function populateCategories() {
        const categories = Array.from(new Set(productData.map(product => product.category)));
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.text = category;
            categorySelect.appendChild(option);
        });
    }

    function displayProducts(products) {
        let productContainer = document.querySelector('#product-container');
        productContainer.innerHTML = '';
        products.forEach(product => {
            let productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.style.backgroundImage = `url(${product.image})`;
            productDiv.innerHTML = `<p class="name">${product.name}</p>
                                    <p class="description">${product.description}</p>
                                    <p class="cost">${product.cost}</p>`;
            productContainer.appendChild(productDiv);
        });
    }

});