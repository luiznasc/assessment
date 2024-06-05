const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const search = 'dish washer'
let products;
let ratings;
let items;
axios({
    // The method used in the request:
    method: 'get',
    // The products search url:
    url: `https://www.amazon.com/s?k=${search}`,
    // This is just so amazon doesn't flag you as a bot/DoS system, setting the User-Agent.
    headers: { 'User-Agent': 'Mozilla/5.0' } , 
})
.then(function (response) { // Response manipulation

    const dom = new JSDOM(response.data); //
    items = dom.window.document.querySelectorAll("[data-component-type='s-search-result']");

    for (var i in items) {
        if (i === 'item') {
            break;
        }
        console.log('\n');
        console.log(`${i} i`);

        let image = items[i].getElementsByClassName('s-image-optimized-rendering')[0].src;
        console.log(image);

        let titleContent = items[i].getElementsByClassName("s-underline-text")[0].getElementsByTagName('span')
        // This flow control is to merge the spans, since sometimes the text content is divided in two.
        let details;
        if (titleContent.length > 1) {
            details = " " + titleContent[1].textContent
        } else {
            details = '';
        }
        titleContent = titleContent[0].textContent + details;
        console.log('TITLE: '+ titleContent);

        // Ratings(stars out of 5)
        let rating = items[i].getElementsByClassName("a-icon-star-small")[0].textContent;
        // Review count
        let numberOfReviews = items[i].querySelectorAll("[data-csa-c-content-id='alf-customer-ratings-count-component']")[0].textContent;
        
        console.log('Rating: ' + rating);
        console.log('Number of Reviews: ' + numberOfReviews);
        
    }
    
})
.catch(err => console.error(err));