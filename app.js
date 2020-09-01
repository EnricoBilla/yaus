const express = require('express');

const { api, urls } = require('./api')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./static'))
app.use('/api', api);

app.get('/:id', async (req, res) => {

    const { id } = req.params;

    await urls.findOneAndUpdate({id: id}, { $inc: { clicks: 1} })
        .then(result => {
            res.redirect(result.redirect);
        })
        .catch(error => {
            res.redirect('/?error=Redirect not found');
        });
});

app.listen(PORT, () => {
    console.log(`YAUS running at http://localhost:${PORT}`)
})