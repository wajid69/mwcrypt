

# mwcrypt

mwcrypt is a modern, ultra-secure, and developer-friendly password hashing library for Node.js.
---

## Why mwcrypt?

- **Security First:** Uses PBKDF2 with SHA-512, customizable rounds, and strong random salts.
- **Sync & Async:** All operations are available in both synchronous and asynchronous forms.
- **No Dependencies:** Relies only on Node.js built-in crypto module.
- **Feature Rich:** Includes password strength checking, timing-safe comparisons, hash versioning, and more.
- **Easy to Use:** Simple API, clear error messages, and ready for production.

---

## Features

- Powerful password hashing and verification
- Custom salt generation (sync/async)
- Custom rounds (work factor)
- Sync and async API for all operations
- Timing-safe password comparison
- Password strength checker
- Hash version extraction
- Extract rounds from hash
- No external dependencies
- Fast, secure, and easy to use

---

## Installation

Install locally:

```bash
npm install ./mwcrypt
```

Or from npm:

```bash
npm install mwcrypt
```

---

## Getting Started

### Importing

```js
const mwcrypt = require('./mwcrypt'); // Local
// OR
// const mwcrypt = require('mwcrypt'); // From npm
```

### Generate a Salt

**Sync:**
```js
const salt = mwcrypt.genSaltSync(12); // 12 rounds
console.log('Salt:', salt);
```

**Async:**
```js
mwcrypt.genSalt(12, (err, salt) => {
	if (err) throw err;
	console.log('Salt:', salt);
});
```

### Hash a Password

**Sync:**
```js
const password = 'MySuperSecret!123';
const salt = mwcrypt.genSaltSync();
const hash = mwcrypt.hashSync(password, salt);
console.log('Hash:', hash);
```

**Async:**
```js
mwcrypt.genSalt(10, (err, salt) => {
	mwcrypt.hash('MySuperSecret!123', salt, (err, hash) => {
		if (err) throw err;
		console.log('Hash:', hash);
	});
});
```

### Compare Passwords

**Sync:**
```js
const isMatch = mwcrypt.compareSync('MySuperSecret!123', hash);
console.log('Password match:', isMatch); // true
```

**Async:**
```js
mwcrypt.compare('MySuperSecret!123', hash, (err, matched) => {
	if (err) throw err;
	console.log('Password match:', matched); // true or false
});
```

### Check Password Strength

```js
const strong = mwcrypt.checkPasswordStrength('MySuperSecret!123');
console.log('Is strong password?', strong); // true or false
```

### Timing-Safe Comparison

```js
const safe = mwcrypt.timingSafeEqual(hash, hash2);
console.log('Timing safe equal:', safe);
```

### Get Rounds from Hash

```js
const rounds = mwcrypt.getRounds(hash);
console.log('Rounds used:', rounds);
```

### Get Hash Version

```js
const version = mwcrypt.getHashVersion(hash);
console.log('Hash version:', version); // e.g. '2b'
```

---

## API Reference

### genSaltSync(rounds)
Generates a salt synchronously. `rounds` is the work factor (default: 10).

### genSalt(rounds, cb)
Generates a salt asynchronously. Callback receives `(err, salt)`.

### hashSync(password, salt)
Hashes a password synchronously with the given salt.

### hash(password, salt, cb)
Hashes a password asynchronously. Callback receives `(err, hash)`.

### compareSync(password, hash)
Compares a password to a hash synchronously. Returns `true` or `false`.

### compare(password, hash, cb)
Compares a password to a hash asynchronously. Callback receives `(err, matched)`.

### getRounds(hash)
Extracts the number of rounds used from a hash.

### timingSafeEqual(a, b)
Performs a timing-safe comparison between two strings or buffers.

### checkPasswordStrength(password)
Checks if a password is strong (min 8 chars, upper, lower, number, special).

### getHashVersion(hash)
Returns the hash version (e.g. '2b') from a hash string.

---

## Best Practices

- Always use a strong password (at least 8 characters, mix of upper/lowercase, numbers, and symbols).
- Use a high number of rounds for better security (e.g., 12 or more for production).
- Store only the final hash string in your database.
- Never log or expose raw passwords or salts.
- Use timing-safe comparison for authentication checks.

---

## Project Structure

- `mwcrypt.js`: Main entry point (exports everything from `src/index.js`)
- `src/index.js`: All core logic and features
- `README.md`: Full documentation
- `package.json`: Project metadata and scripts

---

## License

MIT — Free for personal and commercial use.

---

## Author & Credits

Developed by **Muhammad Wajid Ashraf** — Software Engineer

- GitHub: [github.com/wajid69](https://github.com/wajid69)
- Founder of **HatBrain**

Made with ❤️ by Muhammad Wajid Ashraf
