const express = require('express');
const api = require('./api')

const app = express();
const PORT = 3000;

app.use(express.static('./static'))
app.use('/api', api);

app.get('/:id', (req, res) => {
    // TODO redirect to the requested url
    const { id } = req.params;
    res.send(`Redirect to ${id}`);
});

app.listen(PORT, () => {
    console.log(`YAUS running at http://localhost:${PORT}`)
})