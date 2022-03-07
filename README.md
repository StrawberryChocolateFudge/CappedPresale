# Capped Presale

This contract allows users to purchase tokens before they are issued. The Contract sells a fixed amount of tokens before it expires and forwards the funds to the seller.

The addresses that made the purchase can be fetched using a function so an Airdrop contract can be built with it later on!

## Constructor

    constructor(uint256 cap);

Pass in the total amount of wei collected by this contract

## View functions

    function getBuyers() external view returns (Buyer[] memory);

Fetch all the buyers.

    struct Buyer {
        uint256 amount;
        address _address;
    }

The buyer objects contain the amount of WEI spent and the address of the buyer.

    function getCap() external view returns (uint256)

Get the total amount that will be raised

    function getCapLeft() external view returns (uint256);

Use this function to calculate the amount of WEI left from the cap.

    function getPurchase(address ofAddress) external view returns (uint256)

The the purchases on an address. This function can be called by the external airdrop function later to actually distribute the tokens.

    function getCurrencyName() external view returns (string memory)

Get the name of the currency used by the blockchain.

## State change

    function buy() external payable;

The buy function is called when making a purchase. only the max cap can be sold.

## Run locally

    npx hardhat node

## FRONT END

WIP!!
