const { genSaltSync, hashSync, compareSync } = require('../mwcrypt');

const password = 'mySecret123';
const salt = genSaltSync();
const hashed = hashSync(password, salt);

console.log('Hashed:', hashed);
console.log('Match:', compareSync(password, hashed)); // true
console.log('Mismatch:', compareSync('wrongPass', hashed)); // false
