const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  userId;
  gramId;
  comment;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.gramId = row.gram_id;
    this.comment = row.comment;
  }

  static async create({ userId, gramId, comment }) {
    const { rows } = await pool.query(
      'INSERT INTO comments (user_id, gram_id, comment) VALUES ($1, $2, $3) RETURNING *',
      [userId, gramId, comment]
    );
    return new Comment(rows[0]); 
  }

  static async delete({ id, userId }) {
    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id=$1 AND user_id=$2 RETURNING *',
      [id, userId]
    );
    return new Comment(rows[0]);
  }
};
