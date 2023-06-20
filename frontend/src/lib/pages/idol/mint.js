// Config
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

// Event handler
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

/* mint nft */
document.getElementById('email-form').addEventListener('submit', function (e) {
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

    const jsonBlob = new Blob([JSON.stringify(nftMetadata)], { type: "application/json" });
    const uploadTask = storageRef.child(`metadata/${nftMetadata.name}.json`).put(jsonBlob);
    uploadTask.on('state_changed',
        function (snapshot) {
            // アップロードの進行状況を監視する機能
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        function (error) {
            // エラーハンドリング
            console.log(error);
        },
        function () {
            // 成功したときの処理
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                mint(downloadURL).then((tx) => {
                    console.log(tx);
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
    );
});


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
            canvas.width = size;
            canvas.height = size;

            // Draw the cropped image onto the canvas
            context.drawImage(img, left, top, size, size, 0, 0, canvas.width, canvas.height);

            // // Create a new canvas for the resized image
            // var resizeCanvas = document.createElement('canvas');
            // var resizeContext = resizeCanvas.getContext('2d');
            // resizeCanvas.width = size;
            // resizeCanvas.height = size;

            // // Draw the cropped image onto the resize canvas
            // resizeContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, resizeCanvas.width, resizeCanvas.height);
            // var dataUrl = resizeCanvas.toDataURL();

            // Set the cropped image as the src of the mint-img-btn
            document.getElementById('mint-profile-img').src = canvas.toDataURL();

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
