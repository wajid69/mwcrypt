
const { hashSync, compareSync } = require('../src/index');

const password = 'mySecret123';
const salt = require('../mwcrypt').genSaltSync();
const hashed = require('../mwcrypt').hashSync(password, salt);

console.log('Hashed:', hashed);
console.log('Match:', require('../mwcrypt').compareSync(password, hashed)); // true
console.log('Mismatch:', require('../mwcrypt').compareSync('wrongPass', hashed)); // false
