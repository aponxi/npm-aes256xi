# aes256xi

> Lightweight Encryption Wrapper using native crypto library with aes-256-cbc algorithm. 
> Has no dependencies and comes with a cli tool in less than 100 lines of code.
> CLI tool, axi, uses ~/.ssh/id_rsa file OR AXI_KEY_PATH environment variable as the key path.

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
# axi uses ~/.ssh/id_rsa OR AXI_KEY_PATH environment variable as the key path.

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

## Revisions

### v1.0.2

- Added help `-h` in cli
- Corrected `-v` in cli

### v1.0.5
- axi uses ~/.ssh/id_rsa OR AXI_KEY_PATH environment variable as the key path.
