const hre = require("hardhat");
const { IMPLEMENTATION_ADDRESS, NFT48_CONTRACT_ADDRESS, FACTORY_ADDRESS } = require("../constants/constants.js");
const fs = require('fs');
const path = require('path');
const abiPath = path.join(__dirname, '../constants/factory.abi');

async function main() {

    const [signer] = await hre.ethers.getSigners();

    console.log("sending TX with:", signer.address);

    // const factoryAddress = FACTORY_ADDRESS; 
    const factoryAddress = "0x42657c3b3da506185db0ee5c0217fb05d4435b2b"; //my registry factory
    const factoryABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

    const contract = new hre.ethers.Contract(factoryAddress, factoryABI, signer);  // use `hre.ethers.Contract`

    console.log(contract)

    const params = {
        implementation: "0x40630A557f1C0B5CecDDc9F223a1dF54d0Cf2666", //my simple implementation
        // implementation: "0x3BFcddE4a7195646017084b31Bfc83eEc848c0Fe", //my second implementation
        // implementation: "0xBe361A1AA641F8cB660974868B6310152066E915", //my third implementatnion (proxy)
        chainId: 80001,
        tokenContract: "0x6ce76566a96a122d702e1f9d306b48faa832df89",
        tokenId: 1,
        salt: 0,
        initData: "0x"
    };

    try {
        //    const tx = await contract.createAccount(params);

        const tx = await contract.createAccount(
            params.implementation,
            params.chainId,
            params.tokenContract,
            params.tokenId,
            params.salt,
            params.initData
        );

        console.log("Transaction hash:", tx.hash);
        const receipt = await tx.wait();  // get the transaction receipt
        console.log("Transaction was mined in block ", receipt.blockNumber);
    } catch (error) {
        console.error("Error occurred: ", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
