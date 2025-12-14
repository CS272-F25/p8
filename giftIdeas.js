"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const resultsDiv = document.getElementById("results");

  // Placeholder when Etsy approved thier API access
  const API_KEY = "YOUR_API_KEY";

  form.addEventListener("submit", handleSearch);

  async function handleSearch(event) {
    event.preventDefault();

    const keyword = document.getElementById("keyword").value;
    const budget = document.getElementById("budget").value;

    resultsDiv.textContent = "Finding Secret Santa gift ideas...";

    try {
      const response = await fetch(
        `https://api.example.com/gifts?query=${encodeURIComponent(keyword)}`
      );

      if (!response.ok) {
        throw new Error("Gift API request failed");
      }

      const data = await response.json();

      let gifts = data.results;

      // Budget filtering
      if (budget !== "") {
        gifts = gifts.filter(gift => gift.price <= budget);
      }

      displayResults(gifts);
    } catch (error) {
      console.error(error);
      resultsDiv.textContent = "Unable to load gift ideas.";
    }
  }

  function displayResults(gifts) {
    resultsDiv.innerHTML = "";

    if (!gifts || gifts.length === 0) {
      resultsDiv.textContent = "No gift ideas found.";
      return;
    }

    gifts.slice(0, 5).forEach(gift => {
      const giftDiv = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = gift.name;

      const description = document.createElement("p");
      description.textContent = gift.description;

      const price = document.createElement("p");
      price.textContent = `Estimated price: $${gift.price}`;

      giftDiv.appendChild(title);
      giftDiv.appendChild(description);
      giftDiv.appendChild(price);

      resultsDiv.appendChild(giftDiv);
    });
  }
});
