const { body, param, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).json(err.array());
  }
};

const userIdValidate = body('userId')
  .notEmpty()
  .isInt()
  .withMessage('유저 아이디 숫자 입력 필요');

const titleValidate = body('title')
  .notEmpty()
  .isString()
  .withMessage('제목 문자 입력 필요');

const idValidate = param('id').notEmpty().withMessage('id 필요');

const nameValidate = body('name')
  .notEmpty()
  .isString()
  .withMessage('이름 문자 입력 필요');

const emailValidate = body('email')
  .notEmpty()
  .isEmail()
  .withMessage('이메일 입력 필요');

const passwordValidate = body('password')
  .notEmpty()
  .isString()
  .withMessage('비밀번호 입력 필요');

module.exports = {
  handleValidation,
  userIdValidate,
  titleValidate,
  idValidate,
  nameValidate,
  emailValidate,
  passwordValidate,
};
