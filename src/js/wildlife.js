import { loadWildlifeAlerts } from "./wildlife.mjs";

document.querySelector("#search-alerts").addEventListener("click", () => {
  const parkCode = document.querySelector("#park-input").value.trim().toUpperCase();
  const container = document.querySelector("#wildlife-alerts");

  loadWildlifeAlerts(parkCode, container);
});
