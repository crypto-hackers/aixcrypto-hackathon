// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract akushuNFT is ERC1155, Ownable {
    uint256 public constant TOKEN_ID = 1;
    uint256 public MINT_PRICE = 0.001 ether;  // 0.001 Matic

    constructor() ERC1155("ipfs://QmSQ2asp8Y3VwKwSLRZ9Rn7KVJEyLuktFLNwodkte8THn7/1") {}

    function mint(uint256 amount) public payable {
        require(msg.value == MINT_PRICE * amount, "Incorrect Matic value sent");

        _mint(msg.sender, TOKEN_ID, amount, "");
    }

    function updateURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function updateMintPrice(uint256 newPrice) public onlyOwner {
        MINT_PRICE = newPrice;
    }

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public override {
    // If the sender is the contract owner, the recipient must be the burn address.
    if (tx.origin != msg.sender) {
        require(to == address(0), "Contracts wallet can only send to burn address");
    }
    super.safeTransferFrom(from, to, id, amount, data);
}

function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public override {
    // If the sender is the contract owner, the recipient must be the burn address.
    if (tx.origin != msg.sender) {
        require(to == address(0), "Contracts wallet can only send to burn address");
    }
    super.safeBatchTransferFrom(from, to, ids, amounts, data);
}
}
