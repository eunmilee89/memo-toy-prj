const conn = require('../database/connect/mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email =?';
  conn.query(sql, email, (err, results) => {
    if (err) {
      return res.status(400).end();
    }

    let loginUser = results[0];

    if (loginUser && loginUser.password === password) {
      const token = jwt.sign(
        {
          email: loginUser.email,
          name: loginUser.name,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: '30m',
          issuer: 'chickenmandu',
        }
      );

      res.cookie('token', token, { httpOnly: true });

      res.status(200).json({ message: `${loginUser.name}님 환영합니다.` });
    } else {
      res.status(403).json({
        message: '이메일 또는 비밀번호가 틀렸습니다.',
      });
    }
  });
};

const join = (req, res) => {
  const { name, email, password } = req.body;

  const sql = 'INSERT INTO users (name, email, password) VALUES(?, ?, ?)';
  const values = [name, email, password];
  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(400).end();
    }
    if (results.affectedRows) {
      res.status(201).json({ message: `${name}님 가입을 환영합니다.` });
    }
  });
};

const getUserByEmail = (req, res) => {
  const { email } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  conn.query(sql, email, (err, results) => {
    if (err) {
      return res.status(400).end();
    }

    res.status(200).json(results);
  });
};

const deleteUserByEmail = (req, res) => {
  const { email } = req.body;

  const sql = 'DELETE FROM users WHERE email = ?';
  conn.query(sql, email, (err, results) => {
    if (err) {
      return res.status(400).end();
    }

    if (results.affectedRows === 0) {
      res.status(400).end();
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = { login, join, getUserByEmail, deleteUserByEmail };
