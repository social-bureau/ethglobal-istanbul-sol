import { users } from "./data/users.const";
import { CryptoECIES } from "../libs/crypto";
import { Prontera } from "../typechain-types";
//import { Prontera } from '../types/ethers-contracts/Prontera';
const { deployments, ethers } = require('hardhat');

async function main() {
  const DeployedProntera = await deployments.get('Prontera');
  const _Prontera = await ethers.getContractFactory('Prontera');
  const prontera: Prontera = _Prontera.attach(DeployedProntera.address);
  const [deployer, alice, bob, chris, david] = await ethers.getSigners();

  console.log(`Prontera address : ${DeployedProntera.address}`);
  console.log(`= alice address : ${alice.address}`);
  console.log(`= bob address : ${bob.address}`);
  console.log(`= chris address : ${chris.address}`);
  console.log(`= david address : ${david.address}`);

  const _users = users;
  _users[0].signer = alice;
  _users[1].signer = bob;
  _users[2].signer = chris;
  _users[3].signer = david;

  // check and init user
  for (const user of _users) {
    console.log(`== checking ${user.name} is already init user or not`);
    if (!(await prontera.isUserInitialized(user.address))) {
      console.log(`=== ${user.name} is not initial user, do init`);
      const isPrefix = user.userPublicKey[0] == 2 || user.userPublicKey[0] == 3;
      let publicKey = user.userPublicKey.slice(1);
      if (isPrefix) {
        publicKey = user.userPublicKey.slice(1);
      }
      await prontera.connect(user?.signer ? user.signer : alice).initializeUser(
        user.userSecretKey, // this is supposed to be encrypted by MetaMask, but we don't do it in the test
        isPrefix, // prefix
        publicKey,
      );
    } else {
      console.log(`=== already init, skipping`);
    }
  }

  await initChat(_users[0], _users[1], prontera);
  await initChat(_users[2], _users[3], prontera);
}

async function initChat(userA: any, userB: any, prontera: Prontera) {
  console.log(`==== check if chat for ${userA.name} <=> ${userB.name} is initialized or not`);
  if (!(await prontera.isChatInitialized(userA.address, userB.address))) {
    const chatSecret = Buffer.from(userA.chatSecret);
    const userAInit = await prontera.userInitializations(userA.address);
    const userAPublicKey = await getPublicKey(
      userAInit.encryptedUserSecret,
      userAInit.publicKeyPrefix,
      userAInit.publicKeyX,
    );
    const chatSecretEncryptedForUserA = CryptoECIES.encrypt(userAPublicKey.toString('hex'), chatSecret);
    console.log(`===== got chat secret for A`);

    const userBInit = await prontera.userInitializations(userB.address);
    const userBPublicKey = await getPublicKey(
      userBInit.encryptedUserSecret,
      userBInit.publicKeyPrefix,
      userBInit.publicKeyX,
    );
    const chatSecretEncryptedForUserB = CryptoECIES.encrypt(userBPublicKey.toString('hex'), chatSecret);
    console.log(`===== got chat secret for B`);

    await prontera
      .connect(userA.signer)
      .initializeChat(chatSecretEncryptedForUserA, chatSecretEncryptedForUserB, userB.address);

    if (await prontera.isChatInitialized(userA.address, userB.address)) {
      console.log(`==== Success init chat`);
    } else {
      console.log(`==== Failed init chat`);
    }
  } else {
    console.log(`==== already initialized`);
  }
}

function getPublicKey(encryptedUserSecret: any, isPrefix: boolean, publicKeyHex: any) {
  const [_, publicKeyPrefix, publicKeyX] = [
    encryptedUserSecret.slice(2), // omit 0x
    isPrefix ? '02' : '03', // boolean to prefix
    publicKeyHex.slice(2), // omit 0x
  ];

  const publicKey = Buffer.from(publicKeyPrefix + publicKeyX, 'hex');
  return publicKey;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
