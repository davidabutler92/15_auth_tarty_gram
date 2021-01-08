const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  passwordHash;
  profilePhoto;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.profilePhoto = row.profile_photo_url;
  }

  static async insert({ email, passwordHash, profilePhoto }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO users (email, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING *;',
      [email, passwordHash, profilePhoto]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE EMAIL=$1',
      [email]
    );

    if(!rows[0]) throw new Error(`No user with the email ${email}`);
    return new User(rows[0]);
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }

};
