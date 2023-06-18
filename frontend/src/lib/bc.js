async function getAccount() {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
}

async function getBlockNumber() {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const web3 = new Web3(window.ethereum);
    return await web3.eth.getBlockNumber();
}

async function mint() {
    if (!window.ethereum) throw new Error('No Ethereum browser detected.');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
        nft48Abi,
        '0x6CE76566a96a122D702E1f9D306B48FaA832Df89'
    );

    const gasEstimate = await contract
        .methods
        .mintNFT(account, "http://test.com")
        .estimateGas({ from: account });

    const result = await contract
        .methods
        .mintNFT(account, "http://test.com")
        .send({ from: account, gas: gasEstimate });

    console.log(result);
}
