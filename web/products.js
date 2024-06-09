async function search(url) {
  // Api request through fetch
  const data = await fetch(url).then((response) => response.json());
  return data;
}

async function searchProducts() {
  // Capturing the keyword from the search field
  const keyword = document.querySelector(".search-input").value;
  // Making the async request to the api
  const result = await search(
    `http://localhost:3000/api/scrape?keyword=${keyword}`
  );

  // Building the new products div
  const newProducts = document.createElement("div");
  newProducts.id = "product-list";

  // Iterating through the results to populate the div
  for (var i = 0; i < Object.keys(result).length; i++) {
    var item = document.createElement("div");
    item.className = `search-result search-result-${i}`;

    var image = document.createElement("img");
    image.src = result[i].image;

    var title = document.createElement("div");
    title.className = `detailed-info search-title search-title-${i}`;
    title.textContent = "Product title: " + result[i].title;

    var rating = document.createElement("div");
    rating.className = `detailed-info`
    rating.innerHTML = `<span class='rating rating-${i}'>rating: ${result[i].rating}</span>`;

    var numberOfRatings = document.createElement("div");
    numberOfRatings.className = `detailed-info`
    numberOfRatings.innerHTML = `<span class='number-of-ratings number-of-ratings-${i}'>${result[i].reviews} reviews</span>`;

    itemDescription = document.createElement("div");
    itemDescription.appendChild(title);
    itemDescription.appendChild(rating);
    itemDescription.appendChild(numberOfRatings);
    itemDescription.className = `description description-${i}`;
    item.appendChild(image);
    item.appendChild(itemDescription);
    newProducts.appendChild(item);
  }

  const products = document.getElementById("product-list");
  products.replaceWith(newProducts)
}
