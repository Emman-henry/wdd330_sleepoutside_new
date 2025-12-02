import ProductData from '../js/ProductData.mjs'; // adjust path if needed

const wishlistList = document.querySelector("#wishlistList");
const emptyMessage = document.querySelector("#emptyMessage");

const tents = new ProductData("tents");

// Get wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function renderWishlist() {
  // Clear current list
  wishlistList.innerHTML = "";

  if (wishlist.length === 0) {
    emptyMessage.style.display = "block";
    return;
  } else {
    emptyMessage.style.display = "none";
  }

  tents.getData().then(products => {
    // Filter only wishlist products
    const wishlistProducts = products.filter(p => wishlist.includes(p.Id.toString()));

    wishlistProducts.forEach(product => {
      const li = document.createElement("li");
      li.className = "product-card";

      li.innerHTML = `
        <img src="${product.Image}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
        <button class="remove-btn" data-id="${product.Id}">Remove ❤️</button>
      `;

      wishlistList.appendChild(li);
    });
  });
}

// Remove product from wishlist
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const productId = e.target.dataset.id;
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
  }
});

// Initial render
renderWishlist();
