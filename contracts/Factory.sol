// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Multisig.sol";

contract MultisigFactory {

    Multisig[] multisigClones;

    function createMultisigWallet(uint256 _quorum, address[] memory _validSigners) external returns (Multisig newMulsig_, uint256 length_) {
        require(_validSigners.length > 1, "few valid signers");
        require(_quorum > 1, "quorum is too small");
        
        newMulsig_ = new Multisig(_quorum, _validSigners);

        multisigClones.push(newMulsig_);

        length_ = multisigClones.length;
    }

    function getMultiSigClones() external view returns(Multisig[] memory) {
        return multisigClones;
    }
}