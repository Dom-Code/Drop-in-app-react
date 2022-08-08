const { Client } = require('pg');

module.exports = {
  async dbQuery(statement, ...parameters) {
    const client = new Client({ database: 'drop_in' });
    await client.connect();
    const result = await client.query(statement, parameters);
    await client.end();
    return result;
  },
};
