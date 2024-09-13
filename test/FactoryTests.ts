import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre, { ethers } from "hardhat";

describe("Multisig", function () {
    async function deployMultisigFactoryFixture() {
        const [owner, otherAccount, otherAcct1, otherAcct2, otherAcct3, otherAcct4, otherAcct5 ] = await hre.ethers.getSigners();
        const signers = [otherAcct1, otherAcct2, otherAcct3, otherAcct4, otherAcct5]
        const quorum = 2

        const MultisigFactory = await hre.ethers.getContractFactory("MultisigFactory");
        const factory = await MultisigFactory.deploy()

        return { factory, signers, owner, otherAccount, otherAcct1, quorum };
    }
    describe("Deployment", function () {
        it("Should revert with right error if quorum is <= 1", async function () {
          const { factory, signers } = await loadFixture(deployMultisigFactoryFixture);
    
          await expect(factory.createMultiSigWallet(1, signers)).to.be.revertedWith("quorum is too small");
        });
        it("Should revert with right error if valid signers is <= 1", async function () {
          const { factory, owner, signers, quorum } = await loadFixture(deployMultisigFactoryFixture);
    
          await expect(factory.createMultiSigWallet(quorum, [owner])).to.be.revertedWith("few valid signers");
        });
        it("Should revert with right error if zero address in valid signers", async function () {
          const { factory, owner, signers, quorum, otherAccount, otherAcct1 } = await loadFixture(deployMultisigFactoryFixture);
    
          await expect(factory.createMultiSigWallet(quorum, [owner, ethers.ZeroAddress, otherAccount, otherAcct1 ])).to.be.revertedWith("zero address not allowed");
        });
        it("Should revert with right error if zero address in valid signers", async function () {
          const { factory, owner, signers, quorum, otherAccount, otherAcct1 } = await loadFixture(deployMultisigFactoryFixture);
    
          await expect(factory.createMultiSigWallet(quorum, [owner, otherAccount, otherAccount, otherAcct1 ])).to.be.revertedWith("signer already exist");
        });
        it("Should revert with right error if zero address in valid signers", async function () {
          const { factory, owner, signers, quorum, otherAccount, otherAcct1 } = await loadFixture(deployMultisigFactoryFixture);
    
          await expect(factory.createMultiSigWallet(5, [owner, otherAccount, otherAcct1 ])).to.be.revertedWith("quorum greater than valid signers");
        });
      });
    describe("Cloning", function () {
        const quorum = 2
        it("Should check that a clone is being created", async function () {
          const { factory, signers } = await loadFixture(deployMultisigFactoryFixture);

          await factory.createMultiSigWallet(quorum, signers);
    
          expect((await factory.getMultiSigClones()).length).to.equal(1);
        });
    });
})