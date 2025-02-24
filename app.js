const express = require('express');
const app = express();
const router = require('./routes/memo');

app.use(express.json());
app.use('/notes', router);

app.listen(3000);
