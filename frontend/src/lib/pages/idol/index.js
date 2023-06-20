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
    let replyBox = document.getElementById('idol_reply');

    replyBox.style.display = "block";
    replyBox.innerText = "送信中...";

    viewERC6551Address(document.getElementById('hero').getAttribute('data-tokenid')).then(
        function (result) {
            console.log("6551 address is:")
            console.log(result);
            sendAkushuNft(result).then(
                function (result) {
                    replyBox.innerText = "お礼のメッセージを準備しています...";
                    console.log("akushu nft is sent")
                    console.log(result);

                    axios.post('https://ai-crypto-hackathon.openai.azure.com/openai/deployments/ai-crypot-hackathon/chat/completions?api-version=2023-03-15-preview', data, {
                        headers: {
                            'Authorization': 'Bearer e11b2ada3af04338ab8b488a8d2005b6',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => {
                            console.log(response);
                            replyBox.textContent = response.data.choices[0].message.content;
                        })
                        .catch((error) => {
                            console.error(error);
                            replyBox.innerText = "エラーが発生しました。";
                        });
                }
            ).catch(function (error) {
                console.log(error);
                replyBox.innerText = "エラーが発生しました。";
            }).finally(function () {
                handshakeButton.disabled = false;
            });
        }
    ).catch(function (error) {
        console.log(error);
        handshakeButton.disabled = false;
        replyBox.innerText = "エラーが発生しました。";
    });

})

function addMessage(role, content) {
    return {
        "role": role,
        "content": content
    };
}

let data = {
    "messages": [
        addMessage("system", "あなたは、日本人のアイドルです。ファンから応援メッセージが届くので、30文字ぐらいで感謝のメッセージを返答してください。\n"),
        addMessage("user", "いつも応援しています！"),
        addMessage("assistant", "あっ！また来てくれた！\nいつも応援ありがとうございます♡"),
        addMessage("assistant", "こうきくん、こんにちは！\n私のファンになってくれてありがとうございます！\nこれからも私の活動を応援してくれると嬉しいです♡")
    ],
    "temperature": 0.7,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "max_tokens": 800,
    "stop": null
};
