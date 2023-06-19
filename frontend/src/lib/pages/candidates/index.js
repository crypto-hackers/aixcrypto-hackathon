const gridElement = document.querySelector('.grid');
gridElement.addEventListener('click', function (event) {
    const parentDiv = event.target.parentElement;

    // TODO: change selector name
    let name = event.target.querySelector('.grid---item-text');
    if (!name) {
        name = parentDiv.querySelector('.grid---item-text');
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

    let tokenId = event.target.getAttribute('data-tokenid');
    if (!tokenId) {
        tokenId = parentDiv.getAttribute('data-tokenid');
    }

    let balance = event.target.getAttribute('data-balance');
    if (!balance) {
        balance = parentDiv.getAttribute('data-balance');
    }

    let profile = event.target.getAttribute('data-profile');
    if (!profile) {
        profile = parentDiv.getAttribute('data-profile');
    }

    const idol = {
        name: name.textContent,
        profile: profile,
        prompt: prompt.textContent,
        image: image,
        tokenId: tokenId,
        balance: balance,
    }
    console.log(idol)

    localStorage.setItem('idol', JSON.stringify(idol));

    window.location.href = '/idol';
});

// 要素を作成する関数
function createItem(name, imgSrc, tokenId, balance, profile, isBig = false) {
    let item = document.createElement('div');
    item.setAttribute('data-w-id', '0e44398a-7d63-9660-a530-037d956360c0');
    item.className = 'grid---item';
    item.setAttribute('data-tokenid', tokenId);
    item.setAttribute('data-balance', balance);
    item.setAttribute('data-profile', profile);
    item.innerHTML = `
        <div class="grid---item-text-copy">🤝 ${balance}</div>
        <img src="${imgSrc}" loading="eager" width="375" height="375" alt="" sizes="(max-width: 767px) 23vw, 15vw" class="grid---image">
        <div class="grid---item-text">${name}</div>
        <div class="grid---item-text-copy-copy"></div>
    `;

    if (isBig) {
        let outerDiv = document.createElement('div');
        outerDiv.setAttribute('id', 'w-node-_491d3bc0-9d6a-8041-3ce0-54e85b799c19-4012d612');
        outerDiv.appendChild(item);
        return outerDiv;
    }

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
        nft48Address
    );
    let grid = document.getElementById('candidates-grid');

    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    max_id_token = 30; // TODO: ここを動的にする

    let promises = Array(max_id_token - 7).fill().map(async (_, i) => {
        let index = i + 8;
        try {
            let token_uri = await contract.methods.tokenURI(index).call();
            let owner = await contract.methods.ownerOf(index).call();
            let balance = await contract.methods.balanceOf(owner).call();

            console.log(`Token URI for token ID ${index}: ${token_uri}, owner: ${owner}, balance: ${balance}`);

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
                let item = (index % 4 == 0) ? createItem(data.name, imageData, index, balance, data.profile, isBig = true)
                    : createItem(data.name, imageData, index, balance, data.profile);
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
