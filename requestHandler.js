const mariadb = require('./database/connect/mariadb');

const createNote = (req, res) => {
  const users_id = 1;
  const { title, description, tag } = req.body;

  if (!title) {
    return res.status(400).json({ error: '필수 필드가 누락되었습니다.' });
  }

  const query =
    'INSERT INTO notes(users_id, title, description, tag) VALUES (?, ?, ?, ?)';
  const values = [users_id, title, description || '', tag || ''];

  mariadb.query(query, values, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (rows.affectedRows === 0) {
      return res.status(500).json({ error: '노트가 생성되지 않았습니다.' });
    }
    return res
      .status(201)
      .json({ message: `${title}(이)라는 할 일이 추가되었습니다.` });
  });
};

const getAllNotes = (req, res) => {
  mariadb.query('SELECT * FROM notes', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: '할 일이 존재하지 않습니다.' });
    }

    return res.status(200).json(rows);
  });
};

const deleteAllNotes = (req, res) => {
  mariadb.query('DELETE FROM notes', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }
    return res.json({ message: 'DELETE all notes!' });
  });
};

const getNoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM notes WHERE id = ?';

  mariadb.query(query, id, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: '할 일이 존재하지 않습니다.' });
    }

    return res.status(200).json(rows[0]);
  });
};

const deleteNoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'DELETE FROM notes WHERE id = ?';

  mariadb.query(query, id, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (rows.affectedRows === 0) {
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

  let fields = [];
  let values = [];

  if (title) {
    fields.push('title = ?');
    values.push(title);
  }
  if (description) {
    fields.push('description = ?');
    values.push(description);
  }
  if (tag) {
    fields.push('tag = ?');
    values.push(tag);
  }

  values.push(id);
  const query = `UPDATE notes SET ${fields.join(', ')} WHERE id = ?`;

  mariadb.query(query, values, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'DB 연결 문제가 발생하였습니다.' });
    }

    if (rows.affectedRows === 0) {
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
