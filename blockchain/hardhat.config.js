require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env" });
const{MUMBAI_ALCHEMY_KEY, POLYGON_ALCHEMY_KEY,MUMBAI_RPC,POLYGON_RPC,PRIVATE_KEY,POLYGONSCAN_KEY,MUMBAI_ENV} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {

    },
    mumbai: {
      url: `${MUMBAI_RPC}${MUMBAI_ALCHEMY_KEY}`,
      //url: `${MUMBAI_ENV}`,
      accounts: [PRIVATE_KEY]
    },
    polygon: {
      url: `${POLYGON_RPC}${POLYGON_ALCHEMY_KEY}`,

      accounts: [PRIVATE_KEY]
    }
  },
  etherscan:{
    apiKey : POLYGONSCAN_KEY
  }
};