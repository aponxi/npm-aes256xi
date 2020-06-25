const homedir = require('os').homedir();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const privateKeyPath = path.join(homedir, '.ssh', 'id_rsa');

if (!fs.existsSync(privateKeyPath)) {
    throw new Error('Private key does not exist: ' + privateKeyPath);
}

let privateKey = fs.readFileSync(privateKeyPath).toString('utf-8').split("\n");
privateKey.shift();
privateKey.pop();
privateKey.pop();
privateKey = privateKey.join('');


let key = crypto.createHash('md5').update(privateKey, 'utf8').digest('hex').toUpperCase();

console.log(process.argv);

const encrypt = function (text) {
    const iv = crypto.randomBytes(16);
    let cip = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let en = cip.update(text);
    return {iv: iv.toString('hex'), encryptedData: Buffer.concat([en, cip.final()]).toString('hex')};
};
const decrypt = function (text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

const decryptStacked = function (stackedText) {
    let [iv, encryptedData] = stackedText.split(' ');
    return decrypt({iv, encryptedData});
};
const encryptStacked = function (text) {
    let {iv, encryptedData} = encrypt(text);
    return `${iv} ${encryptedData}`;
};

module.exports = {encrypt, decrypt, decryptStacked, encryptStacked};

if (process.argv.length === 4 || process.argv.length === 5 || process.argv.length === 3) {
    let args = [...process.argv];
    args.shift();
    args.shift();
    let cmd = args.shift();
    if (cmd === '-e') {
        let [txt] = args;
        let {iv, encryptedData} = encrypt(txt);
        console.log(iv, encryptedData);
        process.exit(0);
    }
    if (cmd === '-d' && process.argv.length === 5) {
        let [iv, encryptedData] = args;
        let decryptedData = decrypt({iv, encryptedData});
        console.log(decryptedData);
        process.exit(0);
    }
    if (cmd === '-v' && process.argv.length === 3) {
        const pkg = require(path.join(__dirname, '/package.json'));
        console.log(pkg.name, '(axi) CLI', 'v' + pkg.version);
        process.exit(0);
    }
    if (cmd === '-h' && process.argv.length === 3) {
        console.log('axi uses ~/.ssh/id_rsa as a key.');
        console.log('version: axi -v');
        console.log('help   : axi -h');
        console.log('encrypt: axi -e "text to encrypt"');
        console.log('decrypt: axi -d "5688095f08ee3ae699c09ef83ed08dca 89a5c112ae1ae599a0afe627a874e5bd"');
        process.exit(0);
    }
}