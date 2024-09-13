// 0x5FbDB2315678afecb367f032d93F642f64180aa3 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
import { ethers } from "hardhat";

async function main() {
    const [owner, otherAccount, otherAcct1, otherAcct2, otherAcct3, otherAcct4, otherAcct5 ] = await ethers.getSigners();

    const factoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const multisigFactory = await ethers.getContractAt("MultiSigFactory", factoryAddress);
    const signers = [otherAcct1.address, otherAcct2.address, otherAcct3.address, otherAcct4.address, otherAcct5.address]
    const quorum = 3

    const createCloneTx = await multisigFactory.createMultiSigWallet(quorum, signers)
    await createCloneTx.wait()
    console.log(createCloneTx)

    const tokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    const mytoken = await ethers.getContractAt("Reemarh", tokenAddress);

    const multiSigClones = await multisigFactory.getMultiSigClones();
    console.log("Created MultiSig wallets:", multiSigClones);
    const singleClone = multiSigClones[0];
    console.log("clonesArrayAfter",  singleClone);

    const multisigContract = await ethers.getContractAt("MultiSig", singleClone, owner);
    
    const multiSigQuorum = await multisigContract.quorum();
    console.log( {multiSigQuorum})
    
    const multiSigValidSigners = await multisigContract.noOfValidSigners();
    console.log( {multiSigValidSigners})

    // send tokens to multisig contract to be able to call transfer
    const trfAmount = ethers.parseUnits("1000", 18);
    const trsfTx = await mytoken.transfer(singleClone, trfAmount);
    await trsfTx.wait()
    console.log(`Transferred 1000 tokens to MultiSig contract. Balance of contract: ${await mytoken.balanceOf(singleClone)}`);

    // initiate a transfer
    const trsfAmount =  ethers.parseUnits("10", 18);
    const transferCall = await multisigContract.connect(otherAcct1).transfer(trsfAmount, otherAccount, mytoken)
    console.log("transferCall", transferCall)
    await transferCall.wait()

    const multiTxCount = await multisigContract.txCount();
    console.log({multiTxCount})

    const approveCall = await multisigContract.connect(otherAcct3).approveTx(1)
    console.log("approveCall", approveCall)
    await approveCall.wait()

    // clonesArrayAfter
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});