const express = require('express');
const router = express.Router();

const {
  handleValidation,
  userIdValidate,
  titleValidate,
  idValidate,
} = require('../middlewares/validation');

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
  .post([userIdValidate, titleValidate, handleValidation], createNote)
  .get([userIdValidate, handleValidation], getAllNotes)
  .delete([userIdValidate, handleValidation], deleteAllNotes);

router // '/notes/:id'
  .route('/:id')
  .get([idValidate, handleValidation], getNoteById)
  .delete([idValidate, handleValidation], deleteNoteById)
  .put([idValidate, handleValidation], updateNoteById);

module.exports = router;
