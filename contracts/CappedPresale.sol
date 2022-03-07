//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@ricardianfabric/simpleterms/contracts/SimpleTerms.sol";

struct Buyer {
    uint256 amount;
    address _address;
}

contract CappedPresale is SimpleTerms {
    /**
     * @dev The wallet where the funds are forwarded to
     */
    address payable private _wallet;
    /**
     * @dev The cap is the maximum tokens sold
     */
    uint256 private _cap;
    /**
     * @dev Sold is the tokens sold already
     */
    uint256 private sold;
    /**
     * @dev The name of the currency, ETH or ONE or BNB etc..
     */
    string private _currencyName;
    /**
     * @dev Array of buyers, to fetch and display all the buyers
     */
    Buyer[] private buyers;
    /**
     * @dev Purchases are used for fetching a purchase per address
     */
    mapping(address => uint256) private purchases;

    /**
     * @dev Pass in the cap, which is the maximum WEI collected
     */
    constructor(uint256 cap, string memory currencyName) {
        _wallet = payable(msg.sender);
        _cap = cap;
        _currencyName = currencyName;
    }

    /**
     * @dev Get the Cap
     */
    function getCurrencyName() external view returns (string memory) {
        return _currencyName;
    }

    /**
     * @dev Get the Cap
     */
    function getCap() external view returns (uint256) {
        return _cap;
    }

    /**
     * @dev  Get the buyers Array
     */
    function getBuyers() external view returns (Buyer[] memory) {
        return buyers;
    }

    /**
     * @dev Calculate how much is left for sale
     */
    function getCapLeft() external view returns (uint256) {
        return _cap - sold;
    }

    /**
     * @dev Returns the purchases per address
     */
    function getPurchase(address ofAddress) external view returns (uint256) {
        return purchases[ofAddress];
    }

    /**
     * @dev Call the buy function to make a purchase
     */
    function buy() external payable {
        _buy();
    }

    /**
     * @dev The fallback function calls the _buy function also
     */
    receive() external payable {
        _buy();
    }

    /**
     * @dev The _buy function allows token presale till the max cap is reached.
     */
    function _buy() internal {
        // The maximum tokens for sale must be under the cap
        require(msg.value + sold < _cap, "Max cap reached.");
        sold += msg.value;
        buyers.push(Buyer({amount: msg.value, _address: msg.sender}));
        purchases[msg.sender] = msg.value;
        _forwardFunds();
    }

    /**
     * @dev Forwards funds to the deployer of the contract
     */
    function _forwardFunds() internal {
        _wallet.transfer(msg.value);
    }
}
