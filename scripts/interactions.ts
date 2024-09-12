import { ethers } from "hardhat";

async function main() {
    const [owner, otherAccount, otherAcct1, otherAcct2, otherAcct3, otherAcct4, otherAcct5 ] = await ethers.getSigners();
    const signers = [otherAcct1, otherAcct2, otherAcct3, otherAcct4, otherAcct5]
    const quorum = 2

    const factoryAddress = "0xbce6dE8C0C9aA503bc529Bc4e8A84D03499a5729";
    const factory = await ethers.getContractAt("IMultisigFactory", factoryAddress);

    // call the function that creates the clone
    const createCloneTx = await factory.createMultisigWallet(quorum, signers);

    console.log("createClone function call", createCloneTx.hash)

    await createCloneTx.wait();

    // const contractAddress = await factory.getMultiSigClones;
    const contractAddress = await factory.multisigClones();

    const addylength = contractAddress[0]
    // contractAddress.wait()
    // console.log("Multisig clone addresses:");
    // contractAddress.forEach((address, index) => {
    // console.log(`Clone ${index + 1}: ${address}`);
    // });

    console.log("Contract address :::", addylength);

    // contractAddress.wait();

    // // Approve savings contract to spend token
    // const approvalAmount = ethers.parseUnits("1000", 18);

    // const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
    // approveTx.wait();

    // const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
    // console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    // const depositAmount = ethers.parseUnits("150", 18);
    // const depositTx = await saveERC20.deposit(depositAmount);

    // console.log(depositTx);

    // depositTx.wait();

    // const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

    // console.log("Contract balance after :::", contractBalanceAfterDeposit);



    // // Withdrawal Interaction
    // const withdrawAmount = ethers.parseUnits("50", 18);
    // const withdrawTx = await saveERC20.withdraw(withdrawAmount);

    // console.log(withdrawTx);

    // withdrawTx.wait();

    // const contractBalanceAfterWithdrawal = await saveERC20.getContractBalance();

    // console.log("Contract balance after withdrawal", contractBalanceAfterWithdrawal);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
