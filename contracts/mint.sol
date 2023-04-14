// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract Minting is ERC721Enumerable, Ownable
{
    address payable public ADDRESS_MINT;
    mapping(address => uint256) public MINTED;
    uint256 public MAX_SUPPLY;
    uint256 public TOTAL_SUPPLY;
    uint256 public MAX_MINT;
    uint256 public PRICE;
    bool public SALE_STARTED;
    string internal BASETOKENURI;

    // fees friendly constructor
    constructor() payable ERC721("Minting", "MINT")
    {
        MAX_SUPPLY = 10000;
        TOTAL_SUPPLY = 0;
        MAX_MINT = 10;
        PRICE = 0.01 ether;
        ADDRESS_MINT = payable(address(YOUR_ADRESS));
    }

    // enable mint function
    function enableMint(bool sale_started) external onlyOwner
    {
        SALE_STARTED = sale_started;
    }

    // set base token uri
    function setBaseTokenURI(string calldata baseTokenURI) external onlyOwner
    {
        BASETOKENURI = baseTokenURI;
    }
    function tokenURI(uint256 tokenid) public view override returns (string memory)
    {
        require(_exists(tokenid), "ERROR: wrong token id");
        return string(abi.encodePacked(BASETOKENURI, Strings.toString(tokenid), ".json"));
    }

    // getmoney
    function getmoney() external onlyOwner
    {
        (bool success, ) = ADDRESS_MINT.call{value: address(this).balance}("");
        require(success, "ERROR: transfer failed");
    }

    // mint function
    function mint(uint256 amount) public payable
    {
        require(SALE_STARTED, "ERROR: sale not started");
        require(amount <= MAX_MINT, "ERROR: max mint is 10");
        require(TOTAL_SUPPLY + amount <= MAX_SUPPLY, "ERROR: max supply is 10000");
        require(PRICE * amount == msg.value, "ERROR: wrong amount of ether");
        require(MINTED[msg.sender] + amount <= MAX_MINT, "ERROR: max mint is 10");
        for (uint256 i = 0; i < amount; i++)
        {
            _safeMint(msg.sender, TOTAL_SUPPLY + i);
        }
        MINTED[msg.sender] += amount;
        TOTAL_SUPPLY += amount;
    }

}