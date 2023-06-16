# Project Structure

```
.
├── src                     # Source files
│   ├── idol                # Files exported from Webflow
│   ├── top                 # Same as above
│   └── candidates          # Same as above
└── dist                    # Distribution files, built by webpack from /src
```

# Getting Started

# コマンド

## 1. 開発用サーバーの起動

以下のコマンドを使用して、src ディレクトリ内のファイルで開発用サーバーを起動します

```
node app.js
```

## 2. ビルド

src ディレクトリ内のファイルをビルドするには、以下のコマンドを使用します：

```
npx webpack
```

## 3. Firebase Emulator の起動

src ディレクトリ内のファイルで Firebase Emulator を起動するには、以下のコマンドを使用します：

```
firebase emulators:start
```
