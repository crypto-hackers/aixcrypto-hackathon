//読み込み
src = "../lib/abi/akushuNft.abi"
src = "../lib/abi/nft48.abi"
src = "../lib/abi/erc6551Account.abi"
src = "../lib/abi/erc6551Registry.abi"

//Chain周りの設定
const nft48AddressMumbai = '0x6CE76566a96a122D702E1f9D306B48FaA832Df89';
const erc6551RegistryAddressMumbai = '0x42657c3b3da506185db0ee5c0217fb05d4435b2b';
const erc6551ImplementationAddressMumbai = '0x40630A557f1C0B5CecDDc9F223a1dF54d0Cf2666';
const akushuNftAddressMumbai = '0x7FBA3DBDd16Bb83130168c47c3190f568a21df5a';
const chainIdMumbai = 80001;

let nft48Address = nft48AddressMumbai;
let erc6551RegistryAddress = erc6551RegistryAddressMumbai;
let erc6551ImplementationAddress = erc6551ImplementationAddressMumbai;
let akushuNftAddress = akushuNftAddressMumbai;
let chainId = chainIdMumbai;

let mintedTokenId = 1;

//ether.js 周りの共通処理
window.onload = function () {
    if (window.ethereum) {
        try {
            return await web3.eth.getBlockNumber();
        }
    }
}

//この辺の処理を入れたらいい！
// <button onclick="createERC6551Account(mintedTokenId)">アカウント作成</button>
//     <button onclick="sendTxToERC6551()">6551へのTXテスト</button>
//     <button onclick="viewERC6551Address(mintedTokenId)">6551アドレスの取得</button>
//     <button onclick="mintAkushuNft(1)">握手NFTのMint</button>
//     <button onclick="sendAkushuNft('0xEE860E9d8eCBFfEa3D27Eb76E5B923C2E9488ACf')">握手NFTの送付</button>


//個別TX NFT48のMint
async function mint() {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const contract = new web3.eth.Contract(
        nft48Abi,
        nft48Address
    );

    // const gasEstimate = await contract
    //         .methods
    //         .mintNFT(account, "http://test.com")
    //         .estimateGas({ from: account });

    const result = await contract
        .methods
        .mintNFT(account, "http://test.com")
        .send({ from: account /*, gas: gasEstimate*/ });

    console.log(result);
    mintedTokenIdInHex = result.logs[0].topics[3];
    console.log(mintedTokenIdInHex)
    mintedTokenId = parseInt(mintedTokenIdInHex, 16)
    console.log(mintedTokenId)
    return mintedTokenId
}

//個別TX NFT48のコントラクトウォレットを作成 (引数；tokenID)
async function createERC6551Account(tokenId) {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
        erc6551RegistryAbi,
        erc6551RegistryAddress
    );

    const result = await contract
        .methods
        .createAccount(
            erc6551ImplementationAddress,
            chainId, //chain ID; 81 = Shibuya; 80001 = MUMBAI
            nft48Address,
            tokenId, //tokenId; variable
            1, //salt; can be anything
            '0x' //initData; null
        )
        .send({ from: account });

    console.log(result);
}

//個別TX akushuNFTのMint
async function mintAkushuNft(mintAmount) {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
        akushuNftAbi,
        akushuNftAddress
    );

    const result = await contract
        .methods
        .mint(mintAmount)
        .send({ from: account });

    console.log(result);
    return (result);
}

//個別TX akushuNFTの送付
async function sendAkushuNft(destinationAddress) {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
        akushuNftAbi,
        akushuNftAddress
    );

    const result = await contract
        .methods
        .safeTransferFrom(
            account,
            destinationAddress,
            1,
            1,
            "0x"
        )
        .send({ from: account });

    console.log(result);
    return (result);
}

//個別メソッド NFT48のコントラクトウォレットのアドレス取得 (引数；tokenID)
async function viewERC6551Address(tokenId) {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
        erc6551RegistryAbi,
        erc6551RegistryAddress
    );

    const result = await contract
        .methods
        .account(
            erc6551ImplementationAddress,
            chainId,
            nft48Address,
            tokenId, //tokenId; variable
            1, //salt; can be anything
        )
        .call({ from: account });

    console.log(result);
    return (result);
}

//個別TX NFT48のコントラクトウォレットへのTX
async function sendTxToERC6551(erc6551WalletAddress, to, value, data) {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
        erc6551AccountAbi,
        erc6551WalletAddress
    );

    const result = await contract
        .methods
        .executeCall(
            to, //address to send the TX to
            value, //value of native token to send
            data //data in hex - can be 0x for simple TX
        )
        .send({ from: account });

    console.log(result);
}