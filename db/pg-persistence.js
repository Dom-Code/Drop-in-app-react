const { dbQuery } = require('./db-query');

module.exports = class PgPersistence {
  async getPartialProviders() {
    const query = 'SELECT (id, first_name, last_name, specialty, city, photo) FROM providers';
    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return results.rows;
    }
    return null;
  }

  async getFullProviders() {
    const query = 'SELECT * FROM providers';
    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return results.rows;
    }
    return null;
  }

  async addUser(firstName, lastName, userEmail, userPw) {
    const query = `INSERT INTO users (first_name, last_name, email, pw)
    VALUES ('${firstName}', '${lastName}', '${userEmail}', ' ${userPw}')`;

    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return results.rows;
    }
    return null;
  }

  async checkDuplicate(userEmail) {
    const query = `SELECT * FROM users WHERE email LIKE '${userEmail}';`;

    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return true;
    }
    return null;
  }

  async authenticate(userEmail, userPw) {
    const query = `SELECT * FROM users WHERE email = '${userEmail}' AND pw = '${userPw}'`;
    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return results.rows;
    }
    return null;
  }

  async getEmail(userEmail) {
    const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return results.rows;
    }
    return null;
  }

  async getAllUsers() {
    const query = 'SELECT * FROM users';
    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return results.rows;
    }
    return null;
  }

  async addCurrentUser(currentUser) {
    const query = `INSERT INTO current_users (email, refresh_token)
    VALUES('${currentUser.email}', '${currentUser.refreshToken}')`;

    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return results.rows;
    }
    return null;
  }

  async searchWithRefresh(refreshToken) {
    const query = `SELECT * FROM current_users WHERE 'refresh_token' = ${refreshToken}`;

    const results = await dbQuery(query);
    if (results.rowCount > 0) {
      return results.rows;
    }
    return null;
  }

  async searchBlackList(refreshToken) {
    const query = `SELECT * FROM blacklist_refresh_tokens WHERE refresh_token = '${refreshToken}'`;

    const result = await dbQuery(query);
    if (result.rowCount > 0) {
      return result.rows;
    }
    return null;
  }

  async addToBlackList(refreshToken) {
    const query = `INSERT INTO blacklist_refresh_tokens (refresh_token) 
    VALUES('${refreshToken}')`;
    const result = await dbQuery(query);
    if (result.rowCount > 0) {
      return result.rows;
    }
    return null;
  }
};
