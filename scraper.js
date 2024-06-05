const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const search = 'tupperware'
let products;
let ratings;
let numberOfRatings;
axios({
    method: 'get',
    url: `https://www.amazon.com/s?k=${search}`,
})
.then(function (response) {
    const dom = new JSDOM(response.data);
    // products = dom.window.document.getElementsByTagName()

    ratings = dom.window.document.getElementsByClassName('a-icon-star-small');

    // Walking through the ratings within the product list
    for (var i in ratings) {
        // console.log(ratings[i].textContent);
    };

    numberOfRatings = dom.window.document.querySelectorAll("[data-component-type='s-search-result']");
    for (var i in numberOfRatings) {
        console.log(numberOfRatings[i], i);
    }
})
.catch(err => console.error(err));