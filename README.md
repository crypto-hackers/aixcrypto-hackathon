# aixcrypto-hackathon
2023-06 AI+Crypto Hackathon

暫定NFT48コントラクト  
https://blockscout.com/shibuya/address/0x2B6e9230C79cB8d10E78c10C49278Bf7C8d9919b
https://mumbai.polygonscan.com/address/0x6CE76566a96a122D702E1f9D306B48FaA832Df89

握手券NFT   
https://blockscout.com/shibuya/address/0x6CE76566a96a122D702E1f9D306B48FaA832Df89
https://mumbai.polygonscan.com/address/0x7fba3dbdd16bb83130168c47c3190f568a21df5a

ERC6551 Registry  
https://blockscout.com/shibuya/address/0x2fF679470B8209f900a135B4b3f2C09112f70b45
https://mumbai.polygonscan.com/address/0x42657c3b3da506185db0ee5c0217fb05d4435b2b

ERC6551向けImplementation  
https://blockscout.com/shibuya/address/0x2FAaF4136C3A1De2ed95cEff1B20D2BA57F1ae16
https://mumbai.polygonscan.com/address/0x3c98318C208FA376C07E03FfACf64081c65A795b

上記Registry,Implementationで作成したERC6551Wallet  
https://blockscout.com/shibuya/address/0x75bfDcAa6e44422aC8F8CF49c97b327E3aAaA1F1
https://mumbai.polygonscan.com/address/0xf46ea3f1e46f3be53f1de2e0edea87ebe1903144

総選挙コントラクト  
(Shibuya - WIP)  
https://mumbai.polygonscan.com/address/0x6f5a609b8296aaafcc71d6308d0cef2168934705

# About
## What it does
「チャットできるアイドル」NFT48は、生成AIの画像と、AI入力用のプロンプト文からなるアイドルNFTによって構成されたNon-Fungibleアイドルグループです。  
クリエイターがアイドルNFTを生成し、ファンは握手会などでアイドルNFTとの交流を楽しみながら、自分の推しを応援します。ある一定の期間が経つと総選挙が実行され、人気のアイドルNFTには特別なメダルが贈られます。


### 1. アイドルNFTの生成

クリエイターは、AIアイドル画像とキャラクター像（プロンプト文）を組み合わせた情報を元にアイドルNFTを発行します。このアイドルNFTには、NFTに紐づく固有のWalletである、TBA（Token Bound Account）が作成され、贈り物が送れるようになっています。

### 2. 握手会での交流

ファンはアイドルNFTと交流するための「握手券NFT」を使って、アイドルNFTと「握手会」を行うことができます。握手会では、アイドルNFTはそれぞれのキャラクター像に合わせた返事を返してくれるため、ファンは自分の推しと親密なコミュニケーションが取る経験を出来ます。

### 3. 総選挙

アイドルNFTは、総選挙での勝利を目指して活動しています。ある一定の期間になると、総選挙コントラクトがトリガーされ、総選挙が実施されます。そのタイミングでの握手券NFTの枚数に応じて、順位が決定し、一位のアイドルには殿堂入りの資格として特別なNFTが送付されます。

## The problem it solves
生成AIでアイドルの画像を生成することが一般的になりつつありますが、その容易さ故に一つ一つのキャラクター像が薄くなってしまい、AIアイドル画像の氾濫とインフレが発生してしまっています。結果、AI絵師が高クオリティのAIアイドル画像が作れたとしても、それはAmazon Unlimitedでアイドル写真集を出版する…程度の使い道しか存在していません。

本PJでは、AIアイドル画像をNFTにし、独自の所有権と人格を持たせることで、画像に対して存在感をつけ、アイドル化（偶像化）することを目指しています。これにより、AIアイドル画像は短期間で消費する存在から、長い目で推す存在へと進化され、AI画像クリエイターにも、新しい収益化の方法を提供します。

## Challenges I ran into
+ OpenAI のapiとの連携時に401エラーが発生

+ Astar ChainをローカルのHardhat環境から叩けなかったため、一度ThirdwebにあげてからDeployするという方法を取りました。

+ Astar Chain上ではERC6551のTBAで作成するRegistry Contractが存在しないため、独自でRegistry Contractを実装しました。

https://blockscout.com/shibuya/address/0x2fF679470B8209f900a135B4b3f2C09112f70b45



## Technologies I used
### Azure Open AI

+ Chat GPT（Few-shot learningを実施）

+ DALL・E



### NFT

+ ERC721

+ ERC1155



### Token Bound Account

+ ERC6551



### Chain

+ Astar

+ Polygon



### Frontend

+ Ether.js

+ Webflow.js



### Backend

+ Firebase



## How we built it
![代替テキスト](https://prd-akindo-private.s3.us-west-1.amazonaws.com/products/gallery-images/OVnjWPEl1F8drXOpK.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAUVKHMQQTFGYBWZ7T%2F20230620%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230620T150736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMSJIMEYCIQCSLd6wsUXbcXm%2FJOR1CtcOY0WXEfEKd1ZwOYQu108TNgIhAJQXe1uNW1HzUmSAfSAvd4i2nJIbjvboPfUDT36M1RwAKvQDCKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMMzIwNjYxNjUyNTE4IgzLc54Dk%2BifU2dDk0AqyANUGBBHkT%2BfXMQBYtZiag43uYQNrbFXzqjEtwpdgM1zIrU3LWicj%2BOuHLkYnnH6gXmBsOiBdIgNHOae4KXlQgkQJqhzQzg69%2FvncauGTIej7YC8LFIw6kubk0KmrfTsNKkW84YVihbSP5lGC5wA%2FFeo5WfRmSabwhUv9J8tBA%2FW8O07cyJj9911x1AWuW2VSsnQ%2F63aLwZMq5UAuNQ17opp1CnSs6awh9UDZevyB1sqIPZ%2FQcihlP%2FaGWv2EoAdVW%2FvXLiMz%2BCuGx9fSkAkzSPM%2BlLgO0AXoGUl2hjQ6UOLq9tNKsjVZFmqR6jyzs6zFEVB9OSZUXpqxzGqCc5t7kzWJ%2FIZ1fzj3SN7XkQLRqdteGgH07R%2BCJtYnqoVN2%2FLpuEKF7nKn3krvbE4azaXn7WT4f6sgI3QLva%2BFmBpoWcgF%2B7E%2B5LaMP72IRO4rawQW03zADj8xobEyqSyRzjTqagwtJmY4uPTNYHwcgblGaDukRtW%2FvyRtOhXY17HzqMhSSvEQyol1tprvQmwVQ2pxtVHp1kHgZX1Z%2Fq%2Bd6ci07t8d2sENThQL98QcddChE418C9qLGqhk1kQUi0bnuOWYMRi5M%2FrmkAF2qYw0OfGpAY6pAHGsSkW8FEMP5kgbGIj9mmx80V7wlkRrLmdZLxQYrmRsrU54AQrdANQk%2BWiCFDDmlIsIQ0yNak05NQgXgafhq5Okr7SDkP%2Fnj5RzKbR1hksqNa07IQ9xnBHSS97jb6cQv%2FxdnJ72uwEPJZnzThZBY3bKlemMvDl4exBDOKTLwjf%2FdKh7v9%2B81gADHHQkcaRqwf9veFJ1nGLVWIVewq5HuQRTL6yig%3D%3D&X-Amz-Signature=491f1970b55febfec0551e67e3b5776f02bc133fea41f8590c5cbd48f1bc51d8&X-Amz-SignedHeaders=host&x-id=GetObject)


## What we learned
+ ERC6551の仕組みと実装の綺麗さに感動しました。

+ Astarチェーンを初めて触りました。

+ Vanilla.jsの不便さに触れて、モダンなアーキテクチャの素晴らしさを再認識しました。


## What's next for
+ AI画像が著作権侵害でないことを担保する方法を検討

+ Astar Chainをローカルから叩く方法を調査

+ すでに存在するNFT画像も総選挙に参加可能にする

+ 握手会時のファンとアイドル間のメッセージをそれぞれオンチェーンに刻みこむ
