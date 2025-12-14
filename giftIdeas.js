const API_URL = "https://dummyjson.com/products";

const productsDiv = document.getElementById("products");
const categorySelect = document.getElementById("category");

let allProducts = [];

// Fetch products
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    allProducts = data.products; // ✅ DummyJSON structure
    displayProducts(allProducts);
    loadCategories(allProducts);
  })
  .catch(err => {
    console.error(err);
    productsDiv.innerHTML = "<p>Unable to load gift ideas.</p>";
  });

// Display products
function displayProducts(products) {
  productsDiv.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.thumbnail}" alt="${product.title}" width="150">
      <p><strong>Price:</strong> $${product.price}</p>
      <p>${product.description}</p>
    `;

    productsDiv.appendChild(card);
  });
}

// Load categories
function loadCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Filter by category
categorySelect.addEventListener("change", () => {
  const selected = categorySelect.value;

  if (selected === "all") {
    displayProducts(allProducts);
  } else {
    displayProducts(allProducts.filter(p => p.category === selected));
  }
});
