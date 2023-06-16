# ディレクトリ構造

```
/src // webflowから出力されたhtml,css,js,アセット等
/dist // src配下のファイルをwebpackでビルドしたもの
```

# コマンド

- src 配下のファイルで開発用サーバー立ち上げ

  - `node app.js`

- src 配下のファイルのビルド

  - `npx webpack`

- src 配下のファイルで firebase emulator 起動
  - `firebase emulators:start`
