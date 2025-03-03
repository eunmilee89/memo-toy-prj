const express = require('express');
const router = express.Router();

const {
  login,
  join,
  getUserByEmail,
  deleteUserByEmail,
} = require('../controllers/users-controller');

const {
  handleValidation,
  emailValidate,
  passwordValidate,
  nameValidate,
} = require('../middlewares/validation');

router.post(
  '/login',
  [emailValidate, passwordValidate, handleValidation],
  login
);

router.post(
  '/join',
  [nameValidate, emailValidate, passwordValidate, handleValidation],
  join
);

router //
  .route('/users')
  .get([emailValidate, handleValidation], getUserByEmail)
  .delete([emailValidate, handleValidation], deleteUserByEmail);

module.exports = router;
