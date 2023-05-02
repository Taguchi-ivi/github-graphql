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
    - chakra-ui(UIフレームワーク)
- TypeScript
- GraphQL
    - Apollo Client

<br />
<br />

# 追加した機能
- 現在表示している件数を表示(view数/n)
- ページごとにタブ名、タイトル名を変更
- レポジトリ、issuesから別タブにて対象のGitHubページへ遷移できる

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