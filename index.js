const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
    res.send('<p>Information on <a href=assessment>assessment</a></p>');
})
app.get('/assessment', function(req, res) {
    res.sendFile(__dirname + '/assessment.html');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

