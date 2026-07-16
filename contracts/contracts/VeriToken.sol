// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VeriToken
 * @dev Mock "Encrypted" ERC20 for Hackathon. In a production environment on an FHE subnet,
 * balances and amounts would use encrypted uints (euint). Here, we provide standard
 * ERC20 functionality to represent the base asset, and privacy is handled in the TuitionManager.
 */
contract VeriToken is ERC20, Ownable {
    constructor() ERC20("VeriToken", "VERI") Ownable(msg.sender) {}

    // Allow students to mint test tokens for the MVP
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
