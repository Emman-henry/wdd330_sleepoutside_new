const apiKey = "jsjZTGzXqixC0c6qWzW5mAusci0ZhEzp9ehhkHDc";

// Fetch alerts from NPS API
export async function getWildlifeAlerts(parkCode) {
  const url = `https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
}

// Load alerts and render to container
export async function loadWildlifeAlerts(parkCode, container) {
  container.innerHTML = "<p>Loading...</p>";

  let alerts;
  try {
    alerts = await getWildlifeAlerts(parkCode);
  } catch (err) {
    container.innerHTML = "<p>Error loading alerts.</p>";
    return;
  }

  if (!alerts || !alerts.length) {
    container.innerHTML = `<p>No alerts found for ${parkCode}</p>`;
    return;
  }

  // Render the alerts
  container.innerHTML = alerts
    .map(
      (a) => `
      <div class="alert-card">
        <h3>${a.title}</h3>
        <p>${a.description}</p>
        <p><strong>Category:</strong> ${a.category}</p>
        <a href="${a.url}" target="_blank">More Info</a>
      </div>
    `
    )
    .join("");
}
