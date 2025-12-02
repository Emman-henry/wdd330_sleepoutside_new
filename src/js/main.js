import ProductData from './ProductData.mjs';
import { loadHeaderFooter } from './utils.mjs';

const productList = document.querySelector("#productList");
const tents = new ProductData("tents");

// Display products dynamically
tents.getData().then(products => {
  products.forEach(product => {
    const li = document.createElement("li");
    li.className = "product-wrapper";

    li.innerHTML = `
      <a href="/product_pages/product.html?product=${product.Id}" class="product-card-link">
        <div class="product-card">
          <img src="${product.Image}" alt="${product.Name}">
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
          <p class="product-card__description">${product.DescriptionHtmlSimple}</p>
        </div>
      </a>
      <button class="wishlist-btn" data-id="${product.Id}">❤️</button>
    `;

    productList.appendChild(li);
  });
});

// Wishlist functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("wishlist-btn")) {
    e.stopPropagation();
    e.preventDefault();
    const productId = e.target.dataset.id;
    addToWishlist(productId);
  }
});

function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist ❤️");
  } else {
    alert("Already in wishlist");
  }
}

// --- Load header/footer first ---
loadHeaderFooter().then(() => {
  // Now header is in DOM, attach dark mode toggle
  const toggleBtn = document.getElementById("dark-mode-toggle");

  // Load saved preference
  if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  // Toggle dark mode
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "on");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("darkMode", "off");
      toggleBtn.textContent = "🌙";
    }
  });
});
