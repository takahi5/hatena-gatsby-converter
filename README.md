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

4. output フォルダに markdown ファイルが出力されます。記事日付ごとのフォルダに分けて格納されます。この markdown を gatsby のコンテンツフォルダにコピペすれば OK!

注意: 同日付の記事が複数あると上書きされてしまいます！
