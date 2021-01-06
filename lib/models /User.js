const pool = require('../utils/pool');

module.exports = class User { 
  id;
  email;
  password;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.password = row.password;
  }
};
