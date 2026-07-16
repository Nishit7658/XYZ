// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TuitionManager
 * @dev Handles confidential tuition payments.
 */
contract TuitionManager is Ownable {
    IERC20 public paymentToken;
    
    // The public key of the auditor used to encrypt the payload on the client side
    string public auditorPublicKey;

    // Event emitted when a confidential payment is made
    event ConfidentialPayment(
        address indexed sender,
        uint256 timestamp,
        string encryptedPayload // Contains encrypted student ID, real amount, etc.
    );

    constructor(address _paymentToken, string memory _auditorPublicKey) Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
        auditorPublicKey = _auditorPublicKey;
    }

    function setAuditorPublicKey(string memory _newKey) external onlyOwner {
        auditorPublicKey = _newKey;
    }

    /**
     * @dev Pay tuition with an encrypted payload.
     * The actual amount transferred could be obfuscated by sending to a mixer pool,
     * but for the MVP, we transfer the exact amount and the privacy is proven 
     * by the encrypted payload which the auditor decrypts.
     */
    function payTuition(uint256 amount, string memory encryptedPayload) external {
        require(paymentToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        emit ConfidentialPayment(msg.sender, block.timestamp, encryptedPayload);
    }
    
    // Withdraw collected funds (Admin only)
    function withdrawFunds(uint256 amount) external onlyOwner {
        require(paymentToken.transfer(owner(), amount), "Transfer failed");
    }
}
