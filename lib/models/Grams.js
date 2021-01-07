const pool = require('../utils/pool');

module.exports = class Gram {
  id;
  photoUrl;
  caption;
  tags;
  userId;

  constructor(row) {
    this.id = String(row.id);
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
    this.userId = String(row.user_id);
  }

  static async create({ photoUrl, caption, tags, userId }) {
    const { 
      rows
    } = await pool.query(
      'INSERT INTO grams (photo_url, caption, tags, user_id) VALUES ($1, $2, $3, $4) RETURNING *;',
      [photoUrl, caption, tags, userId]
    );
    return new Gram(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM grams'
    );
    if(!rows[0]) throw new Error('No grams currently in directory');
    return rows.map(row => new Gram(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM grams where id=$1',
      [id]
    );
    if(!rows[0]) throw new Error(`No grams found with id of ${id}`);
    return new Gram(rows[0]);
  }

  static async delete(id, userId) {
    const { rows } = await pool.query(
      'DELETE FROM grams where id=$1 AND user_id=$2 RETURNING *',
      [id, userId]
    );
    return new Gram(rows[0]);
  }
};
