
// Helper to get wishlist from localStorage
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

// Add product to wishlist
function addToWishlist(productId) {
  const wishlist = getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist! ❤️");
  }
}

// Add click listeners to hearts
document.querySelectorAll(".wishlist-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const productId = btn.dataset.id;
    addToWishlist(productId);
  });
});
