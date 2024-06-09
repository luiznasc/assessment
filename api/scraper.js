const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function Search(keyword) {
  try {
    const response = await axios({
      // The method used in the request:
      method: "get",
      // The products search url:
      url: `https://www.amazon.com/s?k=${keyword}`,
      // This is just so amazon doesn't flag you as a bot, setting the User-Agent.
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    // Response transformation and filtering
    const dom = new JSDOM(response.data); //
    const items = dom.window.document.querySelectorAll(
      "[data-component-type='s-search-result']"
    );

    // Scraping and building the final result
    let results = {};
    for (var i = 0; i < items.length; i++) {
      // Title scraping
      let titleContent = items[i]
        .getElementsByClassName("s-underline-text")[0]
        .getElementsByTagName("span");

      // This flow control allows merging the title or description spans,
      // since sometimes the text content is divided in two.
      let details;
      if (titleContent.length > 1) {
        details = " " + titleContent[1].textContent;
      } else {
        details = "";
      }
      titleContent = titleContent;
      titleContent = titleContent[0].textContent + details;

      // Ratings(stars out of 5)
      let rating = items[i].getElementsByClassName("a-icon-star-small")[0];
      // Making sure that there are reviews
      rating = rating ? rating.textContent : "";

      // Review count scraping with query selector, since most other choices
      // were either too long or yielding false positives.
      let numberOfReviews = items[i].querySelectorAll(
        "[data-csa-c-content-id='alf-customer-ratings-count-component']"
      )[0];
      // Making sure that number of reviews is present
      numberOfReviews = numberOfReviews ? numberOfReviews.textContent : "";

      // Image scrape
      let image = items[i].getElementsByClassName(
        "s-image-optimized-rendering"
      )[0].src;

      // Basic json object building
      results[i] = {
        title: titleContent,
        rating: rating,
        reviews: numberOfReviews,
        image: image,
      };
    }

    return results;
  } catch (error) {
    // Simple error handling
    return { error: error.message };
  }
}

module.exports = Search;
