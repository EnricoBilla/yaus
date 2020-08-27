const express = require('express');
const api = require('./api')

const app = express();
const PORT = 3000;

app.use(express.static('./static'))
app.use('/api', api);

app.get('/:id', (req, res) => {
    // TODO redirect to the requested url
    const { id: redirect_id } = req.params;
    res.send(`Redirect to ${redirect_id}`);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})