const { Client } = require('pg');

module.exports = {
  async dbQuery(statement, ...parameters) {
    const client = new Client({ database: 'drop_in' });
    // const client = new Client(CONNECTION);
    await client.connect();
    const result = await client.query(statement, parameters);
    await client.end();
    return result;
  },
};
