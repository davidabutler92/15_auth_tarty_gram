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

  static async insert({ photoUrl, caption, tags, userId }) {
    const { 
      rows
    } = await pool.query(
      'INSERT INTO grams (photo_url, caption, tags, user_id) VALUES ($1, $2, $3, $4) RETURNING *;',
      [photoUrl, caption, tags, userId]
    );
    return new Gram(rows[0]);
  }
};