import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Prontera } from '../../typechain-types';
import { ethers } from 'hardhat';
import '@nomicfoundation/hardhat-chai-matchers';
import { expect } from 'chai';
import { CryptoECIES, generateSecret } from '../../libs/crypto';

describe('Prontera', async () => {
  let contract: Prontera;

  // signers
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  // deploy the contract once
  before(async () => {
    const factory = await ethers.getContractFactory('Prontera');
    [owner, alice, bob] = await ethers.getSigners();
    // @ts-ignore
    contract = await factory.deploy();
    await contract.deployed();
  });

  describe('initializations', async () => {
    it('should initialize alice', async () => {
      expect(await contract.isUserInitialized(alice.address)).to.eq(false);

      const aliceSecret = generateSecret();
      const alicePubkey = Buffer.from(new CryptoECIES(aliceSecret).getPublicKey(), 'hex');

      await expect(
        contract.connect(alice).initializeUser(
          aliceSecret.toJSON().data, // this is supposed to be encrypted by MetaMask, but we don't do it in the test
          alicePubkey[0] == 2, // prefix
          alicePubkey.slice(1).toJSON().data, // 32 bytes
        ),
      )
        .to.emit(contract, 'UserInitialized')
        .withArgs(alice.address, [
          toHexString(aliceSecret.toJSON().data),
          alicePubkey[0] == 2,
          toHexString(alicePubkey.slice(1).toJSON().data),
        ]);
    });

    it('should initialize bob', async () => {
      expect(await contract.isUserInitialized(bob.address)).to.eq(false);

      // bob generates a secret
      const bobSecret = generateSecret();
      const bobPubkey = Buffer.from(new CryptoECIES(bobSecret).getPublicKey(), 'hex');
      await expect(
        contract.connect(bob).initializeUser(
          bobSecret.toJSON().data, // this is supposed to be encrypted by MetaMask, but we don't do it in the test
          bobPubkey[0] == 2, // prefix
          bobPubkey.slice(1).toJSON().data, // 32 bytes
        ),
      )
        .to.emit(contract, 'UserInitialized')
        .withArgs(bob.address, [
          toHexString(bobSecret.toJSON().data),
          bobPubkey[0] == 2,
          toHexString(bobPubkey.slice(1).toJSON().data),
        ]);

      expect(await contract.isUserInitialized(alice.address)).to.be.true;
      expect(await contract.isUserInitialized(bob.address)).to.be.true;
    });

    it('should initialize chat between alice and bob', async () => {
      // chat should be uninitialized at first
      expect(await contract.isChatInitialized(alice.address, bob.address)).to.eq(false);

      // she creates a random key to chat with bob
      const chatSecret = generateSecret();

      // alice get bob's public key and encrypts the secret
      const bobInit = await contract.connect(alice).userInitializations(bob.address);
      const [_, bobPubkeyPrefix, bobPubkeyX] = [
        bobInit[0].slice(2), // omit 0x
        bobInit[1] ? '02' : '03', // boolean to prefix
        bobInit[2].slice(2), // omit 0x
      ];
      const bobPubkey = Buffer.from(bobPubkeyPrefix + bobPubkeyX, 'hex');
      const chatSecretEncryptedForBob = CryptoECIES.encrypt(bobPubkey.toString('hex'), chatSecret);

      // she also does the same for herself
      const aliceInit = await contract.connect(alice).userInitializations(alice.address);
      const [__, alicePubkeyPrefix, alicePubkeyX] = [
        aliceInit[0].slice(2), // omit 0x
        aliceInit[1] ? '02' : '03', // boolean to prefix
        aliceInit[2].slice(2), // omit 0x
      ];

      const alicePubkey = Buffer.from(alicePubkeyPrefix + alicePubkeyX, 'hex');
      const chatSecretEncryptedForAlice = CryptoECIES.encrypt(alicePubkey.toString('hex'), chatSecret);

      // alice initializes the chat with bob
      await expect(
        contract.connect(alice).initializeChat(chatSecretEncryptedForAlice, chatSecretEncryptedForBob, bob.address),
      )
        .to.emit(contract, 'ChatInitialized')
        .withArgs(alice.address, bob.address, chatSecretEncryptedForAlice, chatSecretEncryptedForBob);

      expect(await contract.isChatInitialized(alice.address, bob.address)).to.eq(true);
    });
  });
});

function toHexString(byteArray: any) {
  let s = '0x';
  byteArray.forEach(function (byte: any) {
    s += ('0' + (byte & 0xff).toString(16)).slice(-2);
  });
  return s;
}
