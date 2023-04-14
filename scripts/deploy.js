const hre = require("hardhat");

async function main() {
  const Minting = await hre.ethers.getContractFactory("Minting");
  const nft = await Minting.deploy();

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
