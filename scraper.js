const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


axios.get('amazon.com')
.then(function (response) {
    console.log(response);
})

const dom = new JSDOM();