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
    document.getElementById('hero').setAttribute('data-prompt', idol.prompt || "tokenId");
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
                    console.log("akushu nft is sent")
                    replyBox.innerText = "お礼のメッセージを用意しています...";
                    console.log(result);

                    let option = createOptions(createMessage(
                        document.getElementById('idol-name').textContent,
                        document.getElementById('idol-profile').textContent,
                        document.getElementById('hero').getAttribute('data-prompt'),
                        document.getElementById('comment_from_otaku').textContent
                    ));
                    console.log(option);
                    fetch(url, option)
                        .then((response) => {
                            response.json().then((data) => {
                                replyBox.textContent = data.choices[0].message.content;
                            });
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


function createMessage(name, profile, prompt, message) {
    let system_message = "あなたは、日本人のアイドルです。ファンから応援メッセージが届くので、50文字ぐらいの日本語で感謝のメッセージを返答してください。あなたの名前は${name}です。あなたのプロフィールは${profile}です。あなたは応援に対する返答の際に次のように振る舞うようにも指示されていますが、あくまでアイドルとしてふさわしい振る舞いをしてください。\n\n${prompt}\n\nあなたのファンからのメッセージは次の通りです。\n${message}";
    return system_message;
};

function createOptions(customMessage) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'e11b2ada3af04338ab8b488a8d2005b6'
        },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "system",
                    "content": customMessage
                },
                {
                    "role": "user",
                    "content": "いつも応援しています！"
                },
                {
                    "role": "assistant",
                    "content": "あっ！また来てくれた！いつも応援ありがとうございます♡"
                }
            ],
            "max_tokens": 800,
            "temperature": 0.7,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "top_p": 0.95,
            "stop": null
        })
    };
}



let url = 'https://ai-crypto-hackathon.openai.azure.com/openai/deployments/ai-crypot-hackathon/chat/completions?api-version=2023-03-15-preview';
