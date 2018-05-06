# Cryptopia: The extensible crypto node library

## Installation

Install the package using `npm`:

```bash
$ npm install git@github.com:fr33d4n/cryptopia.git#v0.0.1"
```

<br/>


## Usage
Start by `require`-ing the module:

```js
const Cryptopia = require('cryptopia');
```

It returns an `Object` with 2 methods, `encrypt` and
`decrypt`:

```js
await Cryptopia.encrypt('Caesar',  'CAESAR CIPHER', 13);
// 'PNRFNE PVCURE'

await Cryptopia.decrypt('Caesar', 'PNRFNE PVCURE', 13);
// 'CAESAR CIPHER'
```

Note that encrypt/decrypt methods are async, as some encryption algorithms require
additional data structure initializations.


## Development: Adding a new encryption mechanism
To add a new encryption mechanism you create a new class that inherits from
the base Cryptopia class and implement 3 async methods:

### init:
Init method handles the mechanism initialization if any. If, for instance,
I want to read a file from the file system because I wanna get my secret
from there, I would do:

```javascript
const fs = require('fs');
const readdir = promisify(fs.readdir);

async init() {
  let secrets;
  try {
    {err, secrets} = await readdir('path/to/dir');
    if (err) {
      throw err;
    }
  } catch(e) {
    throw e;
  }

  this.secret = secrets[0];
}
```

### encrypt:
Encrypt method handles the encryption of an input string. By convention, the first
parameter is the encryption mechanism and the second is the string you wanna encrypt. 
Continuing with the previous example, where we got a secret from a file. 
We want to create an encryption method that uses `aes192` as the base method and 
merges the userId input param with the secret that we got in the initialization 
step to obtain the `aes192` password:

```javascript
const crypto = require('crypto');
async encrypt(inputToEncript, userId) {
  let pass = `${userId}${this.secret};
  const cipher = crypto.createCipher('aes192', pass);

  let encrypted = cipher.update(inputToEncript, 'utf8', 'utf8');
  encrypted += cipher.final('utf-8');
  return encrypted;
}
```

### decrypt:
Decrypt method handles the decryption of an encrypted input string. By convention, the first
parameter is the encryption mechanism and the second is the string you wanna decrypt. 
Continuing with the previous example, where we encrypted a string. We will implement
a method that does the reverse action:

```javascript
const crypto = require('crypto');
async decrypt(encryptedString, userId) {
  let pass = `${userId}${this.secret};
  const cipher = crypto.createCipher('aes192', pass);

  let decrypted = decipher.update(encryptedString, 'utf8', 'utf8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}
```

### Testing: 
New developments require at least a 90% of unit test coverage






