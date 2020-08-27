const express = require('express');

const app = express();
const PORT = 3000;

app.get('/api', (req, res) => {
    res.json({
        message: "api is working",
    });
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})