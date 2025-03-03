const mariadb = require('../database/connect/mariadb');

const createNote = (req, res) => {
  const { userId, title, description, tag } = req.body;

  const query = `INSERT INTO notes (user_id, title, description, tag) VALUES (?, ?, COALESCE(?, ''), COALESCE(?, ''))`;
  const values = [userId, title, description, tag];

  mariadb.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (results.affectedRows === 0) {
      return res.status(500).json({ error: '노트가 생성되지 않았습니다.' });
    }
    return res
      .status(201)
      .json({ message: `${title}(이)라는 할 일이 추가되었습니다.` });
  });
};

const getAllNotes = (req, res) => {
  const { userId } = req.body;

  const sql = 'SELECT * FROM notes WHERE user_id = ?';

  mariadb.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (results.length) {
      res.status(200).json(results);
    } else {
      res.status(404).json({
        message: '노트를 찾을 수 없습니다.',
      });
    }
  });
};

const deleteAllNotes = (req, res) => {
  const { userId } = req.body;

  mariadb.query(
    'DELETE FROM notes WHERE user_id = ?',
    userId,
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: 'DB 연결 문제가 발생하였습니다.' });
      }
      return res.json({ message: '모든 노트가 삭제되었습니다.' });
    }
  );
};

const getNoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM notes WHERE id = ?';

  mariadb.query(query, id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (results.length) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({
        message: '할 일을 찾을 수 없습니다.',
      });
    }
  });
};

const deleteNoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'DELETE FROM notes WHERE id = ?';

  mariadb.query(query, id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: '삭제할 할 일이 존재하지 않습니다.' });
    }

    return res.status(200).json({ message: `할 일 ${id}번이 삭제되었습니다.` });
  });
};

const updateNoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, tag } = req.body;

  const query = `UPDATE notes SET title = COALESCE(?, title),
        description = COALESCE(?, description), tag = COALESCE(?, tag) WHERE id = ?`;

  const values = [title, description, tag, id];

  mariadb.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: '수정할 할 일이 존재하지 않습니다.' });
    }

    return res.status(200).json({ message: `할 일 ${id}번이 수정되었습니다.` });
  });
};

module.exports = {
  createNote,
  getAllNotes,
  deleteAllNotes,
  getNoteById,
  deleteNoteById,
  updateNoteById,
};
