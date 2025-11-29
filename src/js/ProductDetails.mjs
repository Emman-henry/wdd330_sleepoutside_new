import ProductData from './ProductData.mjs';

const productList = document.querySelector("#productList");
const tents = new ProductData("tents");

tents.getData().then(products => {
  products.forEach(product => {
    const li = document.createElement("li");
    li.className = "product-card";

    li.innerHTML = `
      <a href="product.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
        <p class="product-card__description">${product.DescriptionHtmlSimple}</p>
      </a>
      <button class="wishlist-btn" data-id="${product.Id}">❤️</button>
    `;
    productList.appendChild(li);
  });
});
// Add click listeners to heart buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("wishlist-btn")) {
    const productId = e.target.dataset.id;
    addToWishlist(productId);
  }
});