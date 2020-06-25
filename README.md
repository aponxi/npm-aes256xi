# aes256xi

> Lightweight Encryption Wrapper using native crypto library with aes-256-cbc algorithm. Has no dependencies and comes with a cli tool.

## As npm library

```js
npm i aes256xi
#or
yarn add aes256xi

const { encryptStacked, decryptStacked, encrypt, decrypt } = require('aes256xi');

```
## CLI

```bash

npm i -g aes256xi

axi -v
# Outputs version

axi -e "some string 123"
# Outputs something like...
5688095f08ee3ae699c09ef83ed08dca 89a5c112ae1ae599a0afe627a874e5bd

axi -d `axi -e "some string 123"`
# Outputs the plain text
some string 123

#Or

axi -d "5688095f08ee3ae699c09ef83ed08dca 89a5c112ae1ae599a0afe627a874e5bd"
# Also outputs the plain text
some string 123
```

