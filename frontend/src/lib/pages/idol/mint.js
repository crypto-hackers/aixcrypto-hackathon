window.onload = function() {
    if (window.ethereum) {
        try {
            getAccount().then((account) => {
                console.log(account);
            });

            getBlockNumber().then((blockNumber) => {
                console.log(blockNumber);
            });
        } catch (error) {
            console.error("User denied account access");
        }
    }
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const fileInput = document.getElementById('file');
    const handleFileSelect = () => {
        const files = fileInput.files;
        for (let i = 0; i < files.length; i++) {
            console.log(files[i])
        }
    }
    if (fileInput) { // Check if fileInput is not null before attaching event
        fileInput.addEventListener('change', handleFileSelect);
    }
});

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
