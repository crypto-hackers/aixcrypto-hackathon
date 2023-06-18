const hre = require("hardhat");
const { IMPLEMENTATION_ADDRESS, NFT48_CONTRACT_ADDRESS, FACTORY_ADDRESS } = require("../constants/constants.js");
const fs = require('fs');
const path = require('path');
const abiPath = path.join(__dirname, '../constants/ERC6551Account.abi');

async function main() {

    const [signer] = await hre.ethers.getSigners();

    console.log("sending TX with:", signer.address);

    const factoryAddress = "0xF46ea3f1e46F3bE53F1dE2e0eDEA87ebE1903144"; //created TBA 
    const factoryABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

    const contract = new hre.ethers.Contract(factoryAddress, factoryABI, signer); 

    console.log(contract)

    const params = {
        to: "0xEE860E9d8eCBFfEa3D27Eb76E5B923C2E9488ACf",
        value: 1000,
        data: "0x"
    };

    try {
        const tx = await contract.executeCall(
            params.to,
            params.value,
            params.data,
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
