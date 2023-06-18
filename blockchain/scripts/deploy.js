//npx solcjs contracts/sbt.sol --abi --include-path ../node_modules/ --base-path ../node_modules/
//npx hardhat compile
//npx hardhat run scripts/deploy.js
//npx hardhat verify --network mumbai <address> <constructor>
//npx hardhat clean

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  //console.log("Account balance:", (await deployer.getBalance()).toString());

  // //Deploying simple implementation (SimpleERC6551Account)
  // const Contract = await ethers.getContractFactory("SimpleERC6551Account"); 
  // const contract = await Contract.deploy(); 

  // //Deploying ERC6551 Registry (copy the one that is pre-deployed in polygon )
  // const Contract = await ethers.getContractFactory("ERC6551Registry");
  // const contract = await Contract.deploy();

  // //Deploying Ido NFT
  // const Contract = await ethers.getContractFactory("NFT48");
  // const contract = await Contract.deploy();

  //Deploying Akushuken NFT
  const Contract = await ethers.getContractFactory("akushuNFT");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();
  console.log(contract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
