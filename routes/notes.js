const express = require('express');
const router = express.Router();
const {
  createNote,
  getAllNotes,
  deleteAllNotes,
  getNoteById,
  deleteNoteById,
  updateNoteById,
} = require('../controllers/notes-controller');

router // '/notes'
  .route('/')
  .post(createNote)
  .get(getAllNotes)
  .delete(deleteAllNotes);

router // '/notes/:id'
  .route('/:id')
  .get(getNoteById)
  .delete(deleteNoteById)
  .put(updateNoteById);

module.exports = router;
