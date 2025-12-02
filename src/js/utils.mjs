// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Load HTML template from file
export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load template: ${path}`);
  return await response.text();
}

// Render template into a parent element, optional callback
export function renderWithTemplate(template, parent, data, callback) {
  parent.innerHTML = template;
  if (callback) callback();
}

// Load header and footer dynamically
// Load header and footer dynamically
export async function loadHeaderFooter() {
  const headerEl = qs("#site-header");
  const footerEl = qs("#site-footer");

  if (!headerEl || !footerEl) return;

  try {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    renderWithTemplate(headerTemplate, headerEl);
    renderWithTemplate(footerTemplate, footerEl);
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
}
