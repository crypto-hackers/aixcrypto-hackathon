
window.onload = function () {
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

document.addEventListener('DOMContentLoaded', (event) => {
    const fileInput = document.getElementById('image');
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

// var cropper;

// document.getElementById('mint-img-btn').addEventListener('click', function () {
//     document.getElementById('fileInput').click();
// });

// document.getElementById('fileInput').addEventListener('change', function (e) {
//     var file = e.target.files[0];
//     var reader = new FileReader();

//     reader.onloadend = function () {
//         document.getElementById('displayImg').src = reader.result;

//         var image = document.getElementById('displayImg');
//         cropper = new Cropper(image, {
//             aspectRatio: 1,
//             crop(event) {
//                 console.log(event.detail.x);
//                 console.log(event.detail.y);
//                 console.log(event.detail.width);
//                 console.log(event.detail.height);
//                 console.log(event.detail.rotate);
//                 console.log(event.detail.scaleX);
//                 console.log(event.detail.scaleY);
//             },
//         });

//         // おそらく画像のロードに時間がかかっているためwaitを入れないと動かない
//         // 抵抗あるがハッカソンなのでとりあえずこれで
//         wait(100)
//             .then(() => {
//                 var imgurl = cropper.getCroppedCanvas().toDataURL();
//                 document.getElementById('mint-profile-img').src = imgurl;
//                 document.getElementById('mint-profile-img').srcset = imgurl;
//                 cropper.destroy();
//             });
//     }

//     if (file) {
//         reader.readAsDataURL(file);
//     } else {
//         document.getElementById('displayImg').src = "";
//     }
// });

// function wait(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

