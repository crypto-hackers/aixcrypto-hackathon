/* mint nft */
document.getElementById('email-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const mintName = document.getElementById('mint-name').value;
    const mintProfile = document.getElementById('mint-profile').value;
    const mintPrompt = document.getElementById('mint-prompt').value;
    const mintImage = document.getElementById('mint-profile-img').src;

    const nftMetadata = {
        "name": mintName,
        "profile": mintProfile,
        "prompt": mintPrompt,
        "image": mintImage,
    }

    uploadJson(nftMetadata).then((url) => {
        mint(url).then((tx) => {
            console.log(tx);
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
});

/* firebase config */
const firebaseConfig = {
    apiKey: "AIzaSyBYXbg_87JPWeN19EUNFAi9ZrbLs3xZ7MM",
    authDomain: "ai-idol-election.firebaseapp.com",
    projectId: "ai-idol-election",
    storageBucket: "ai-idol-election.appspot.com",
    messagingSenderId: "383067549965",
    appId: "1:383067549965:web:3c814c3fea7ae5ad664044",
    measurementId: "G-NZDBNLYHCF"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();

async function uploadJson(nftMetadata) {
    const jsonBlob = new Blob([JSON.stringify(nftMetadata)], {type: "application/json"});
    const uploadTask = storageRef.child(`metadata/${nftMetadata.name}.json`).put(jsonBlob);
    const url = await uploadTask.snapshot.ref.getDownloadURL();
    console.log(url);
    return url;
}

/* upload image */
document.getElementById('mint-img-btn').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});
document.getElementById('fileInput').addEventListener('change', function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        // Create a canvas and draw the image onto it
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        var img = document.getElementById('displayImg');
        img.src = reader.result;

        img.onload = function () {
            // Calculate the position and size for the square crop
            var size = Math.min(img.naturalWidth, img.naturalHeight);
            var left = (img.naturalWidth - size) / 2;
            var top = (img.naturalHeight - size) / 2;

            // Draw the cropped image onto the canvas
            context.drawImage(img, left, top, size, size, 0, 0, canvas.width, canvas.height);

            // Create a new canvas for the resized image
            var resizeCanvas = document.createElement('canvas');
            var resizeContext = resizeCanvas.getContext('2d');
            resizeCanvas.width = 350;
            resizeCanvas.height = 350;

            // Draw the cropped image onto the resize canvas
            resizeContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, resizeCanvas.width, resizeCanvas.height);
            var dataUrl = resizeCanvas.toDataURL();

            // Set the cropped image as the src of the mint-img-btn
            document.getElementById('mint-profile-img').src = dataUrl;

            // Convert data URL to Blob
            var byteString = atob(dataUrl.split(',')[1]);
            var mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            var blob = new Blob([ab], { type: mimeString });

            // Upload the cropped image to Firebase
            var uploadTask = storageRef.child('images/' + file.name).put(blob);
            uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function (error) {
                console.log('Upload failed:', error);
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('Upload completed successfully!');
                    console.log('File available at', downloadURL);
                });
            });
        }
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

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

async function mint(tokenURI) {
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
        .mintNFT(account, tokenURI)
        .estimateGas({ from: account });

    const result = await contract
        .methods
        .mintNFT(account, tokenURI)
        .send({ from: account, gas: gasEstimate });

    return result;
}

const nft48Abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_fromTokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_toTokenId",
                "type": "uint256"
            }
        ],
        "name": "BatchMetadataUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "MetadataUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "mintNFT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
