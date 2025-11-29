import ProductData from './ProductData.mjs';

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function removeFromWishlist(productId) {
  const wishlist = getWishlist().filter(id => id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

function renderWishlist() {
  const wishlist = getWishlist();
  const listEl = document.querySelector("#wishlistList");
  const emptyEl = document.querySelector("#emptyMessage");
  listEl.innerHTML = "";

  if (wishlist.length === 0) {
    emptyEl.style.display = "block";
    return;
  } else {
    emptyEl.style.display = "none";
  }

  const tents = new ProductData("tents");
  tents.getData().then(products => {
    products
      .filter(p => wishlist.includes(p.Id))
      .forEach(product => {
        const li = document.createElement("li");
        li.className = "product-card";

        li.innerHTML = `
          <a href="product.html?product=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
          </a>
          <button class="removeBtn" data-id="${product.Id}">Remove ❌</button>
        `;
        listEl.appendChild(li);
      });

    document.querySelectorAll(".removeBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        removeFromWishlist(e.target.dataset.id);
      });
    });
  });
}

renderWishlist();
