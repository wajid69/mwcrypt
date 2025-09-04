
const crypto = require('crypto');

const SALT_LENGTH = 16;
const DEFAULT_ROUNDS = 10;
const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

function genSaltSync(rounds = DEFAULT_ROUNDS) {
  if (typeof rounds !== 'number') throw new Error('Rounds must be a number');
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  return `$2b$${rounds}$${salt}`;
}

function genSalt(rounds = DEFAULT_ROUNDS, cb) {
  if (typeof rounds === 'function') {
    cb = rounds;
    rounds = DEFAULT_ROUNDS;
  }
  crypto.randomBytes(SALT_LENGTH, (err, buf) => {
    if (err) return cb(err);
    cb(null, `$2b$${rounds}$${buf.toString('hex')}`);
  });
}

function hashSync(password, salt) {
  if (!password || !salt) throw new Error('Password and salt required');
  const rounds = getRounds(salt);
  const saltVal = salt.split('$')[3];
  const hash = crypto.pbkdf2Sync(password, saltVal, ITERATIONS * rounds, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}$${hash}`;
}

function hash(password, salt, cb) {
  if (typeof salt === 'function') {
    cb = salt;
    salt = genSaltSync();
  }
  const rounds = getRounds(salt);
  const saltVal = salt.split('$')[3];
  crypto.pbkdf2(password, saltVal, ITERATIONS * rounds, KEY_LENGTH, DIGEST, (err, derivedKey) => {
    if (err) return cb(err);
    cb(null, `${salt}$${derivedKey.toString('hex')}`);
  });
}

function compareSync(password, hash) {
  const parts = hash.split('$');
  const salt = parts.slice(0, 4).join('$');
  const hashed = hashSync(password, salt);
  return timingSafeEqual(hashed, hash);
}

function compare(password, hash, cb) {
  const parts = hash.split('$');
  const salt = parts.slice(0, 4).join('$');
  hash(password, salt, (err, hashed) => {
    if (err) return cb(err);
    cb(null, timingSafeEqual(hashed, hash));
  });
}

function getRounds(hash) {
  const parts = hash.split('$');
  if (parts.length < 4) throw new Error('Invalid hash format');
  return parseInt(parts[2], 10);
}

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function checkPasswordStrength(password) {
  if (typeof password !== 'string') return false;
  const length = password.length >= 8;
  const upper = /[A-Z]/.test(password);
  const lower = /[a-z]/.test(password);
  const number = /[0-9]/.test(password);
  const special = /[^A-Za-z0-9]/.test(password);
  return length && upper && lower && number && special;
}

function getHashVersion(hash) {
  const parts = hash.split('$');
  return parts[1] || null;
}

module.exports = {
  genSaltSync,
  genSalt,
  hashSync,
  hash,
  compareSync,
  compare,
  getRounds,
  timingSafeEqual,
  checkPasswordStrength,
  getHashVersion,
};
