# [サービス名]
北陸トラベラーズマップ

## サービス概要
「北陸トラベラーズマップ」は、まだあまり知られていない観光地含め多くの観光スポットがある北陸地方の魅力を発見し、北陸旅行への一助となるサービスです。

## 想定されるユーザー
- 北陸に住んでいるけれど、お出かけ先として自分のまだ知らない北陸の観光スポットを知りたい方
- 北陸地方への旅行に行きたい方
- 北陸の観光スポットについて知らない事が多い方

## サービスコンセプト
このサービスを作ろうと考えたのは、令和6年能登半島地震がきっかけです。
私は神戸出身で、実は北陸地方にあまり縁がない人間なのですが、神戸はかつて阪神・淡路大震災を経験した地域であり、子どもの頃から震災のもたらす影響の大きさについて学んできた身として、今回の地震で影響を受けた北陸地方についても何か自分ができる事はないかと考えていました。
そんな中、地震発生間もない頃の「比較的地震の影響が小さく、既に通常営業に戻っている地域などでも客足が戻らずニュースのインタビューやSNSで現地の観光施設や市の広報などが「観光に来てほしい」と発信していた事」や「北陸地方は観光業が盛んな地域であり、令和６年能登半島地震により観光需要の落ち込みが見られる北陸地域4県において、国内旅行者はもとより訪日旅行者も対象とした「旅行商品」または「宿泊」料金の割引を支援する事業である「北陸応援割」の開始」などの情報を見て、北陸へ旅行をしようと考えている方へ「北陸地方に沢山ある魅力的な観光スポット」の情報を知ってもらえるサービスを作成しました。

## サービスの差別化ポイント
「北陸トラベラーズマップ」が既存のマップ検索サービスと異なるのは、「北陸地方の観光スポットの情報に特化したサービス」である事です。他にも、道路・交通情報などのマッピング・可視化情報で現在の北陸地方の道路の渋滞や通行止めの情報を知る事ができたり、「北陸各地への行き方検索ツール」で自分の住んでいる地域から行きたい北陸の各地域への行き方を調べる事ができます。

## 機能候補
### MVPリリース
- 北陸地方全体のマップ表示
→マップ上に北陸地方各地域の道路及び交通情報や各種観光施設の情報をマッピング・可視化
→マッピング・可視化する情報の量は、マップの拡大・縮小に応じて変化
- ↓可視化する情報↓
- 1.その県及び地域の主要な観光施設
- 2.道路及び交通情報 (現在渋滞、混雑、交通規制がかかっている道や鉄道を色分けして表示)
→使用技術としてGoogle Maps Platformの「TrafficLayer」と「TransitLayer」を使用
- マップ検索機能

- ユーザー登録
- ログイン・ログアウト機能
- ※以下ユーザー登録・ログイン・ログアウトに関連・付随する機能
- ユーザー登録に必要な情報↓
- メールアドレス
- ユーザー名
- パスワード
- プロフィール編集機能↓
- メールアドレス
- ユーザー名
- プロフィール(自己紹介)
- パスワードリセット

### 本リリース
- マップ検索時のオートコンプリート機能
- Googleアカウントによる外部ログイン機能
- 「お問い合わせ」機能
- 観光地のカテゴリ別検索機能
- マップ上の気になる観光スポットのブックマーク機能
- 「北陸各地への行き方検索ツール」

## 使用技術
- ■ 開発環境: Docker
- ■ メインフレームワーク: Ruby on Rails 7
- ■ HTML/CSSフレームワーク: Bootstrap 5
- ■ JavaScriptビルドツール: esbuild
- ■ JavaScript実行環境: Node.js
- ■ Node.jsのパッケージ管理ツール: yarn
- ■ Sass実行環境: dartsass-rails(gemで使用)
- ■ データベース: PostgreSQL
- ■ WebAPI: 
- Google Maps Platformを使い、以下のAPIを使用↓
- Maps JavaScript API (マップ機能、「TrafficLayer」「TransitLayer」による交通情報の表示)
- Google Places API (検索機能と検索によって得られた地点の詳細情報の取得)
- ■ 認証:
- Devise(Ruby on Railsでの認証を処理)
- gem "omniauth-google-oauth2"(Google認証に使用)
- ■ インフラ: 
- Webアプリケーションサーバ: heroku
- データベースサーバ: PostgreSQL
- ■ バージョン管理システム(VCS)：GitHub
