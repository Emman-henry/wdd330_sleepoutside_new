// ProductReview.mjs

// Get reviews from localStorage
export function getReviews(productId) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
  return reviews[productId] || [];
}

// Save review to localStorage
export function saveReview(productId, reviewText, rating) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || {};

  if (!reviews[productId]) {
    reviews[productId] = [];
  }

  reviews[productId].push({
    text: reviewText,
    rating: rating,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Render reviews to the page
export function renderReviews(productId, containerSelector) {
  const container = document.querySelector(containerSelector);
  const reviews = getReviews(productId);

  if (!container) return;

  container.innerHTML = "";

  if (reviews.length === 0) {
    container.innerHTML = "<p>No reviews yet. Be the first!</p>";
    return;
  }

  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.classList.add("review");

    div.innerHTML = `
      <strong>Rating:</strong> ${review.rating}/5<br>
      <p>${review.text}</p>
      <small>${review.date}</small>
      <hr>
    `;

    container.appendChild(div);
  });
}

// Attach form events
export function setupReviewForm(productId, formSelector) {
  const form = document.querySelector(formSelector);

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = form.querySelector("#reviewText").value;
    const rating = form.querySelector("#reviewRating").value;

    if (text.trim() === "") return;

    saveReview(productId, text, rating);
    form.reset();
    renderReviews(productId, "#reviewsContainer");
  });
}
