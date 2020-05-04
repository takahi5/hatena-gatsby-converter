はてなブログや fc2 ブログのエクスポートファイル(Movable Type 形式)を Gatsby 用の markdown ファイルに変換します。

## 準備

```
yarn install
```

## 実行

1. はてなブログや fc2 ブログから記事ファイルをエクスポートする。
2. エクスポートした txt 形式のファイルをルートフォルダに置く。
3. スクリプト実行

```
node convert-mt.js your-export-file.txt
```

fc2 のとき。(改行の具合がちょっと異なったため)

```
node convert-mt.js your-export-file.txt fc2
```
