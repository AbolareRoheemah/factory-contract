import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre, { ethers } from "hardhat";

async function deployMultisigFixture() {
    const [owner, otherAccount, otherAcct1, otherAcct2, otherAcct3, otherAcct4, otherAcct5 ] = await hre.ethers.getSigners();
    const signers = [otherAcct1, otherAcct2, otherAcct3, otherAcct4, otherAcct5]
    const quorum = 2

    const MultisigFactory = await hre.ethers.getContractFactory("createMultisigWallet");
    const factory = await MultisigFactory.deploy()

    return { factory, signers, owner, otherAccount, otherAcct1 };
}