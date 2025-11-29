// ✅ Put this at the VERY TOP
console.log("JS loaded!");

// Your imports
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Add product to cart correctly
function addProductToCart(product) {
  // Get cart from localStorage
  let cart = getLocalStorage("so-cart");

  // If cart is null or not an array, reset to empty array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add product
  cart.push(product);

  // Save updated cart
  setLocalStorage("so-cart", cart);

  console.log("Product added to cart:", product);
  console.log("Current cart:", cart);
}

// Add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
