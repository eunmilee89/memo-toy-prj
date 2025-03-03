const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');
// const favoritesRouter = require('./routes/favorites');
const usersRouter = require('./routes/users');
app.use(express.json());

app.use('/notes', notesRouter);
// app.use('/favorites', favoritesRouter);
app.use('/', usersRouter);

app.listen(3000);
