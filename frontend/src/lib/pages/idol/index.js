document.addEventListener('DOMContentLoaded', function () {
    const idol = JSON.parse(localStorage.getItem('idol'));
    console.log(idol);
    if (!idol) {
        console.error("idol is not found");
        return;
    }

    document.getElementById('idol-name').innerText = idol.name || "name";
    document.getElementById('idol-profile').innerText = idol.profile || "profile";
    document.getElementById('idol-balance').innerText = idol.balance || 0;
    document.getElementById('idol-image').src = idol.image || "https://firebasestorage.googleapis.com/v0/b/ai-idol-election.appspot.com/o/images%2Fai-1.jpg?alt=media&token=8a162f82-b7f5-4fc5-a24c-22fc82f9a7de";
    document.getElementById('idol-image').srcset = "";
    document.getElementById('hero').setAttribute('data-tokenid', idol.tokenId || "tokenId");
});

let handshakeButton = document.getElementById('idol-handshake');
handshakeButton.addEventListener('click', function (event) {
    // ボタンを無効化
    handshakeButton.disabled = true;
    viewERC6551Address(document.getElementById('hero').getAttribute('data-tokenid')).then(
        function (result) {
            console.log("6551 address is:")
            console.log(result);
            sendAkushuNft(result).then(
                function (result) {
                    console.log("akushu nft is sent")
                    console.log(result);
                }
            ).catch(function (error) {
                console.log(error);
            }).finally(function () {
                handshakeButton.disabled = false;
            });
        }
    ).catch(function (error) {
        console.log(error);
        handshakeButton.disabled = false;

    });

})
