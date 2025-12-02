import ProductData from './ProductData.mjs';

const productDetails = document.querySelector("#productDetails");

// --- Get Product ID from the URL ---
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

// --- Load product data ---
const tents = new ProductData("tents");

tents.getData().then(products => {
  const product = products.find(p => p.Id == productId);

  if (!product) {
    productDetails.innerHTML = "<p>Product not found.</p>";
    return;
  }

  // --- Build the product details layout ---
  productDetails.innerHTML = `
    <div class="product-details-card">

      <img src="${product.Image}" alt="${product.Name}" class="product-details-img">

      <div class="product-info">
        <h2>${product.Name}</h2>
        <h3 class="brand">${product.Brand.Name}</h3>
        <p class="price">$${product.FinalPrice.toFixed(2)}</p>

        <p class="description">${product.DescriptionHtmlSimple}</p>

        <button class="wishlist-btn" data-id="${product.Id}">❤️ Add to Wishlist</button>
      </div>

    </div>
  `;
});

// --- Add to Wishlist Logic ---
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("wishlist-btn")) {
    const productId = e.target.dataset.id;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist ❤️");
    } else {
      alert("Already in wishlist");
    }
  }
});
