require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env" });
const { MUMBAI_ALCHEMY_KEY, POLYGON_ALCHEMY_KEY, MUMBAI_RPC, POLYGON_RPC, PRIVATE_KEY, POLYGONSCAN_KEY, MUMBAI_ENV, ASTAR_URL, ASTAR_ALCHEMY_KEY, ASTAR_RPC, GNOSISSCAN_KEY } = process.env;

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
    },
    shibuya: {
      url: `https://evm.shibuya.astar.network`,
      accounts: [PRIVATE_KEY]
    },
    astar: {
      // url: `${ASTAR_RPC}${ASTAR_ALCHEMY_KEY}`,
      // url: "https://astar.public.blastapi.io",
      // url: "https://astar-rpc.dwellir.com",
      // url: "https://astar.api.onfinality.io/public",
      url: "https://evm.astar.network",
      // url: "https://astar.api.onfinality.io/public",
      // url: "https://rpc.astar.network:8545",
      chainId: 592,
      acounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      shibuya: GNOSISSCAN_KEY,
      polygon: POLYGONSCAN_KEY,
      mumbai: POLYGONSCAN_KEY
    },
    customChains: [
      {
        network: "shibuya",
        chainId: 81,
        urls: {
          apiURL: "https://blockscout.com/shibuya/api",
          browserURL: "https://blockscout.com/shibuya"
        }
      }
    ]
  }
};