const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');

app.use(express.json());

app.use('/notes', notesRouter);

app.listen(3000);
