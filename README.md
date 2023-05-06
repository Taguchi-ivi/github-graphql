# 概要
こちらはGitHubからレポジトリを検索するサービスです。<br />
またレポジトリを押下しますと、付随するIssuesが見れます

<br />
<br />

# 技術
- React
    - react-router-dom(ページ遷移)
    - react-icons(アイコンを表示)
    - react-helmet-async(ページごとにタブ名、タイトル名を変更)
    - react-redux, toolkit(グローバルな状態管理)
    - chakra-ui(UIフレームワーク)
- TypeScript
- GraphQL
    - Apollo Client

<br />
<br />

# 追加した機能(費用対効果が高いもの)
- 現在表示している件数を表示(表示件数/総件数)
- ページごとにタブ名、タイトル名を変更
- レポジトリ、issuesから別タブにて対象のGitHubページへ遷移できる

<br />

# 追加した機能(費用対効果は見込めないもの)
※こちらでは費用対効果は見込めないけれど、私が実際に使うなら欲しい機能を作成してみました。

- 検索キーワードと、検索結果を保持
  - issuesページに遷移後、元のページに戻る際に情報をそのままにする
  - 戻ってきた際にも、show moreボタンを押下することで追加読み込み可能な状態へ
- 検索履歴を保持(サジェスト機能)
  - 複数の検索履歴を保持し、対象の検索履歴を押下することでその値のレポジトリを検索できる


<br />

# 手順
このアプリケーションの動作確認を行う手順を記載します。 <br />
環境構築(node)やGitHubのパーソナルアクセストークンの説明は省きます。

<br />

## ①当レポジトリをclone

```
git clone xxxxxxx
```
<br />

## ②cdコマンドを用いてレポジトリを移動

```
cd github-graphql
```
<br />

## ③.envファイルをルートディレクトリに作成し下記を記載

```
// .envファイル作成
touch .env

// 作成した.envファイルに下記を記載
REACT_APP_GITHUB_TOKEN="githubのパーソナルアクセストークン"
```

<br />

## ④modulesをインストール

```
npm install
```

<br />

## ⑤画面表示

```
npm start
```



<!--
component => 大文字スタート
function Example() {
    return <h1>hello component</h1>;
}
const Example = () => {
    return (
        <div>
            <h1>hello component</h1>;
        </div>
    )
}
const Example = () => (
    <div>
        <h1>hello component</h1>;
    </div>
)
const Example = () => { <h1>hello component</h1>; }

--
式：何らかの値を返すもの（変数に代入できるもの）
文：変数宣言、for文、if文(三項演算子は式、値を返すから)、switchぶんやセミコロンで区切るもの
文はjsx内(returnの中)に記載できない
--
プリミティブ型: 1, "str", bool, 10n, symbol(), null
オブジェクト型: {}, []などプリミティブ型以外
--
type文はPascalCase => UserProfileなど
--
pagination => Relay-Style Cursor PagiNation
-->