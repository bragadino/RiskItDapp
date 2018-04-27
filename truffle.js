// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    ropsten: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 4600000
    },
    development: {
      host: 'localhost',
      port: process.env.PORT,
      network_id: '*',
      gas: 4600000
    },
  }
}
