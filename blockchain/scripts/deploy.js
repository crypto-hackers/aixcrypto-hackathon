//npx solcjs contracts/sbt.sol --abi --include-path ../node_modules/ --base-path ../node_modules/
//npx hardhat compile
//npx hardhat run scripts/deploy.js
//npx hardhat verify --network mumbai <address> <constructor>
//npx hardhat clean

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
//  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Contract = await ethers.getContractFactory("NFT48");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();
  console.log(contract);
  console.log('contract deployed to:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
 