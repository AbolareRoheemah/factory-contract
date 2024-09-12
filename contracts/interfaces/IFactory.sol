// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "../../contracts/Multisig.sol";
interface IMultisigFactory {
    function createMultisigWallet(uint256 _quorum, address[] memory _validSigners) external returns (Multisig, uint256);

    function getMultiSigClones() external view returns(Multisig[] memory);

    function multisigClones() external view returns(Multisig[] memory);
}