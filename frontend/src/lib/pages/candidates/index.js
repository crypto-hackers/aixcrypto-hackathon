const gridElement = document.querySelector('.grid');
gridElement.addEventListener('click', function (event) {
    const parentDiv = event.target.parentElement;

    // TODO: change selector name
    let name = event.target.querySelector('.grid---item-text');
    if (!name) {
        name = parentDiv.querySelector('.grid---item-text');
    }

    let profile = event.target.querySelector('.grid---item-text-copy');
    if (!profile) {
        profile = parentDiv.querySelector('.grid---item-text-copy');
    }

    let prompt = event.target.querySelector('.grid---item-text-copy-copy');
    if (!prompt) {
        prompt = parentDiv.querySelector('.grid---item-text-copy-copy');
    }

    let image;
    if (event.target.querySelector('.grid---image')) {
        image = event.target.querySelector('.grid---image').src;
    }
    if (!image && parentDiv.querySelector('.grid---image')) {
        image = parentDiv.querySelector('.grid---image').src;
    }

    const idol = {
        name: name.textContent,
        profile: profile.textContent,
        prompt: prompt.textContent,
        image: image,
        tokenId: "",
    }
    console.log(idol)

    localStorage.setItem('idol', JSON.stringify(idol));

    window.location.href = '/idol';
});

// 要素を作成する関数
function createItem(name, imgSrc) {
    let item = document.createElement('div');

    item.setAttribute('data-w-id', '0e44398a-7d63-9660-a530-037d956360c0');
    item.className = 'grid---item';
    item.innerHTML = `
        <div class="grid---item-text-copy">♡ 100</div>
        <img src="${imgSrc}" loading="eager" width="375" height="375" alt="" sizes="(max-width: 767px) 23vw, 15vw" class="grid---image">
        <div class="grid---item-text">${name}</div>
        <div class="grid---item-text-copy-copy">👑 No.1</div>
    `;

    return item;
}

function createBigItem(name, imgSrc) {
    let item = document.createElement('div');

    item.setAttribute('id', 'w-node-_491d3bc0-9d6a-8041-3ce0-54e85b799c19-4012d612');

    item.innerHTML = `
        <div data-w-id="0e44398a-7d63-9660-a530-037d956360c0" class="grid---item">
            <div class="grid---item-text-copy">♡ 100</div>
            <img src="${imgSrc}" loading="eager" width="375" height="375" alt="" sizes="(max - width: 767px) 23vw, 15vw" class="grid---image">
            <div class="grid---item-text">${name}</div>
            <div class="grid---item-text-copy-copy">👑 No.1</div>
        </div > `;

    return item;
}


// ドキュメントが読み込まれたときに実行する
document.addEventListener('DOMContentLoaded', async () => {
    getAllNFT();
});

async function getAllNFT() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
        nft48Abi,
        '0x6CE76566a96a122D702E1f9D306B48FaA832Df89'
    );
    let grid = document.getElementById('candidates-grid');

    // Todo: 最初にデータが入っていないとcssが出力されない？UIごと修正する
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    max_id_token = 30; // TODO: ここを動的にする

    let promisses = Array(max_id_token - 7).fill().map(async (_, i) => {
        let index = i + 8;
        try {
            let token_uri = await contract.methods.tokenURI(index).call();
            console.log(`Token URI foj token ID ${index}: ${token_uri}`);

            return fetch(token_uri).then(async response => {
                if (!response.ok) {
                    console.log(`Failed to fetch data from ${token_uri}: HTTP ${response.status}`);
                    return;
                }
                let data = await response.json();
                console.log(`Data for token ID ${index}:`, data);

                if (!data.hasOwnProperty('image')) {
                    console.log(`No image data for token ID ${index}`);
                    return;
                }

                let imageData = data.image;
                // TODO: 握手券の数によって変える
                let item = (index % 4 == 0) ? createBigItem(data.name, imageData) : createItem(data.name, imageData);
                grid.appendChild(item);
            }).catch(fetchError => {
                console.log(`Error fetching or processing data for token ID ${index}:`, fetchError);
            }
            );
        } catch (contractError) {
            console.log(`Error calling tokenURI for token ID ${index}:`, contractError);
        }
    });

    Promise.allSettled(promises).then(() => {
        console.log("All promises have been processed.");
    });

};

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