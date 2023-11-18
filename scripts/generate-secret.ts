import { CryptoECIES, generateSecret } from '../libs/crypto';
import { randomBytes } from 'crypto';

const { deployments, ethers } = require('hardhat');

async function main() {
  const secret = generateSecret();
  const publicKey = Buffer.from(new CryptoECIES(secret).getPublicKey(), 'hex');
  const secretJson = secret.toJSON().data;
  console.log(`secret : ${secret}`);
  console.log(`secret json : ${secretJson}`);
  console.log(`public key : ${publicKey}`);
  console.log(`public json : ${publicKey.toJSON().data}`);

  const message = randomBytes(32);
  console.log(`message : ${message}`);
  console.log(`message json : ${message.toJSON().data}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
